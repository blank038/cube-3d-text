// src/components/ThreeScene.tsx
import React, { Suspense, useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { Html } from "@react-three/drei";
import { Font } from "three/examples/jsm/loaders/FontLoader.js";
import Text3D from "./Text3D";
import { TextOptions } from "../types/text";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { useThree } from "@react-three/fiber";
import { useMessage } from "../contexts/MessageContext";

interface ThreeSceneProps {
    text1: string;
    text2: string;
    text1Options: TextOptions;
    text2Options: TextOptions;
    fontUrl: string;
}

const cachedFonts : {[id: string]: Font} = {}

const ThreeScene: React.FC<ThreeSceneProps> = ({
                                                   text1,
                                                   text2,
                                                   text1Options,
                                                   text2Options,
                                                   fontUrl
                                               }) => {

    const text1Ref = useRef<THREE.Group>(null);
    const text2Ref = useRef<THREE.Group>(null);

    const messageApi = useMessage();

    //@ts-ignore
    const [selectedObjects, setSelectedObjects] = useState<THREE.Object3D[]>([]);
    const [font, setFont] = useState<Font | null>(null);

    useEffect(() => {
        if (cachedFonts[fontUrl]) {
            setFont(cachedFonts[fontUrl]);
            return;
        }
        // 加载字体
        const fontLoader = new FontLoader();
        messageApi?.open({
            key: 'loadingFont',
            type: 'loading',
            content: '字体加载中...',
        });
        fontLoader.load(
            fontUrl,
            (font) => {
                setFont(font);
                cachedFonts[fontUrl] = font;
                messageApi?.open({
                    key: 'loadingFont',
                    type: 'success',
                    content: '字体加载完成!',
                    duration: 2,
                });
            },
            (progress) => {
                messageApi?.open({
                    key: 'loadingFont',
                    type: 'loading',
                    content: '字体加载中... ' + Math.round(progress.loaded),
                    duration: 60,
                });
            }
        );
    }, [fontUrl]); // 每次 fontUrl 变化时重新加载字体

    const { scene } = useThree();

    useEffect(() => {
        // 确保场景背景为透明
        scene.background = null;
    }, [scene]);

    useEffect(() => {
        if (text1Ref.current && text2Ref.current) {
            setSelectedObjects([text1Ref.current, text2Ref.current]);
        }
    }, [text1Ref, text2Ref]);

    return (
        <>
            {/* 添加光源 */}
            {/*<ambientLight intensity={3.0}/>
            <directionalLight
                position={[0, 50, 50]}
                intensity={1.0}
                ref={(light) => light && light.lookAt(new THREE.Vector3(0, 0, 0))}
            />*/}

            {/* 创建文本网格 */}
            <Suspense fallback={<Html>Loading...</Html>}>
                {font && (
                    <group>
                        <Text3D
                            content={text1}
                            opts={text1Options}
                            font={font}
                            position={[0, text1Options.y, 0]}
                            ref={text1Ref}
                        />
                        <Text3D
                            content={text2}
                            opts={text2Options}
                            font={font}
                            position={[0, text2Options.y, 0]}
                            ref={text2Ref}
                        />
                    </group>
                )}
            </Suspense>

            {/* 添加描边效果 */}
            {/*<OutlineEffect*/}
            {/*    edgeColor={new THREE.Color(0xff0000)}*/}
            {/*    thickness={5.0}*/}
            {/*    outlineObjects={selectedObjects}*/}
            {/*/>*/}
        </>
    );
};

export default ThreeScene;