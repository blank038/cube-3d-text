// src/components/TextSettingsPanel.tsx
import React, { useState } from "react";
import { Form, Input, Slider, Segmented, Flex } from "antd";
import { TextOptions } from "../types/text";
import TextSettingsMaterialPanel from "./TextSettingsMaterialPanel.tsx";
import TextSettingsMaterialPresets from "./TextSettingsMaterialPresets.tsx";
import { presetMaterials } from "../presetMaterials.ts";

interface TextSettingsPanelProps {
    text: string;
    textOptions: TextOptions;
    onTextChange: (text: string) => void;
    onTextOptionsChange: (options: TextOptions) => void;
}

const TextSettingsPanel: React.FC<TextSettingsPanelProps> = ({
                                                                 text,
                                                                 textOptions,
                                                                 onTextChange,
                                                                 onTextOptionsChange,
                                                             }) => {

    const [materialType, setMaterialType] = useState<'预设' | '自定义'>('预设');

    return (
        <>
            <Form.Item label="文本内容">
                <Input value={text} onChange={(e) => onTextChange(e.target.value)} />
            </Form.Item>
            <Form.Item label={`上下位置 (${textOptions.y.toFixed(1)})`}>
                <Slider
                    min={-20}
                    max={20}
                    step={0.1}
                    value={textOptions.y}
                    onChange={(val) => onTextOptionsChange({ ...textOptions, y: val })}
                />
            </Form.Item>
            <Form.Item label={`文字大小 (${textOptions.size})`}>
                <Slider
                    min={1}
                    max={20}
                    step={1}
                    value={textOptions.size}
                    onChange={(val) => onTextOptionsChange({ ...textOptions, size: val })}
                />
            </Form.Item>
            <Form.Item label={`字间距 (${textOptions.letterSpacing.toFixed(1) ?? "1.0"})`}>
                <Slider
                    min={0}
                    max={5}
                    step={0.1}
                    value={textOptions.letterSpacing}
                    onChange={(val) => onTextOptionsChange({ ...textOptions, letterSpacing: val })}
                />
            </Form.Item>
            <Form.Item label={`文字厚度 (${textOptions.depth})`}>
                <Slider
                    min={1}
                    max={10}
                    step={1}
                    value={textOptions.depth}
                    onChange={(val) => onTextOptionsChange({ ...textOptions, depth: val })}
                />
            </Form.Item>
            <Form.Item label="材质" layout={'vertical'}>
                <Flex gap={'small'} vertical>
                    <Segmented value={materialType} options={['预设', '自定义']} block onChange={setMaterialType} />
                    {(materialType === '预设') ? (
                        <TextSettingsMaterialPresets
                            presetMaterials={presetMaterials}
                            materials={textOptions.materials}
                            onMaterialsChange={(materials) => onTextOptionsChange({...textOptions, materials})}
                        />
                    ) : (
                        <TextSettingsMaterialPanel
                            materials={textOptions.materials}
                            onMaterialsChange={(materials) => onTextOptionsChange({...textOptions, materials})}
                        />
                    )}
                </Flex>
            </Form.Item>
            <Form.Item label={`描边大小 (${textOptions.outlineWidth})`}>
                <Slider
                    min={0}
                    max={2.0}
                    step={0.1}
                    value={textOptions.outlineWidth}
                    onChange={(val) => onTextOptionsChange({ ...textOptions, outlineWidth: val })}
                />
            </Form.Item>
        </>
    );
};

export default TextSettingsPanel;