// src/shaders/CopyShader.ts
import * as THREE from "three";

export const CopyVertexShader = `
varying vec2 vUv;

void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`;

export const CopyFragmentShader = `
uniform sampler2D tDiffuse;
uniform vec2 resolution;
uniform float opacity;

varying vec2 vUv;

void main() {
    vec4 texel = texture2D( tDiffuse, vUv );
    gl_FragColor = opacity * texel;
}
`;

export const CopyMaterial = new THREE.ShaderMaterial({
    vertexShader: CopyVertexShader,
    fragmentShader: CopyFragmentShader,
    uniforms: {
        tDiffuse: { value: null },
        resolution: { value: new THREE.Vector2(1 / window.innerWidth, 1 / window.innerHeight) },
        opacity: { value: 1.0 },
    },
    transparent: true,
    depthTest: false,
});