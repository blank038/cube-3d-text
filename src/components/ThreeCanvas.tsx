// src/components/ThreeCanvas.tsx
import { forwardRef, useImperativeHandle, useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { TextOptions, CameraOptions } from "../types/text";
import ThreeScene from "./ThreeScene.tsx";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { useMessage } from "../contexts/MessageContext.tsx";

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
    fontUrl: string;
}

const CameraController: React.FC<{ fov: number }> = ({ fov }) => {
    const { camera } = useThree();

    useEffect(() => {
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
    const { text1, text2, text1Options, text2Options, cameraOptions, fontUrl } = props;
    const orbitRef = useRef<OrbitControlsImpl>(null);

    // 计算场景 boundingBox 的辅助函数
    const computeScreenBoundingBox = (
        scene: THREE.Scene,
        camera: THREE.Camera,
        gl: THREE.WebGLRenderer
    ) => {
        // 1. 获取场景的包围盒
        const box = new THREE.Box3().setFromObject(scene);

        if (box.isEmpty()) {
            // 如果场景中没有可见对象，直接返回 null
            return null;
        }

        // 2. 将 box 的 8 个角点投影到屏幕
        const corners = [
            new THREE.Vector3(box.min.x, box.min.y, box.min.z),
            new THREE.Vector3(box.min.x, box.min.y, box.max.z),
            new THREE.Vector3(box.min.x, box.max.y, box.min.z),
            new THREE.Vector3(box.min.x, box.max.y, box.max.z),
            new THREE.Vector3(box.max.x, box.min.y, box.min.z),
            new THREE.Vector3(box.max.x, box.min.y, box.max.z),
            new THREE.Vector3(box.max.x, box.max.y, box.min.z),
            new THREE.Vector3(box.max.x, box.max.y, box.max.z),
        ];

        const ndcToScreen = (v: THREE.Vector3, width: number, height: number) => {
            // v 是投影后的 NDC 范围：[-1, 1]
            // 转到屏幕坐标 [0, width], [0, height]
            return {
                x: (v.x + 1) * 0.5 * width,
                y: (-v.y + 1) * 0.5 * height, // 注意 Y 轴翻转
            };
        };

        const { width, height } = gl.getSize(new THREE.Vector2());

        // 投影到屏幕坐标
        const screenPositions = corners.map((corner) => {
            const ndcPos = corner.clone().project(camera); // 世界坐标 => NDC
            return ndcToScreen(ndcPos, width, height);
        });

        const xs = screenPositions.map((p) => p.x);
        const ys = screenPositions.map((p) => p.y);

        const minX = Math.max(Math.floor(Math.min(...xs)), 0);
        const maxX = Math.min(Math.ceil(Math.max(...xs)), width);
        const minY = Math.max(Math.floor(Math.min(...ys)), 0);
        const maxY = Math.min(Math.ceil(Math.max(...ys)), height);

        // 如果越界或无效，也返回 null
        if (maxX <= minX || maxY <= minY) return null;

        return {
            minX,
            minY,
            width: maxX - minX,
            height: maxY - minY,
        };
    };

    const messageApi = useMessage();

    // 内部组件，用于定义截图功能
    const Screenshot: React.FC<ScreenshotProps> = ({ orbitRef }) => {
        const { gl, scene, camera } = useThree();

        useImperativeHandle(ref, () => ({
            takeScreenshot: () => {
                // 1. 渲染最新画面
                gl.render(scene, camera);

                // 2. 计算 bounding (在 CSS 尺寸下)
                const bounding = computeScreenBoundingBox(scene, camera, gl);
                if (!bounding) {
                    messageApi?.warning("场景为空或对象在屏幕之外，无法截图。");
                    return;
                }

                let { minX, minY, width, height } = bounding;

                // 3. 获取设备像素比
                const dpr = gl.getPixelRatio();
                // 或者 const dpr = window.devicePixelRatio;

                // 4. 把 bounding 放大到物理像素坐标
                minX = Math.floor(minX * dpr);
                minY = Math.floor(minY * dpr);
                width = Math.floor(width * dpr);
                height = Math.floor(height * dpr);

                // 5. 获取整张截图 dataURL（物理尺寸）
                const fullDataURL = gl.domElement.toDataURL("image/png");

                // 6. 创建一个新的 canvas 裁剪
                const croppedCanvas = document.createElement("canvas");
                croppedCanvas.width = width;
                croppedCanvas.height = height;
                const ctx = croppedCanvas.getContext("2d")!;

                const img = new Image();
                img.onload = () => {
                    // 7. 在物理像素坐标系下裁剪
                    ctx.drawImage(
                        img,
                        minX, minY, width, height,
                        0, 0, width, height
                    );

                    // 8. 导出
                    const croppedDataURL = croppedCanvas.toDataURL("image/png");
                    const link = document.createElement("a");
                    link.href = croppedDataURL;
                    link.download = "screenshot.png";
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                };

                img.src = fullDataURL;
            },
            resetCamera: () => {
                orbitRef.current?.reset();
                camera.position.set(0, -20, 50);
                camera.lookAt(0, 0, 0);
                camera.updateProjectionMatrix();
            },
        }));

        return null;
    };

    return (
        <Canvas
            // 如果要保证截图含透明背景 + 保留像素，通常要加 preserveDrawingBuffer: true
            camera={{ position: [0, -20, 50], fov: cameraOptions.fov }}
            gl={{
                alpha: true,             // 允许透明背景
                preserveDrawingBuffer: true, // 截图后可读取
                toneMapping: THREE.NoToneMapping,
                toneMappingExposure: 1,
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
                fontUrl={fontUrl}
            />
            <OrbitControls ref={orbitRef} enableDamping={false} dampingFactor={0} />
        </Canvas>
    );
});

export default ThreeCanvas;