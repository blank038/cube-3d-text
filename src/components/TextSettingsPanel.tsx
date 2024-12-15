import React from "react";
import { Form, Input, Slider } from "antd";
import { HexColorPicker } from "react-colorful";
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
            <Form.Item label={`文字大小 (${textOptions.size})`}>
                <Slider
                    min={1}
                    max={20}
                    step={1}
                    value={textOptions.size}
                    onChange={(val) => onTextOptionsChange({ ...textOptions, size: val })}
                />
            </Form.Item>
            <Form.Item label="字间距">
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
            <Form.Item label="正面颜色渐变（上）">
                <HexColorPicker
                    color={textOptions.colorGradualStart}
                    onChange={(colorGradualStart) => onTextOptionsChange({ ...textOptions, colorGradualStart })}
                />
            </Form.Item>
            <Form.Item label="正面颜色渐变（下）">
                <HexColorPicker
                    color={textOptions.colorGradualEnd}
                    onChange={(colorGradualEnd) => onTextOptionsChange({ ...textOptions, colorGradualEnd })}
                />
            </Form.Item>
            <Form.Item label="侧面颜色">
                <HexColorPicker
                    color={textOptions.colorSide}
                    onChange={(colorSide) => onTextOptionsChange({ ...textOptions, colorSide })}
                />
            </Form.Item>
            <Form.Item label="底面颜色渐变（上）">
                <HexColorPicker
                    color={textOptions.colorBottomStart}
                    onChange={(colorBottomStart) => onTextOptionsChange({ ...textOptions, colorBottomStart })}
                />
            </Form.Item>
            <Form.Item label="底面颜色渐变（下）">
                <HexColorPicker
                    color={textOptions.colorBottomEnd}
                    onChange={(colorBottomEnd) => onTextOptionsChange({ ...textOptions, colorBottomEnd })}
                />
            </Form.Item>
            <Form.Item label="描边颜色">
                <HexColorPicker
                    color={textOptions.outlineColor}
                    onChange={(color) => onTextOptionsChange({ ...textOptions, outlineColor: color })}
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