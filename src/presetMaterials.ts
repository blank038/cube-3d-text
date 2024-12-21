import {
    TextMaterialColorOption,
    TextMaterialGradientOption,
    TextMaterialImageOption,
    TextMaterials
} from "./types/text";

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

// 紫色渐变配色方案
export const materialGradientPurple: TextMaterials = {
    front: {
        mode: "gradient",
        colorGradualStart: "#ebd4ff", // 浅紫
        colorGradualEnd: "#b56edd", // 深紫
        repeat: 0.05,
        offset: 0
    } as TextMaterialGradientOption,
    back: {
        mode: "gradient",
        colorGradualStart: "#ebd4ff",
        colorGradualEnd: "#b56edd",
        repeat: 0.05,
        offset: 0
    } as TextMaterialGradientOption,
    up: {
        mode: "color",
        color: "#4a148c"
    } as TextMaterialColorOption,
    down: {
        mode: "gradient",
        colorGradualStart: "#803daf", // 较亮的紫色
        colorGradualEnd: "#390c70", // 深紫色
        repeat: 0.15,
        offset: 0.8
    } as TextMaterialGradientOption,
    left: {
        mode: "color",
        color: "#4a148c"
    } as TextMaterialColorOption,
    right: {
        mode: "color",
        color: "#4a148c"
    } as TextMaterialColorOption,
    outline: {
        mode: "color",
        color: "#250d48" // 更深的描边颜色
    } as TextMaterialColorOption
}

// 绿色渐变配色方案
export const materialGradientGreen: TextMaterials = {
    front: {
        mode: "gradient",
        colorGradualStart: "#c8ffc3", // 浅绿
        colorGradualEnd: "#66d866", // 深绿
        repeat: 0.05,
        offset: 0
    } as TextMaterialGradientOption,
    back: {
        mode: "gradient",
        colorGradualStart: "#c8ffc3",
        colorGradualEnd: "#66d866",
        repeat: 0.05,
        offset: 0
    } as TextMaterialGradientOption,
    up: {
        mode: "color",
        color: "#1a5e1a"
    } as TextMaterialColorOption,
    down: {
        mode: "gradient",
        colorGradualStart: "#3f8f3f", // 较亮的绿色
        colorGradualEnd: "#144e14", // 深绿色
        repeat: 0.2,
        offset: 0.8
    } as TextMaterialGradientOption,
    left: {
        mode: "color",
        color: "#1a5e1a"
    } as TextMaterialColorOption,
    right: {
        mode: "color",
        color: "#1a5e1a"
    } as TextMaterialColorOption,
    outline: {
        mode: "color",
        color: "#0a2c0a" // 更深的描边颜色
    } as TextMaterialColorOption
}

// 红色
export const materialGradientRed: TextMaterials = {
    front: {
        mode: "gradient",
        colorGradualStart: "#ff9a9a", // 浅红
        colorGradualEnd: "#ff4d4d", // 深红
        repeat: 0.05,
        offset: 0
    } as TextMaterialGradientOption,
    back: {
        mode: "gradient",
        colorGradualStart: "#ff9a9a",
        colorGradualEnd: "#ff4d4d",
        repeat: 0.05,
        offset: 0
    } as TextMaterialGradientOption,
    up: {
        mode: "color",
        color: "#800000"
    } as TextMaterialColorOption,
    down: {
        mode: "gradient",
        colorGradualStart: "#b52525", // 较亮的红色
        colorGradualEnd: "#780000", // 深红色
        repeat: 0.2,
        offset: 0.8
    } as TextMaterialGradientOption,
    left: {
        mode: "color",
        color: "#800000"
    } as TextMaterialColorOption,
    right: {
        mode: "color",
        color: "#800000"
    } as TextMaterialColorOption,
    outline: {
        mode: "color",
        color: "#400000" // 更深的描边颜色
    } as TextMaterialColorOption
}

// 粉色
export const materialGradientPink: TextMaterials = {
    front: {
        mode: "gradient",
        colorGradualStart: "#ffbadc",
        colorGradualEnd: "#ff65b3",
        repeat: 0.05,
        offset: 0
    } as TextMaterialGradientOption,
    back: {
        mode: "gradient",
        colorGradualStart: "#ffbadc",
        colorGradualEnd: "#ff65b3",
        repeat: 0.05,
        offset: 0
    } as TextMaterialGradientOption,
    up: {
        mode: "color",
        color: "#80002d"
    } as TextMaterialColorOption,
    down: {
        mode: "gradient",
        colorGradualStart: "#bd2d6e", // 较亮的红色
        colorGradualEnd: "#780032", // 深红色
        repeat: 0.2,
        offset: 0.8
    } as TextMaterialGradientOption,
    left: {
        mode: "color",
        color: "#80003a"
    } as TextMaterialColorOption,
    right: {
        mode: "color",
        color: "#800040"
    } as TextMaterialColorOption,
    outline: {
        mode: "color",
        color: "#400024" // 更深的描边颜色
    } as TextMaterialColorOption
}

// 青色
export const materialGradientCyan: TextMaterials = {
    front: {
        mode: "gradient",
        colorGradualStart: "#caffff",
        colorGradualEnd: "#31deed",
        repeat: 0.05,
        offset: 0
    } as TextMaterialGradientOption,
    back: {
        mode: "gradient",
        colorGradualStart: "#caffff",
        colorGradualEnd: "#31deed",
        repeat: 0.05,
        offset: 0
    } as TextMaterialGradientOption,
    up: {
        mode: "color",
        color: "#004d4d"
    } as TextMaterialColorOption,
    down: {
        mode: "gradient",
        colorGradualStart: "#00b3b3", // 较亮的青色
        colorGradualEnd: "#004d4d", // 深青色
        repeat: 0.2,
        offset: 0.8
    } as TextMaterialGradientOption,
    left: {
        mode: "color",
        color: "#004d4d"
    } as TextMaterialColorOption,
    right: {
        mode: "color",
        color: "#004d4d"
    } as TextMaterialColorOption,
    outline: {
        mode: "color",
        color: "#002626" // 更深的描边颜色
    } as TextMaterialColorOption
}

import textureSnow from "./assets/material/snow.png";

export const materialSnow: TextMaterials = {
    front: {
        mode: "image",
        image: textureSnow,
        repeatX: 0.077,
        repeatY: 0.077,
        offsetX: 0,
        offsetY: 0.1,
    } as TextMaterialImageOption,
    back: {
        mode: "color",
        color: "#1c53a3"
    } as TextMaterialColorOption,
    up: {
        mode: "color",
        color: "#35a3d6"
    } as TextMaterialColorOption,
    down: {
        mode: "gradient",
        colorGradualStart: "#1c53a3",
        colorGradualEnd: "#151855",
        repeat: 0.2,
        offset: 0.8
    } as TextMaterialGradientOption,
    left: {
        mode: "gradient",
        colorGradualStart: "#0e3a7a",
        colorGradualEnd: "#151855",
        repeat: 0.2,
        offset: 0.8
    } as TextMaterialGradientOption,
    right: {
        mode: "gradient",
        colorGradualStart: "#0e3a7a",
        colorGradualEnd: "#151855",
        repeat: 0.2,
        offset: 0.8
    } as TextMaterialGradientOption,
    outline: {
        mode: "color",
        color: "#1d0e46" // 更深的描边颜色
    } as TextMaterialColorOption
}

// cherry(image)
import textureCherry from "./assets/material/cherry.png";

export const materialCherry: TextMaterials = {
    front: {
        mode: "image",
        image: textureCherry,
        repeatX: 0.038,
        repeatY: 0.076,
        offsetX: 0,
        offsetY: 0.1,
    } as TextMaterialImageOption,
    back: {
        mode: "color",
        color: "#7f4668"
    } as TextMaterialColorOption,
    up: {
        mode: "color",
        color: "#7f4668"
    } as TextMaterialColorOption,
    down: {
        mode: "gradient",
        colorGradualStart: "#a65c88",
        colorGradualEnd: "#602d4b",
        repeat: 0.2,
        offset: 0.8
    } as TextMaterialGradientOption,
    left: {
        mode: "gradient",
        colorGradualStart: "#7f4668",
        colorGradualEnd: "#602d4b",
        repeat: 0.2,
        offset: 0.8
    } as TextMaterialGradientOption,
    right: {
        mode: "gradient",
        colorGradualStart: "#7f4668",
        colorGradualEnd: "#602d4b",
        repeat: 0.2,
        offset: 0.8
    } as TextMaterialGradientOption,
    outline: {
        mode: "color",
        color: "#441b39" // 更深的描边颜色
    } as TextMaterialColorOption
}

import textureGrass from "./assets/material/grass.png";
import textureGrassDirt from "./assets/material/grass_dirt.png";

export const materialGrass: TextMaterials = {
    front: {
        mode: "image",
        image: textureGrass,
        repeatX: 0.038,
        repeatY: 0.076,
        offsetX: 0,
        offsetY: 0.1,
    } as TextMaterialImageOption,
    back: {
        mode: "color",
        color: "#4f9810"
    } as TextMaterialColorOption,
    up: {
        mode: "color",
        color: "#4f9810"
    } as TextMaterialColorOption,
    down: {
        mode: "image",
        image: textureGrassDirt,
        repeatX: 0.107,
        repeatY: 0.134,
        offsetX: 0,
        offsetY: 0.56,
    } as TextMaterialImageOption,
    left: {
        mode: "gradient",
        colorGradualStart: "#5c2f0e",
        colorGradualEnd: "#2b040c",
        repeat: 0.2,
        offset: 0.8
    } as TextMaterialGradientOption,
    right: {
        mode: "gradient",
        colorGradualStart: "#5c2f0e",
        colorGradualEnd: "#2b040c",
        repeat: 0.2,
        offset: 0.8
    } as TextMaterialGradientOption,
    outline: {
        mode: "color",
        color: "#2b040c"
    } as TextMaterialColorOption
}

// 添加到预设材料中
export const presetMaterials = [
    materialGradientRed,
    materialGradientMediumYellow,
    materialGradientGreen,
    materialGradientCyan,
    materialGradientLightBlue,
    materialGradientPurple,
    materialGradientPink,
    materialSnow,
    materialCherry,
    materialGrass
]