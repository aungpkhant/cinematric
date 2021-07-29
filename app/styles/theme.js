import { extendTheme } from "@chakra-ui/react";

const themeExtension = {
  colors: {
    // Material Design
    // https://material.io/design/color/dark-theme.html#color-usage-and-palettes
    elevation: { 100: "#1d1d1d", 200: "#3f3f3f" },
  },
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
};

const theme = extendTheme(themeExtension);

console.log({ theme });

export default theme;
