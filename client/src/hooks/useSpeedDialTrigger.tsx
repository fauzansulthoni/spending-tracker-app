import { useMediaQuery } from "@mui/material";
import { useState, useCallback } from "react";
import { useThemeContext } from "../theme/ThemeContextProvider";

type SpeedDialProps =
  | {
      mode: "desktop";
      open: boolean;
      onOpen: () => void;
      onClose: () => void;
    }
  | {
      mode: "mobile";
      open: boolean;
      onClick: () => void;
    };

const useSpeedDialTrigger = () => {
  const { theme } = useThemeContext();
  const [openSpeedDial, setOpenSpeedDial] = useState(false);

  const handleOpenSpeedDial = useCallback(() => {
    console.log("It was called");
    setOpenSpeedDial(true);
  }, []);

  const handleCloseSpeedDial = useCallback(() => {
    setOpenSpeedDial(false);
  }, []);

  const toggleOpenSpeedDial = useCallback(() => {
    setOpenSpeedDial((prev) => !prev);
  }, []);

  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  const speedDialProps: SpeedDialProps = isMdUp
    ? {
        mode: "desktop",
        open: openSpeedDial,
        onOpen: handleOpenSpeedDial,
        onClose: handleCloseSpeedDial,
      }
    : {
        mode: "mobile",
        open: openSpeedDial,
        onClick: toggleOpenSpeedDial,
      };

  return {
    speedDialProps,
    handleOpenSpeedDial,
    handleCloseSpeedDial,
    toggleOpenSpeedDial,
  };
};

export default useSpeedDialTrigger;
