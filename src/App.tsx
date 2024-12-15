// src/App.tsx
import React, { useState, useRef } from "react";
import { Layout, Flex, Form, Slider, Collapse, Button } from "antd";
import { CameraOutlined, ReloadOutlined } from "@ant-design/icons";
import ThreeCanvas, { ThreeCanvasHandle } from "./components/ThreeCanvas";
import "antd/dist/reset.css";
import { TextOptions, CameraOptions } from "./types/text";
import TextSettingsPanel from "./components/TextSettingsPanel.tsx";

const { Sider, Content } = Layout;
const { Panel } = Collapse;

const App: React.FC = () => {
    const [text1, setText1] = useState("我的世界");
    const [text2, setText2] = useState("中国版");

    const [cameraOptions, setCameraOptions] = useState<CameraOptions>({
        fov: 75
    });

    // 配置文字的样式
    const [text1Options, setText1Options] = useState<TextOptions>({
        size: 10,
        depth: 5,
        colorGradualStart: "#ffd07b",
        colorGradualEnd: "#ffaa00",
        colorSide: "#553800",
        colorBottomStart: "#a56c00",
        colorBottomEnd: "#553800",
        outlineColor: "#000000",
        outlineWidth: 5,
        letterSpacing: 1.0
    });

    const [text2Options, setText2Options] = useState<TextOptions>({
        size: 5,
        depth: 3,
        colorGradualStart: "#9ae5ff",
        colorGradualEnd: "#13b2ff",
        colorSide: "#003855",
        colorBottomStart: "#00649a",
        colorBottomEnd: "#003855",
        outlineColor: "#000000",
        outlineWidth: 2,
        letterSpacing: 1.0
    });

    // 创建一个引用来访问 ThreeCanvas 的截图和重置功能
    const threeCanvasRef = useRef<ThreeCanvasHandle>(null);

    const handleScreenshot = () => {
        if (threeCanvasRef.current) {
            threeCanvasRef.current.takeScreenshot();
        }
    };

    const handleResetCamera = () => {
        if (threeCanvasRef.current) {
            threeCanvasRef.current.resetCamera();
        }
    }

    return (
        <Layout style={{ height: "100vh" }}>
            {/* 左侧配置面板 */}
            <Sider width={300} style={{ background: "#F5F5F5", padding: 16, overflow: "auto" }}>
                <Flex vertical gap={"middle"} style={{ width: "100%" }}>
                    <Collapse defaultActiveKey={["camera"]} bordered={false} style={{ background: "white", boxShadow: "0 2px 16px rgba(0, 0, 0, 0.05)" }}>
                        {/* 第一行文字 */}
                        <Panel header="相机设置" key="camera" style={{ marginBottom: -24 }}>
                            <Form.Item label={`透视角度 (${cameraOptions.fov})`}>
                                <Slider
                                    min={1}
                                    max={120}
                                    step={1}
                                    value={cameraOptions.fov}
                                    onChange={(val) => setCameraOptions({ ...cameraOptions, fov: val })}
                                />
                            </Form.Item>
                        </Panel>
                    </Collapse>
                    <Collapse defaultActiveKey={["1", "2"]} bordered={false} style={{ background: "white", boxShadow: "0 2px 16px rgba(0, 0, 0, 0.05)" }}>
                        {/* 第一行文字 */}
                        <Panel header="第一行文字" key="1">
                            <TextSettingsPanel
                                text={text1}
                                textOptions={text1Options}
                                onTextChange={setText1}
                                onTextOptionsChange={setText1Options}
                            />
                        </Panel>

                        {/* 第二行文字 */}
                        <Panel header="第二行文字" key="2">
                            <TextSettingsPanel
                                text={text2}
                                textOptions={text2Options}
                                onTextChange={setText2}
                                onTextOptionsChange={setText2Options}
                            />
                        </Panel>
                    </Collapse>
                </Flex>
            </Sider>
            {/* 右侧 3D 场景 */}
            <Content style={{ position: "relative" }}>
                <ThreeCanvas
                    ref={threeCanvasRef}
                    cameraOptions={cameraOptions}
                    text1={text1}
                    text2={text2}
                    text1Options={text1Options}
                    text2Options={text2Options}
                />
                {/* 添加截图按钮 */}
                <Flex gap={"small"} style={{ position: "absolute", top: 20, right: 20, zIndex: 1 }}>
                    <Button
                        type="default"
                        icon={<ReloadOutlined />}
                        onClick={handleResetCamera}
                    >
                        重置相机
                    </Button>
                    <Button
                        type="primary"
                        icon={<CameraOutlined />}
                        onClick={handleScreenshot}
                    >
                        截图
                    </Button>
                </Flex>
            </Content>
        </Layout>
    );
};

export default App;