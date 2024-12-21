import React, { useContext, useState, useEffect, ReactNode } from "react";

type LanguageConfig = {
  [key: string]: string | LanguageConfig;
};

type LanguageParams = { [key: string]: string | number };

type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
  gLang: (path: string, params?: LanguageParams) => string;
};


export const languageConfig: Readonly<LanguageConfig> = {
  zh_CN: {
    zh_CN: "中文",
    en_US: "English",
    defaultText1: "我的世界",
    defaultText2: "中国版",
    resetCamera: "重置相机",
    screenshot: "截图",
    cameraSettings: "场景&相机 设置",
    font: "字体",
    perspective: "透视角度 ({angle}°)",
    text1: "第一行文字",
    text2: "第二行文字",
    front: "正面",
    back: "背面",
    left: "左侧",
    right: "右侧",
    up: "上面",
    down: "下面",
    outline: "描边",
    mode: "模式",
    color: "颜色",
    gradient: "渐变",
    image: "图片",
    selectColor: "选择{side}的颜色",
    selectColorStart: "选择{side}的起始颜色",
    selectColorEnd: "选择{side}的结束颜色",
    repeat: "重复次数",
    offset: "偏移量",
    Upload: "上传",
    repeatX: "X轴单位重复（缩放）",
    repeatY: "Y轴单位重复（缩放）",
    offsetX: "X轴偏移",
    offsetY: "Y轴偏移",
    presuppose: "预设",
    customize: "自定义",
    outlineSize: "描边大小",
    thickness: "文字厚度",
    spacing: "文字间距",
    fontSize: "字体大小",
    upDownRotate: "上下旋转",
    upDownPosition: "上下位置",
    content: "文本内容",
    texture: "纹理",
    fontSuccess: "字体加载完成!",
    fontLoading: "字体加载中...",

  },
  en_US: {
    zh_CN: "中文",
    en_US: "English",
    defaultText1: "MineCraft",
    defaultText2: "Bedrock Edition",
    resetCamera: "Reset Camera",
    screenshot: "Screenshot",
    cameraSettings: "Scene & Camera Settings",
    font: "Font",
    perspective: "Perspective ({angle}°)",
    text1: "Text Line 1",
    text2: "Text Line 2",
    front: "Front",
    back: "Back",
    left: "Left",
    right: "Right",
    up: "Up",
    down: "Down",
    outline: "Outline",
    mode: "Mode",
    color: "Color",
    gradient: "Gradient",
    image: "Image",
    selectColor: "Select Color: {side} Side",
    selectColorStart: "Select Start Color: {side} Side",
    selectColorEnd: "Select End Color: {side} Side",
    repeat: "Repeat",
    offset: "Offset",
    Upload: "Upload",
    repeatX: "Repeat X (Scale)",
    repeatY: "Repeat Y (Scale)",
    offsetX: "Offset X",
    offsetY: "Offset Y",
    presuppose: "Presuppose",
    customize: "Customize",
    outlineSize: "Outline Size",
    thickness: "Thickness",
    spacing: "Spacing",
    fontSize: "Font Size",
    upDownRotate: "Up Down Rotate",
    upDownPosition: "Up Down Position",
    content: "Content",
    texture: "Texture",
    fontSuccess: "Font loaded successfully!",
    fontLoading: "Loading font...",
  },
};

// Create context with a default value
const LanguageContext = React.createContext<LanguageContextType | undefined>(undefined);

// Provider component
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const initialLanguage = localStorage.getItem("language") || "zh_CN";
  const [language, setLanguage] = useState<string>(initialLanguage);

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const gLang = (path: string, params?: LanguageParams): string => {
    const getTranslation = (lang: string): string | undefined => {
      const keys = `${lang}.${path}`.split(".");
      let result: any = languageConfig;
      for (const key of keys) {
        if (result && typeof result === "object" && key in result) {
          result = result[key];
        } else {
          return undefined;
        }
      }
      return typeof result === "string" ? result : undefined;
    };

    const translation = getTranslation(language) || getTranslation("zh_CN") || path;
    
    if (params && typeof translation === "string") {
      return Object.entries(params).reduce(
        (result, [key, value]) => result.replace(new RegExp(`{${key}}`, "g"), String(value)),
        translation
      );
    }
    return translation;
  };

  const value = {
    language,
    setLanguage,
    gLang
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};