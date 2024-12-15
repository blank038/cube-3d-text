// src/shaders/EdgeShader.ts
import * as THREE from "three";

export const EdgeVertex = `
varying vec2 vUv;

void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`;

export const EdgeFragment = `
uniform sampler2D maskTexture;
uniform vec2 texSize;
uniform vec3 color;
uniform float thickness;

varying vec2 vUv;

void main() {
    vec2 invSize = thickness / texSize;
    vec4 c1 = texture2D( maskTexture, vUv + vec2(invSize.x, 0.0));
    vec4 c2 = texture2D( maskTexture, vUv - vec2(invSize.x, 0.0));
    vec4 c3 = texture2D( maskTexture, vUv + vec2(0.0, invSize.y));
    vec4 c4 = texture2D( maskTexture, vUv - vec2(0.0, invSize.y));
    
    float diff1 = (c1.r - c2.r) * 0.5;
    float diff2 = (c3.r - c4.r) * 0.5;
    
    float d = length(vec2(diff1, diff2));
    gl_FragColor = d > 0.0 ? vec4(color, 1.0) : vec4(0.0, 0.0, 0.0, 0.0);
}
`;

export const EdgeMaterial = new THREE.ShaderMaterial({
    vertexShader: EdgeVertex,
    fragmentShader: EdgeFragment,
    uniforms: {
        maskTexture: { value: null },
        texSize: { value: new THREE.Vector2(800, 600) }, // 默认值，可在组件中动态设置
        color: { value: new THREE.Color(0xff0000) }, // 默认红色描边
        thickness: { value: 1.0 }, // 描边厚度
    },
    transparent: true,
    depthTest: false,
    depthWrite: false,
    blending: THREE.AdditiveBlending, // 使用叠加混合模式
});