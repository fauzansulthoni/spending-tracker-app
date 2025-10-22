import { Box } from "@mui/material";
import { useThemeContext } from "../../theme/ThemeContextProvider";
import { Outlet, useLocation } from "react-router-dom";

import { useEffect, useState } from "react";
import CustomBottomNavigation from "./CustomBottomNavigation";
import SnackbarCustom, { defaultSnackbarState } from "../Common/SnackbarCustom";
import { useUserContext } from "../../context/UserContext";
// import { useAppSelector } from "../../hooks/hook";
import TopNav from "./TopNav";

const UserLayout = () => {
  const { theme } = useThemeContext();
  const location = useLocation();
  const [value, setValue] = useState(location.pathname);
  useEffect(() => {
    setValue(location.pathname);
  }, [location.pathname]);
  // const isLoadingTransaction = useAppSelector(
  //   (state) => state.transaction.isLoading
  // );
  // const isLoadingCategory = useAppSelector((state) => state.category.isLoading);
  // const isLoadingAccount = useAppSelector((state) => state.account.isLoading);
  // const isAnyLoading = useMemo(
  //   () => isLoadingTransaction || isLoadingCategory || isLoadingAccount,
  //   [isLoadingTransaction, isLoadingCategory, isLoadingAccount]
  // );

  const [_headerName, setHeaderName] = useState("SpendWise");
  const snackbarState = useUserContext()?.snackbarState ?? defaultSnackbarState;
  return (
    <Box
      sx={{
        position: "relative",
        height: "100dvh",
        width: "100dvw",
        boxSizing: "border-box",
      }}
    >
      <TopNav />
      {/* <MobileTopNav headerName={headerName} isAnyLoading={isAnyLoading} />       */}
      <Box
        sx={{
          padding: "18px 18px 0 18px",
          boxSizing: "border-box",
          height: { xs: "calc(100% - 120px)", md: "calc(100% - 69px)" },
          width: "100%",
          display: "flex",
          flexDirection: "column",
          background: `${
            value === "/user/welcome" ? "" : theme.palette.bgColor.light
          }`,
          overflow: "auto",
        }}
      >
        <Outlet />
      </Box>
      <CustomBottomNavigation setHeaderName={setHeaderName} />
      {/* Reusable snackbar */}
      {snackbarState ? <SnackbarCustom {...snackbarState} /> : null}
    </Box>
  );
};

export default UserLayout;
