// src/components/TextSettingsMaterialPanel.tsx
import React, { CSSProperties } from "react";
import { Card, Flex, Button, ConfigProvider } from "antd";
import {
    TextMaterials,
    TextMaterialGradientOption,
    TextMaterialImageOption,
    TextMaterialColorOption,
} from "../types/text";
import { CheckSquareTwoTone } from "@ant-design/icons";

interface TextSettingsMaterialPanelProps {
    presetMaterials: TextMaterials[];
    materials: TextMaterials;
    onMaterialsChange: (materials: TextMaterials) => void;
}

const TextSettingsMaterialPanel: React.FC<TextSettingsMaterialPanelProps> = ({
                                                                                 presetMaterials,
                                                                                 materials,
                                                                                 onMaterialsChange,
                                                                             }) => {

    const renderPreview = (material: TextMaterials) : CSSProperties => {
        switch (material.front.mode) {
            case "color":
                return (
                    {
                        backgroundColor: (material.front as TextMaterialColorOption).color
                    }
                );
            case "gradient":
                const {colorGradualStart, colorGradualEnd} = material.front as TextMaterialGradientOption;
                return (
                    {
                        background: `linear-gradient(180deg, ${colorGradualStart}, ${colorGradualEnd})`
                    }
                );
            case "image":
                return (
                    {
                        backgroundImage: `url(${(material.front as TextMaterialImageOption).image})`,
                    }
                );
        }
    };

    type TwoToneColor = string | [string, string];

    const iconColor = (materials: TextMaterials): TwoToneColor => {
        const colors: TwoToneColor = ['white', 'rgba(255, 255, 255, .1)'];
        switch (materials.down.mode) {
            case "color":
                colors[0] = (materials.down as TextMaterialColorOption).color;
                break;
            case "gradient":
                colors[0] = (materials.down as TextMaterialGradientOption).colorGradualEnd;
                break;
        }
        return colors;
    }

    return (
        <Card size={'small'}>
            <Flex gap={'small'} vertical>
                {presetMaterials.map((preset) => (
                    <ConfigProvider
                        theme={{
                            token: {
                                colorPrimary: iconColor(preset)[0],
                            }
                        }}
                    >
                        <Button
                            block
                            type={preset === materials ? 'primary' : undefined}
                            ghost={preset === materials}
                            onClick={() => onMaterialsChange(preset)}
                            style={renderPreview(preset)}
                        >
                            {preset === materials && <CheckSquareTwoTone twoToneColor={iconColor(preset)}/>}
                        </Button>
                    </ConfigProvider>
                ))}
            </Flex>
        </Card>
    );
};

export default TextSettingsMaterialPanel;