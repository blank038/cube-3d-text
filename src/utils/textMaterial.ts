import * as THREE from "three";

// 生成渐变纹理
const createGradientTexture = (
    colorGradualStart: string,
    colorGradualEnd: string,
    repeat: number,
    offset: number
): THREE.Texture => {
    const size = 512;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const context = canvas.getContext("2d")!;

    // 创建线性渐变，从顶部到底部
    const gradient = context.createLinearGradient(0, 0, 0, size);
    gradient.addColorStop(0, colorGradualStart);
    gradient.addColorStop(1, colorGradualEnd);

    context.fillStyle = gradient;
    context.fillRect(0, 0, size, size);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace; // 设置编码为 sRGB
    texture.needsUpdate = true;

    // 计算文本高度
    // const textHeight = maxY - minY;

    // 计算纹理在 Y 方向上的重复次数
    // const repeatY = (textHeight / size) * 1.5;

    texture.repeat.set(1, repeat);
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;

    // 计算偏移量，使纹理居中
    // const offsetY = -((repeatY - 1) / 2);
    texture.offset.set(0, offset);

    return texture;
};

// 创建立方体贴图材质
export const createCubeMaterial = (
    colorGradualStart: string,
    colorGradualEnd: string,
    colorSide: string,
    colorBottomStart: string,
    colorBottomEnd: string,
): THREE.MeshStandardMaterial[] => { // 使用 MeshStandardMaterial
    const gradientTexture = createGradientTexture(
        colorGradualStart,
        colorGradualEnd,
        0.08,
        0
    );

    const gradientTextureBottom = createGradientTexture(
        colorBottomEnd,
        colorBottomStart,
        0.2,
        1
    );

    const roughness = 1.0;  // 粗糙度

    return [
        new THREE.MeshStandardMaterial({ color: colorSide, roughness }), // 右面
        new THREE.MeshStandardMaterial({ color: colorSide, roughness }), // 左面
        new THREE.MeshStandardMaterial({ color: colorSide, roughness }), // 上面
        new THREE.MeshStandardMaterial({ map: gradientTextureBottom, roughness }), // 下面
        new THREE.MeshStandardMaterial({ map: gradientTexture, roughness }), // 前面
        new THREE.MeshStandardMaterial({ color: colorSide, roughness }), // 后面
    ];
};