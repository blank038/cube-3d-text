// src/components/ColorPickerPopover.tsx
import React, { useState } from "react";
import { Popover, Button } from "antd";
import { HexColorPicker } from "react-colorful";

interface ColorPickerPopoverProps {
    color: string;
    onChange: (color: string) => void;
    label: string;
}

const ColorPickerPopover: React.FC<ColorPickerPopoverProps> = ({ color, onChange, label }) => {
    const [visible, setVisible] = useState(false);

    const handleVisibleChange = (newVisible: boolean) => {
        setVisible(newVisible);
    };

    return (
        <Popover
            content={<HexColorPicker color={color} onChange={onChange} />}
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