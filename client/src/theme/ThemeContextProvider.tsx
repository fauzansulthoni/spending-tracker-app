import type { Theme } from "@mui/material/styles";
import { createTheme } from "@mui/material";
import { useColorTheme } from "./useColorTheme";
import {
  createContext,
  useContext,
  type FC,
  type PropsWithChildren,
} from "react";

type ThemeContextType = {
  mode: "light" | "dark";
  toggleColorMode: () => void;
  theme: Theme;
};

export const ThemeContext = createContext<ThemeContextType>({
  mode: "light",
  toggleColorMode: () => {},
  theme: createTheme(),
});

export const ThemeContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const value = useColorTheme();
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  return useContext(ThemeContext);
};
