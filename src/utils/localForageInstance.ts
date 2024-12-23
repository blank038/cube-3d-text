import localForage from "localforage";

const customFontsStore = localForage.createInstance({
    name: "customFonts",
    storeName: "fonts",
    description: "Store custom fonts in JSON format"
});

export default customFontsStore;