import { type PaletteMode } from "@mui/material";
import { type Theme } from "@mui/material/styles";

const theme = {
  typography: {
    fontFamily: "Outfit, sans-serif",
    fontSize: 14,
  },
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme }: { theme: Theme }) => ({
          color: theme.palette.primary.dark, // default label color
          "&.Mui-focused": {
            color: theme.palette.primary.light, // label color on focus
          },
        }),
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }: { theme: Theme }) => ({
          // backgroundColor: theme.palette.bgColor.main, // input background
          color: theme.palette.primary.main, // input text color
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.primary.dark, // default border
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.primary.light, // hover border
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.primary.light, // focused border
          },
        }),
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: ({ theme }: { theme: Theme }) => ({
          color: theme.palette.primary.main,
        }),
        icon: ({ theme }: { theme: Theme }) => ({
          color: theme.palette.primary.main,
        }),
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: ({ theme }: { theme: Theme }) => ({
          backgroundColor: theme.palette.bgColor.light,
          color: theme.palette.bgColor.contrastText,
          boxShadow: "none",
          "--Paper-overlay": "0",
        }),
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: ({ theme }: { theme: Theme }) => ({
          color: theme.palette.bgColor.contrastText,
          backgroundColor: theme.palette.bgColor.main,
          "&.Mui-selected": {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
          },
          "&.Mui-selected:hover": {
            backgroundColor: theme.palette.primary.dark,
          },
          "&:hover": {
            backgroundColor: theme.palette.action.hover,
          },
        }),
      },
    },
    MuiPickersOutlinedInput: {
      styleOverrides: {
        notchedOutline: ({ theme }: { theme: Theme }) => ({
          borderColor: theme.palette.primary.dark, // default border
          "&:hover": {
            borderColor: theme.palette.primary.light, // hover border
          },
        }),
        root: ({ theme }: { theme: Theme }) => ({
          color: theme.palette.primary.main,
          // backgroundColor: theme.palette.background.paper,
          borderRadius: 8,
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.primary.dark,
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.primary.light,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.primary.light,
          },
          "& .MuiSvgIcon-root": {
            color: theme.palette.primary.main, // ✅ calendar icon color
          },
        }),
      },
    },
    MuiSpeedDialAction: {
      styleOverrides: {
        staticTooltipLabel: ({ theme }: { theme: Theme }) => ({
          backgroundColor: theme.palette.bgColor.main,
          color: theme.palette.primary.light,
          fontWeight: 500,
          fontSize: "0.875rem",
          borderRadius: 4,
          padding: "4px 8px",
          boxShadow: theme.shadows[1],
        }),
        fab: ({ theme }: { theme: Theme }) => ({
          backgroundColor: theme.palette.bgColor.main,
          color: theme.palette.bgColor.contrastText,
          "&:hover": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiSvgIcon-root": {
            color: theme.palette.primary.main, // icon inside fab
          },
          "&:hover .MuiSvgIcon-root": {
            color: theme.palette.primary.contrastText, // icon inside fab
          },
        }),
      },
    },
  },
};

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          customColor: {
            main: "#9CA3AF", //
            light: "#F3F4F6", //
            dark: "#DEE0E5", //
            contrastText: "rgb(0 0 0 / 54%)",
          },
          bgColor: {
            main: "#ebf0f6ff",
            light: "#c5d9ed", //
            dark: "#d0d0d0ff",
            contrastText: "rgba(0, 0, 0, 0.87)",
          },
          bgColorPrimary: {
            main: "#90caf9",
            light: "#E2EDFF", //
            dark: "#648dae",
            contrastText: "rgba(0, 0, 0, 0.87)",
          },
        }
      : {
          // You need to adjust these color when you have finished
          customColor: {
            main: "#696969",
            light: "#c5c5c5", //
            dark: "#282828",
            contrastText: "rgb(255 255 255 / 54%)",
          },
          bgColor: {
            main: "#393E46",
            light: "#222831", //
            dark: "#DEE0E5",
            contrastText: "rgb(255 255 255 / 60%)",
          },
          bgColorPrimary: {
            main: "#0d47a1",
            light: "#2b3340ff", //393E46
            dark: "#093170",
            contrastText: "rgb(255 255 255 / 87%)",
          },
          success: {
            main: "#66bb6a",
            light: "#81c784",
            dark: "#388e3c",
          },
          text: {
            primary: "#b6d3ff",
            secondary: "#7a9dd2ff",
          },
        }),
  },
});

export default theme;
