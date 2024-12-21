// src/components/ThreeCanvas.tsx
import { forwardRef, useImperativeHandle, useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { TextOptions, CameraOptions } from "../types/text";
import { FontData } from "three/examples/jsm/loaders/FontLoader.js";
import ThreeScene from "./ThreeScene.tsx";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";

export interface ThreeCanvasHandle {
    takeScreenshot: () => void;
    resetCamera: () => void;
}

interface ThreeCanvasProps {
    cameraOptions: CameraOptions;
    text1: string;
    text2: string;
    text1Options: TextOptions;
    text2Options: TextOptions;
    font: FontData;
}

const CameraController: React.FC<{ fov: number }> = ({ fov }) => {
    const { camera } = useThree();

    useEffect(() => {
        // 检查 camera 是否为 PerspectiveCamera 的实例
        if (camera instanceof THREE.PerspectiveCamera) {
            camera.fov = fov;
            camera.updateProjectionMatrix();
        } else {
            console.warn("当前相机不是 PerspectiveCamera，无法设置 fov");
        }
    }, [fov, camera]);

    return null;
};

interface ScreenshotProps {
    orbitRef: React.RefObject<OrbitControlsImpl>;
}

const ThreeCanvas = forwardRef<ThreeCanvasHandle, ThreeCanvasProps>((props, ref) => {
    const { text1, text2, text1Options, text2Options, cameraOptions, font } = props;

    const orbitRef = useRef<OrbitControlsImpl>(null);

    // 内部组件，用于定义截图功能
    const Screenshot: React.FC<ScreenshotProps> = ({ orbitRef }) => {
        const { gl, scene, camera } = useThree();

        useImperativeHandle(ref, () => ({
            takeScreenshot: () => {
                // 渲染场景一次以确保最新状态
                gl.render(scene, camera);

                // 获取带有透明背景的 PNG 数据URL
                const dataURL = gl.domElement.toDataURL("image/png");

                // 创建一个临时链接元素
                const link = document.createElement("a");
                link.href = dataURL;
                link.download = "screenshot.png";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            },
            resetCamera: () => {
                // 1. 重置 OrbitControls
                orbitRef.current?.reset();

                // 2. 再设定我们需要的相机位置 & 目标
                camera.position.set(0, -20, 50);
                camera.lookAt(0, 0, 0);

                // 一些额外的更新
                camera.updateProjectionMatrix();
            },
        }));

        return null;
    };

    return (
        <Canvas
            camera={{ position: [0, -20, 50], fov: cameraOptions.fov }}
            gl={{
                toneMapping: THREE.NoToneMapping, // 可选：更好的色调映射
                toneMappingExposure: 1, // 调整曝光
                alpha: true, // 启用透明背景
            }}
            style={{ background: "transparent" }}
        >
            <Screenshot orbitRef={orbitRef} />
            <CameraController fov={cameraOptions.fov} />
            <ThreeScene
                text1={text1}
                text2={text2}
                text1Options={text1Options}
                text2Options={text2Options}
                font={font}
            />
            <OrbitControls ref={orbitRef} enableDamping={false} dampingFactor={0} />
        </Canvas>
    );
});

export default ThreeCanvas;