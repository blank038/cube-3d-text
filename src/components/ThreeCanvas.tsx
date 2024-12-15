// src/components/ThreeCanvas.tsx
import { forwardRef, useImperativeHandle } from "react";
import * as THREE from "three";
import { Canvas, useThree } from "@react-three/fiber";
import { TextOptions } from "../types/text";
import ThreeScene from "./ThreeScene.tsx";

export interface ThreeCanvasHandle {
    takeScreenshot: () => void;
}

interface ThreeCanvasProps {
    text1: string;
    text2: string;
    text1Options: TextOptions;
    text2Options: TextOptions;
}

const ThreeCanvas = forwardRef<ThreeCanvasHandle, ThreeCanvasProps>((props, ref) => {
    const { text1, text2, text1Options, text2Options } = props;

    // 内部组件，用于定义截图功能
    const Screenshot = () => {
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
            }
        }));

        return null;
    };

    return (
        <Canvas
            camera={{ position: [0, -20, 50], fov: 75 }}
            gl={{
                toneMapping: THREE.NoToneMapping, // 可选：更好的色调映射
                toneMappingExposure: 1, // 调整曝光
                alpha: true, // 启用透明背景
            }}
            style={{ background: "transparent" }}
        >
            <Screenshot />
            <ThreeScene
                text1={text1}
                text2={text2}
                text1Options={text1Options}
                text2Options={text2Options}
            />
        </Canvas>
    );
});

export default ThreeCanvas;