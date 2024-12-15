// src/components/TextSettingsPanel.tsx
import React from "react";
import { Form, Space, Input, Slider } from "antd";
import ColorPickerPopover from "./ColorPickerPopover"; // 引入新组件
import { TextOptions } from "../types/text";

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

            {/* 替换后的颜色选择器 */}
            <Form.Item label="正面颜色渐变">
                <Space>
                    <ColorPickerPopover
                        color={textOptions.colorGradualStart}
                        onChange={(color) => onTextOptionsChange({ ...textOptions, colorGradualStart: color })}
                        label="选择正面颜色渐变（上）"
                    />
                    <ColorPickerPopover
                        color={textOptions.colorGradualEnd}
                        onChange={(color) => onTextOptionsChange({ ...textOptions, colorGradualEnd: color })}
                        label="选择正面颜色渐变（下）"
                    />
                </Space>
            </Form.Item>
            <Form.Item label="侧面颜色">
                <ColorPickerPopover
                    color={textOptions.colorSide}
                    onChange={(color) => onTextOptionsChange({ ...textOptions, colorSide: color })}
                    label="选择侧面颜色"
                />
            </Form.Item>
            <Form.Item label="底面颜色渐变">
                <Space>
                    <ColorPickerPopover
                        color={textOptions.colorBottomStart}
                        onChange={(color) => onTextOptionsChange({ ...textOptions, colorBottomStart: color })}
                        label="选择底面颜色渐变（上）"
                    />
                    <ColorPickerPopover
                        color={textOptions.colorBottomEnd}
                        onChange={(color) => onTextOptionsChange({ ...textOptions, colorBottomEnd: color })}
                        label="选择底面颜色渐变（下）"
                    />
                </Space>
            </Form.Item>
            <Form.Item label="描边颜色">
                <ColorPickerPopover
                    color={textOptions.outlineColor}
                    onChange={(color) => onTextOptionsChange({ ...textOptions, outlineColor: color })}
                    label="选择描边颜色"
                />
            </Form.Item>
            <Form.Item label={`描边大小 (${textOptions.outlineWidth})`}>
                <Slider
                    min={0}
                    max={10.0}
                    step={0.1}
                    value={textOptions.outlineWidth}
                    onChange={(val) => onTextOptionsChange({ ...textOptions, outlineWidth: val })}
                />
            </Form.Item>
        </>
    );
};

export default TextSettingsPanel;