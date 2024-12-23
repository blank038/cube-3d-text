export interface TextOptions {
    size: number;
    depth: number;
    y: number;
    rotY: number
    materials: TextMaterials;
    outlineWidth: number;
    letterSpacing: number;
    spacingWidth: number;
}

export interface TextMaterials {
    front: TextMaterialOption;
    back: TextMaterialOption;
    up: TextMaterialOption;
    down: TextMaterialOption;
    left: TextMaterialOption;
    right: TextMaterialOption;
    outline: TextMaterialOption;
}

export type TextMaterialOption =
    | TextMaterialGradientOption
    | TextMaterialImageOption
    | TextMaterialColorOption;

export interface TextMaterialGradientOption {
    mode: 'gradient';
    colorGradualStart: string;
    colorGradualEnd: string;
    repeat: number;
    offset: number;
}

export interface TextMaterialImageOption {
    mode: 'image';
    image: string;
    repeatX: number;
    repeatY: number;
    offsetX: number;
    offsetY: number;
}

export interface TextMaterialColorOption {
    mode: 'color';
    color: string;
}

export interface CameraOptions {
    fov: number;
}