// src/components/OutlineEffect.tsx
import { useRef, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { MaskMaterial } from "../shaders/MaskShader";
import { EdgeMaterial } from "../shaders/EdgeShader";

interface OutlineEffectProps {
    edgeColor?: THREE.Color;
    thickness?: number;
    outlineObjects?: THREE.Object3D[]; // 需要描边的对象列表
}

const OutlineEffect: React.FC<OutlineEffectProps> = ({
                                                         edgeColor = new THREE.Color(0xff0000),
                                                         thickness = 1.0,
                                                         outlineObjects = [],
                                                     }) => {
    const { scene, camera, gl, size } = useThree();
    const maskRenderTarget = useRef(
        new THREE.WebGLRenderTarget(size.width, size.height)
    );
    const edgeRenderTarget = useRef(
        new THREE.WebGLRenderTarget(size.width, size.height)
    );

    // 创建一个用于渲染边缘的场景和正交相机
    const edgeScene = useRef(new THREE.Scene());
    const edgeCamera = useRef(
        new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
    );
    const quad = useRef(
        new THREE.Mesh(new THREE.PlaneGeometry(2, 2), EdgeMaterial)
    );

    useEffect(() => {
        // 设置 RenderTarget 大小
        maskRenderTarget.current.setSize(size.width, size.height);
        edgeRenderTarget.current.setSize(size.width, size.height);
        EdgeMaterial.uniforms.texSize.value.set(size.width, size.height);

        // 设置 EdgeMaterial 的混合模式
        EdgeMaterial.blending = THREE.AdditiveBlending; // 或 THREE.NormalBlending，根据需求选择
        EdgeMaterial.transparent = true;
        EdgeMaterial.depthTest = false;
        EdgeMaterial.depthWrite = false;

        // 添加四边形到边缘场景
        edgeScene.current.add(quad.current);
    }, [size]);

    useFrame(() => {
        // Step 1: 渲染遮罩（仅渲染需要描边的对象）
        gl.setRenderTarget(maskRenderTarget.current);
        gl.clearColor();
        gl.clear(true, true, true);

        // 保存当前的 overrideMaterial
        const originalOverrideMaterial = scene.overrideMaterial;
        scene.overrideMaterial = null;

        // 保存原始可见性
        const originalVisibility: { object: THREE.Object3D; visible: boolean }[] = [];

        // 隐藏所有对象
        scene.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
                originalVisibility.push({ object: child, visible: child.visible });
                child.visible = false;
            }
        });

        // 显示需要描边的对象并设置 MaskMaterial
        outlineObjects.forEach((obj) => {
            obj.traverse((child) => {
                if ((child as THREE.Mesh).isMesh) {
                    const mesh = child as THREE.Mesh;
                    mesh.visible = true;
                    if (!mesh.userData.originalMaterial) {
                        mesh.userData.originalMaterial = mesh.material;
                    }
                    mesh.material = MaskMaterial;
                }
            });
        });

        // 渲染场景
        gl.render(scene, camera);

        // 恢复原始材质和可见性
        outlineObjects.forEach((obj) => {
            obj.traverse((child) => {
                if ((child as THREE.Mesh).isMesh) {
                    const mesh = child as THREE.Mesh;
                    mesh.material = mesh.userData.originalMaterial;
                }
            });
        });

        originalVisibility.forEach(({ object, visible }) => {
            object.visible = visible;
        });

        // 恢复 overrideMaterial
        scene.overrideMaterial = originalOverrideMaterial;

        // Step 2: 应用边缘检测
        EdgeMaterial.uniforms.maskTexture.value = maskRenderTarget.current.texture;
        EdgeMaterial.uniforms.color.value = edgeColor;
        EdgeMaterial.uniforms.thickness.value = thickness;

        // 渲染边缘到 edgeRenderTarget
        gl.setRenderTarget(edgeRenderTarget.current);
        gl.clear(true, true, true);
        gl.render(edgeScene.current, edgeCamera.current);

        // Step 3: 将边缘叠加到原始场景前
        gl.setRenderTarget(null); // 渲染到屏幕

        // 渲染边缘场景
        gl.render(edgeScene.current, edgeCamera.current);

        // 渲染原始场景
        gl.render(scene, camera);
    }, 1);

    return null;
};

export default OutlineEffect;