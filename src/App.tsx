// src/App.tsx
import React, { useState, useRef } from "react";
import { Layout, Flex, Form, Slider, Collapse, Button, ConfigProvider, Select } from "antd";
import { CameraOutlined, GlobalOutlined, ReloadOutlined } from "@ant-design/icons";
import { HappyProvider } from '@ant-design/happy-work-theme';
import ThreeCanvas, { ThreeCanvasHandle } from "./components/ThreeCanvas";
import "antd/dist/reset.css";
import { TextOptions, CameraOptions } from "./types/text";
import TextSettingsPanel from "./components/TextSettingsPanel.tsx";
import { materialGradientLightBlue, materialGradientMediumYellow } from "./presetMaterials.ts";
import { MessageProvider } from "./contexts/MessageContext";
import { useLanguage } from "./language.tsx";

const { Sider, Content } = Layout;
const { Panel } = Collapse;

// 字体映射
const fontsMap: { [name: string]: string } = {
    "REEJI Taiko Magic": "font/REEJI-TaikoMagicGB-Flash_Regular.json",
    "汉仪力量黑(简)": "font/HYLiLiangHeiJ_Regular.json",
    "Minecraft Ten": "font/Minecraft_Ten_Regular.json",
    "Fusion Pixel 8px": "font/Fusion_Pixel_8px_Proportional_zh_hans_Regular.json",
    "Fusion Pixel 10px": "font/Fusion_Pixel_10px_Proportional_zh_hans_Regular.json",
};

const App: React.FC = () => {
    const { language, setLanguage, gLang } = useLanguage();

    const [text1, setText1] = useState(gLang('defaultText1'));
    const [text2, setText2] = useState(gLang('defaultText2'));

    const [cameraOptions, setCameraOptions] = useState<CameraOptions>({
        fov: 75
    });

    // 配置文字的样式
    const [text1Options, setText1Options] = useState<TextOptions>({
        size: 10,
        depth: 5,
        y: 8,
        rotY: 0,
        materials: materialGradientMediumYellow,
        outlineWidth: 0.4,
        letterSpacing: 1.0
    });

    const [text2Options, setText2Options] = useState<TextOptions>({
        size: 5,
        depth: 3,
        y: -4,
        rotY: 0,
        materials: materialGradientLightBlue,
        outlineWidth: 0.5,
        letterSpacing: 1.5
    });

    const [selectedFont, setSelectedFont] = useState("REEJI Taiko Magic"); // 当前选中的字体

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
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#333333',
                },
                components: {
                    Select: {
                        optionSelectedBg: 'rgba(0, 0, 0, 0.12)',
                    },
                    Form: {
                        itemMarginBottom: 16
                    },
                },
            }}
        >
            <MessageProvider>
                <Layout style={{ height: "100vh" }}>
                    {/* 左侧配置面板 */}
                    <Sider width={300} style={{ background: "#F5F5F5", padding: 16, overflow: "auto" }}>
                        <Flex vertical gap={"middle"} style={{ width: "100%" }}>
                            <Collapse defaultActiveKey={["camera"]} bordered={false} style={{ background: "white", boxShadow: "0 2px 16px rgba(0, 0, 0, 0.05)" }}>
                                <Panel header={gLang('cameraSettings')} key="camera">
                                    <Form.Item label={gLang('font')}>
                                        <Select
                                            value={selectedFont}
                                            onChange={(value) => setSelectedFont(value)}
                                            style={{ width: "100%" }}
                                        >
                                            {Object.keys(fontsMap).map((fontName) => (
                                                <Select.Option key={fontName} value={fontName}>
                                                    {fontName}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                    <Form.Item label={gLang('perspective', {angle: cameraOptions.fov})} style={{ marginBottom: 0 }}>
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
                                <Panel header={gLang('text1')} key="1">
                                    <TextSettingsPanel
                                        text={text1}
                                        textOptions={text1Options}
                                        onTextChange={setText1}
                                        onTextOptionsChange={setText1Options}
                                    />
                                </Panel>

                                {/* 第二行文字 */}
                                <Panel header={gLang('text2')} key="2">
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
                            fontUrl={fontsMap[selectedFont]}
                        />
                        {/* 添加截图按钮 */}
                        <Flex gap={"small"} style={{ position: "absolute", top: 20, right: 20, zIndex: 1 }}>
                            <Select
                                prefix={<GlobalOutlined />}
                                defaultValue={language}
                                style={{ width: 120 }}
                                onChange={(value: string) => {
                                    setLanguage(value);
                                }}
                                options={[
                                    { value: 'zh_CN', label: gLang('zh_CN') },
                                    { value: 'en_US', label: gLang('en_US') },
                                ]}
                            />
                            <Button
                                type="default"
                                icon={<ReloadOutlined />}
                                onClick={handleResetCamera}
                            >
                                {gLang('resetCamera')}
                            </Button>
                            <HappyProvider>
                                <Button
                                    type="primary"
                                    icon={<CameraOutlined />}
                                    onClick={handleScreenshot}
                                >
                                    {gLang('screenshot')}
                                </Button>
                            </HappyProvider>
                        </Flex>
                    </Content>
                </Layout>
            </MessageProvider>
        </ConfigProvider>
    );
};

export default App;