import { useMediaQuery } from "@mui/material";
import {
  createContext,
  useState,
  useContext,
  type FC,
  type PropsWithChildren,
} from "react";
import { useThemeContext } from "../theme/ThemeContextProvider";

type LayoutContextType = {
  isSmUp: boolean;
};

export const LayoutContext = createContext<LayoutContextType>({
  isSmUp: false,
});

export const LayoutContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const { theme } = useThemeContext();
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <LayoutContext.Provider value={{ isSmUp }}>
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayoutContext = () => {
  return useContext(LayoutContext);
};
