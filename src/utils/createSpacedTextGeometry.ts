// src/utils/createSpacedTextGeometry.ts
import * as THREE from "three";
import { Font, FontData } from "three/examples/jsm/loaders/FontLoader.js";
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

interface ExtendedFontData extends FontData {
    metrics: {
        advanceWidth: number;
    };
}

interface CreateSpacedTextGeometryOptions {
    text: string;
    font: Font;
    size: number;
    height: number;
    curveSegments: number;
    bevelEnabled: boolean;
    letterSpacing: number;
}

export const createSpacedTextGeometry = ({
    text,
    font,
    size,
    height,
    curveSegments,
    bevelEnabled,
    letterSpacing = 0
}: CreateSpacedTextGeometryOptions): THREE.BufferGeometry => {
    const geometries: THREE.BufferGeometry[] = [];
    let offsetX = 0;

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (char === " ") {
            // Handle space: set spacing based on font's space width
            const spaceWidth = (font.data as ExtendedFontData).metrics.advanceWidth || size * 0.3;
            offsetX += spaceWidth * size / 1000 + letterSpacing;
            continue;
        }

        const charGeometry = new TextGeometry(char, {
            font,
            size,
            height,
            curveSegments,
            bevelEnabled
        });

        charGeometry.computeBoundingBox();
        const charWidth = charGeometry.boundingBox ? charGeometry.boundingBox.max.x - charGeometry.boundingBox.min.x : size;

        charGeometry.translate(offsetX, 0, 0);
        geometries.push(charGeometry);

        // Update offset for the next character
        offsetX += charWidth + letterSpacing;
    }

    // Merge all character geometries
    const mergedGeometry = mergeGeometries(geometries, false);
    mergedGeometry.center(); // Center if needed

    return mergedGeometry;
};