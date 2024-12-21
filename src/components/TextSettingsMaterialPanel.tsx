// src/components/TextSettingsMaterialPanel.tsx
import React, { useState } from "react";
import { Form, Select, Input, Slider, Collapse, Space } from "antd";
import ColorPickerPopover from "./ColorPickerPopover";
import {
    TextMaterials,
    TextMaterialOption,
    TextMaterialGradientOption,
    TextMaterialImageOption,
    TextMaterialColorOption,
} from "../types/text";

const { Panel } = Collapse;
const { Option } = Select;

interface TextSettingsMaterialPanelProps {
    materials: TextMaterials;
    onMaterialsChange: (materials: TextMaterials) => void;
}

const faceLabels: { [key in keyof TextMaterials]: string } = {
    front: "正面",
    back: "背面",
    up: "上侧",
    down: "下侧",
    left: "左侧",
    right: "右侧",
    outline: "描边",
};

const TextSettingsMaterialPanel: React.FC<TextSettingsMaterialPanelProps> = ({
                                                                                 materials,
                                                                                 onMaterialsChange,
                                                                             }) => {
    // 保存每种模式的配置
    const [materialConfigs, setMaterialConfigs] = useState<{
        [key in keyof TextMaterials]: {
            gradient?: TextMaterialGradientOption;
            image?: TextMaterialImageOption;
            color?: TextMaterialColorOption;
        };
    }>({} as any);

    const handleModeChange = (face: keyof TextMaterials, mode: TextMaterialOption["mode"]) => {
        const currentMaterial = materials[face];

        // 保存当前模式的配置
        setMaterialConfigs((prevConfigs) => ({
            ...prevConfigs,
            [face]: {
                ...prevConfigs[face],
                [currentMaterial.mode]: currentMaterial,
            },
        }));

        // 切换到新模式时，尝试恢复之前的配置
        let newMaterialOption: TextMaterialOption;
        if (materialConfigs[face] && materialConfigs[face][mode]) {
            newMaterialOption = materialConfigs[face][mode]!;
        } else {
            switch (mode) {
                case "gradient":
                    newMaterialOption = {
                        mode: "gradient",
                        colorGradualStart: "#ffffff",
                        colorGradualEnd: "#000000",
                        repeat: 1,
                        offset: 0,
                    } as TextMaterialGradientOption;
                    break;
                case "image":
                    newMaterialOption = {
                        mode: "image",
                        image: "",
                        repeat: 1,
                        offset: 0,
                    } as TextMaterialImageOption;
                    break;
                case "color":
                default:
                    newMaterialOption = {
                        mode: "color",
                        color: "#ffffff",
                    } as TextMaterialColorOption;
                    break;
            }
        }

        const updatedMaterials = {
            ...materials,
            [face]: newMaterialOption,
        };
        onMaterialsChange(updatedMaterials);
    };

    const handleOptionChange = (
        face: keyof TextMaterials,
        option: Partial<TextMaterialOption>
    ) => {
        const currentMaterial = materials[face];
        const updatedMaterial = { ...currentMaterial, ...option } as TextMaterialOption;
        const updatedMaterials = {
            ...materials,
            [face]: updatedMaterial,
        };
        onMaterialsChange(updatedMaterials);
    };

    const renderModeOptions = (face: keyof TextMaterials) => {
        const currentMaterial = materials[face];
        return (
            <>
                <Form.Item label="模式" key={`${face}-mode`}>
                    <Select
                        value={currentMaterial.mode}
                        onChange={(value) => handleModeChange(face, value)}
                        style={{ width: 150 }}
                    >
                        <Option value="color">颜色</Option>
                        <Option value="gradient">渐变</Option>
                        <Option value="image">图片</Option>
                    </Select>
                </Form.Item>

                {currentMaterial.mode === "color" && (
                    <Form.Item label="颜色" key={`${face}-color`}>
                        <ColorPickerPopover
                            color={(currentMaterial as TextMaterialColorOption).color}
                            onChange={(color) =>
                                handleOptionChange(face, { color } as TextMaterialColorOption)
                            }
                            label={`选择${faceLabels[face]}颜色`}
                        />
                    </Form.Item>
                )}

                {currentMaterial.mode === "gradient" && (
                    <>
                        <Form.Item label="颜色" key={`${face}-gradient-start`}>
                            <Space>
                                <ColorPickerPopover
                                    color={(currentMaterial as TextMaterialGradientOption).colorGradualStart}
                                    onChange={(color) =>
                                        handleOptionChange(face, { colorGradualStart: color })
                                    }
                                    label={`选择${faceLabels[face]}起始颜色`}
                                />
                                <ColorPickerPopover
                                    color={(currentMaterial as TextMaterialGradientOption).colorGradualEnd}
                                    onChange={(color) =>
                                        handleOptionChange(face, { colorGradualEnd: color })
                                    }
                                    label={`选择${faceLabels[face]}结束颜色`}
                                />
                            </Space>
                        </Form.Item>
                        <Form.Item label="重复次数" key={`${face}-gradient-repeat`}>
                            <Slider
                                min={0.1}
                                max={10}
                                step={0.1}
                                value={(currentMaterial as TextMaterialGradientOption).repeat}
                                onChange={(value) =>
                                    handleOptionChange(face, { repeat: value })
                                }
                            />
                        </Form.Item>
                        <Form.Item label="偏移量" key={`${face}-gradient-offset`}>
                            <Slider
                                min={0}
                                max={10}
                                step={0.1}
                                value={(currentMaterial as TextMaterialGradientOption).offset}
                                onChange={(value) =>
                                    handleOptionChange(face, { offset: value })
                                }
                            />
                        </Form.Item>
                    </>
                )}

                {currentMaterial.mode === "image" && (
                    <>
                        <Form.Item label="图片 URL" key={`${face}-image-url`}>
                            <Input
                                value={(currentMaterial as TextMaterialImageOption).image}
                                onChange={(e) =>
                                    handleOptionChange(face, { image: e.target.value })
                                }
                                placeholder="输入图片 URL"
                            />
                        </Form.Item>
                        <Form.Item label="重复次数" key={`${face}-image-repeat`}>
                            <Slider
                                min={0.001}
                                max={1}
                                step={0.001}
                                value={(currentMaterial as TextMaterialImageOption).repeat}
                                onChange={(value) =>
                                    handleOptionChange(face, { repeat: value })
                                }
                            />
                        </Form.Item>
                        <Form.Item label="偏移量" key={`${face}-image-offset`}>
                            <Slider
                                min={0}
                                max={10}
                                step={0.01}
                                value={(currentMaterial as TextMaterialImageOption).offset}
                                onChange={(value) =>
                                    handleOptionChange(face, { offset: value })
                                }
                            />
                        </Form.Item>
                    </>
                )}
            </>
        );
    };

    const renderExtraPreview = (material: TextMaterialOption) => {
        switch (material.mode) {
            case "color":
                return (
                    <div style={{
                        backgroundColor: (material as TextMaterialColorOption).color,
                        width: 20,
                        height: 20,
                        borderRadius: 3,
                        boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.1)"
                    }}/>
                );
            case "gradient":
                const {colorGradualStart, colorGradualEnd} = material as TextMaterialGradientOption;
                return (
                    <div style={{
                        background: `linear-gradient(180deg, ${colorGradualStart}, ${colorGradualEnd})`,
                        width: 20,
                        height: 20,
                        borderRadius: 3,
                        boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.1)"
                    }} />
                );
            case "image":
                return (
                    <img
                        src={(material as TextMaterialImageOption).image}
                        alt="preview"
                        style={{
                            width: 20,
                            height: 20,
                            borderRadius: 3,
                            boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.1)"
                        }}
                    />
                );
        }
    };

    return (
        <Collapse accordion>
            {(Object.keys(materials) as Array<keyof TextMaterials>).map((face) => (
                <Panel header={faceLabels[face]} key={face} extra={renderExtraPreview(materials[face])}>
                    <Form layout="vertical">
                        {renderModeOptions(face)}
                    </Form>
                </Panel>
            ))}
        </Collapse>
    );
};

export default TextSettingsMaterialPanel;