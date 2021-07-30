import { extendTheme } from "@chakra-ui/react";

const themeExtension = {
  colors: {
    // Material Design
    // https://material.io/design/color/dark-theme.html#color-usage-and-palettes
    elevation: { 100: "black", 200: "#1d1d1d" },
  },
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
};

const theme = extendTheme(themeExtension);

console.log({ theme });

export default theme;
