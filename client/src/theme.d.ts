import { PaletteColorOptions, PaletteColor } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    customColor: PaletteColor;
    bgColor: PaletteColor;
    bgColorPrimary: PaletteColor;
  }
  interface PaletteOptions {
    customColor?: PaletteColorOptions;
    bgColor: PaletteColorOptions;
    bgColorPrimary: PaletteColorOptions;
  }
}
