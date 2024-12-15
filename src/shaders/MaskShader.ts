// src/shaders/MaskShader.ts
import * as THREE from "three";

export const MaskVertex = `
void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`;

export const MaskFragment = `
void main() {
    gl_FragColor = vec4(1.0); // 纯白色
}
`;

export const MaskMaterial = new THREE.ShaderMaterial({
    vertexShader: MaskVertex,
    fragmentShader: MaskFragment,
    depthTest: false,
    depthWrite: false,
    transparent: true,
});