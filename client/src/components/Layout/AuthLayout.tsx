import { Box } from "@mui/material";
import { useThemeContext } from "../../theme/ThemeContextProvider";
import { Outlet } from "react-router-dom";
import { useLayoutContext } from "../../context/LayoutContext";

const AuthLayout = () => {
  const { theme } = useThemeContext();
  const { isSmUp } = useLayoutContext();
  return (
    <Box
      sx={{
        padding: "32px",
        boxSizing: "border-box",
        height: "100dvh",
        width: "100dvw",
        display: "flex",
        justifyContent: "center",
        alignItems: isSmUp ? "center" : "none",
        backgroundColor: isSmUp
          ? theme.palette.bgColor.light
          : theme.palette.bgColor.main,
      }}
    >
      <Outlet />
    </Box>
  );
};

export default AuthLayout;
