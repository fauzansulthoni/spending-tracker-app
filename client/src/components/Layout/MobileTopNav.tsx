import { IconButton, LinearProgress, Stack, Typography } from "@mui/material";
import { useThemeContext } from "../../theme/ThemeContextProvider";
import { ArrowBack } from "@mui/icons-material";
interface MobileTopNav {
  headerName: string;
  isAnyLoading: boolean;
}
const MobileTopNav = ({ headerName, isAnyLoading }: MobileTopNav) => {
  const { theme } = useThemeContext();

  return (
    <Stack
      divider
      direction="row"
      sx={{
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        padding: "18px",
        boxSizing: "border-box",
        backgroundColor: theme.palette.bgColor.main,
        color: theme.palette.bgColor.contrastText,
      }}
    >
      <IconButton
        sx={{
          position: "absolute",
          left: 0,
          color: theme.palette.bgColor.contrastText,
        }}
      >
        <ArrowBack />
      </IconButton>
      <Typography variant="h6" sx={{ fontWeight: "700" }}>
        {headerName}
      </Typography>

      {isAnyLoading && (
        <LinearProgress
          sx={{ position: "absolute", bottom: 0, left: 0, width: "100vw" }}
        />
      )}
    </Stack>
  );
};

export default MobileTopNav;
