import React, { useState } from "react";
import { Popover, Button, Input } from "antd";
import { HexColorPicker } from "react-colorful";

interface ColorPickerPopoverProps {
    color: string;
    onChange: (color: string) => void;
    label: string;
}

const ColorPickerPopover: React.FC<ColorPickerPopoverProps> = ({ color, onChange, label }) => {
    const [visible, setVisible] = useState(false);
    const [inputColor, setInputColor] = useState(color);

    const handleVisibleChange = (newVisible: boolean) => {
        setVisible(newVisible);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newColor = e.target.value;
        setInputColor(newColor);
        onChange(newColor);
    };

    return (
        <Popover
            content={
                <>
                    <HexColorPicker color={color} onChange={newColor => {
                        onChange(newColor);
                        setInputColor(newColor);
                    }} />
                    <Input
                        value={inputColor}
                        onChange={handleInputChange}
                        style={{ marginTop: 8 }}
                    />
                </>
            }
            title={label}
            trigger="click"
            visible={visible}
            onVisibleChange={handleVisibleChange}
        >
            <Button
                style={{
                    backgroundColor: color,
                    border: "1px solid #d9d9d9",
                    width: '32px',
                    height: '32px',
                }}
            >
            </Button>
        </Popover>
    );
};

export default ColorPickerPopover;