import { Alert, Snackbar } from "@mui/material";
export interface SnackbarCustomProps {
  open: boolean;
  severity: "error" | "info" | "success" | "warning";
  onClose: () => void;
  anchorOrigin: {
    horizontal: "center" | "left" | "right";
    vertical: "bottom" | "top";
  };
  autoHideDuration: number;
  variant: "filled" | "outlined";
  message: string | undefined;
}

export const defaultSnackbarState: SnackbarCustomProps = {
  open: false,
  severity: "info",
  onClose: () => {},
  anchorOrigin: { horizontal: "center", vertical: "bottom" },
  autoHideDuration: 3000,
  variant: "filled",
  message: "",
};
const SnackbarCustom: React.FC<SnackbarCustomProps> = (props) => {
  const {
    open,
    severity,
    onClose,
    anchorOrigin,
    autoHideDuration,
    variant,
    message,
  } = props;
  return (
    <Snackbar
      open={open}
      anchorOrigin={{
        vertical: anchorOrigin.vertical,
        horizontal: anchorOrigin.horizontal,
      }}
      autoHideDuration={autoHideDuration | 4000}
      onClose={onClose}
    >
      <Alert severity={severity} variant={variant ? variant : "outlined"}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarCustom;
