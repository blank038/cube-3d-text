import { TextMaterialColorOption, TextMaterialGradientOption, TextMaterials } from "./types/text";

export const materialGradientMediumYellow : TextMaterials = {
    front: {
        mode: "gradient",
        colorGradualStart: "#ffd07b",
        colorGradualEnd: "#ffaa00",
        repeat: 0.08,
        offset: 0
    } as TextMaterialGradientOption,
    back: {
        mode: "gradient",
        colorGradualStart: "#ffd07b",
        colorGradualEnd: "#ffaa00",
        repeat: 0.08,
        offset: 0
    } as TextMaterialGradientOption,
    up: {
        mode: "color",
        color: "#553800"
    } as TextMaterialColorOption,
    down: {
        mode: "gradient",
        colorGradualStart: "#a56c00",
        colorGradualEnd: "#553800",
        repeat: 0.2,
        offset: 0.7
    } as TextMaterialGradientOption,
    left: {
        mode: "color",
        color: "#553800"
    } as TextMaterialColorOption,
    right: {
        mode: "color",
        color: "#553800"
    } as TextMaterialColorOption,
    outline: {
        mode: "color",
        color: "#291a00"
    } as TextMaterialColorOption
}

export const materialGradientLightBlue : TextMaterials = {
    front: {
        mode: "gradient",
        colorGradualStart: "#9ae5ff",
        colorGradualEnd: "#13b2ff",
        repeat: 0.08,
        offset: 0
    } as TextMaterialGradientOption,
    back: {
        mode: "gradient",
        colorGradualStart: "#9ae5ff",
        colorGradualEnd: "#13b2ff",
        repeat: 0.08,
        offset: 0
    } as TextMaterialGradientOption,
    up: {
        mode: "color",
        color: "#003855"
    } as TextMaterialColorOption,
    down: {
        mode: "gradient",
        colorGradualStart: "#00649a",
        colorGradualEnd: "#003855",
        repeat: 0.2,
        offset: 1
    } as TextMaterialGradientOption,
    left: {
        mode: "color",
        color: "#003855"
    } as TextMaterialColorOption,
    right: {
        mode: "color",
        color: "#003855"
    } as TextMaterialColorOption,
    outline: {
        mode: "color",
        color: "#001e2b"
    } as TextMaterialColorOption
}