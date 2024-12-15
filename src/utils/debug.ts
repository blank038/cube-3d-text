import * as THREE from "three";

// Function to convert THREE.Texture to data URL
const textureToDataURL = (texture: THREE.Texture): string => {
    const canvas = document.createElement("canvas");
    canvas.width = texture.image.width;
    canvas.height = texture.image.height;
    const context = canvas.getContext("2d")!;
    context.drawImage(texture.image, 0, 0);
    return canvas.toDataURL();
};

// Function to display the texture on the page
export const displayTexture = (texture: THREE.Texture) => {
    const dataURL = textureToDataURL(texture);
    const imgElement = document.createElement("img");
    imgElement.src = dataURL;
    imgElement.style.position = "absolute";
    imgElement.style.top = "10px";
    imgElement.style.right = "10px";
    imgElement.style.border = "1px solid black";
    document.body.appendChild(imgElement);
};
