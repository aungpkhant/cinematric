import { extendTheme } from "@chakra-ui/react";

const themeExtension = {
  fonts: {
    heading: `"Montserrat Alternates"`,
    body: `"Fira Sans"`,
  },
  colors: {
    // Material Design
    // https://material.io/design/color/dark-theme.html#color-usage-and-palettes
    apple: {
      50: "#FCE8E8",
      100: "#F8BFBF",
      200: "#F39696",
      300: "#EE6D6D",
      400: "#E94444",
      500: "#E51A1A",
      600: "#B71515",
      700: "#891010",
      800: "#5B0B0B",
      900: "#2E0505",
    },
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
