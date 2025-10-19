import {
  createTheme,
  type PaletteMode,
  type ThemeOptions,
} from "@mui/material";
import { useMemo, useState } from "react";
import theme, { getDesignTokens } from "./theme";
import { deepmerge } from "@mui/utils";

export const useColorTheme = () => {
  const [mode, setMode] = useState<PaletteMode>("dark");

  const toggleColorMode = () =>
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));

  const modifiedTheme = useMemo(() => {
    const baseTheme = createTheme(theme);
    const designTokens = getDesignTokens(mode);
    return createTheme(deepmerge(baseTheme, designTokens as ThemeOptions));
  }, [mode]);
  return {
    theme: modifiedTheme,
    mode,
    toggleColorMode,
  };
};


