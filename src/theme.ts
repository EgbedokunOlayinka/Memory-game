import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const colors = {
  darkBG: "#162938",
  lightBG: "#FCFCFC",
  primary: "#31485A", // dark icon color
  secondary: "#BCCBD4", // light icon color
  tertiary: "#DFE6EC", // ash color
  main: "#FDA215", // yellow
};

const fonts = {
  body: "Poppins, sans-serif",
};

const theme = extendTheme({ colors, fonts, config });

export default theme;
