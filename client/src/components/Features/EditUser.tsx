import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import type { TransitionProps } from "@mui/material/transitions";
import { forwardRef, type ReactElement, type Ref } from "react";
import {
  Avatar,
  Box,
  DialogActions,
  DialogContent,
  Stack,
  TextField,
} from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";
import { useEditUser } from "../../hooks/useEditUser";
import { useThemeContext } from "../../theme/ThemeContextProvider";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<unknown>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
interface EditUserType {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editPassword: boolean;
  setEditPassword: React.Dispatch<React.SetStateAction<boolean>>;
}
const EditUser = (props: EditUserType) => {
  const { open, setOpen, editPassword, setEditPassword } = props;
  const { theme } = useThemeContext();
  const handleClose = () => {
    setOpen(false);
  };
  const {
    userData,
    formData,
    handleChange,
    handleSubmit,
    previewUrl,
    handleFileChange,
    inputRef,
    handlePhotoUpload,
    handleSubmitUpdatePassword,
    handleChangeUpdatePassword,
    formUpdatePassword,
  } = useEditUser();
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      slots={{
        transition: Transition,
      }}
    >
      <AppBar
        sx={{
          position: "relative",
          paddingBlock: "6px",
          backgroundColor: theme.palette.bgColor.main,
          color: theme.palette.bgColor.contrastText,
        }}
      >
        <Toolbar>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconButton
              sx={{ position: "absolute", left: "18px" }}
              //   edge="start"
              color="inherit"
              onClick={() => {
                editPassword && setEditPassword(false);
                handleClose();
              }}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" component="div">
              Edit User
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <DialogContent
        sx={{
          backgroundColor: theme.palette.bgColor.light,
        }}
      >
        <Stack spacing={2} alignItems="center">
          <Box sx={{ position: "relative" }}>
            <Avatar
              src={
                previewUrl
                  ? previewUrl
                  : userData && userData.photo
                  ? `http://localhost:5000/uploads/${userData.photo}`
                  : `/avatar.jpg`
              } // Replace with actual image path or leave blank
              sx={{ width: 120, height: 120 }}
            />
            <IconButton
              size="small"
              sx={{
                position: "absolute",
                bottom: 0,
                right: 0,
                backgroundColor: "background.default",
                boxShadow: 1,
              }}
              onClick={handlePhotoUpload}
            >
              <EditIcon fontSize="small" />
            </IconButton>
            <input
              type="file"
              accept="image/*"
              ref={inputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </Box>

          <Typography variant="h6" fontWeight={700}>
            {userData && userData.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            @{userData && userData.name.toLowerCase().replace(" ", "")}
          </Typography>

          <Stack spacing={2} sx={{ width: "100%", mt: 2 }}>
            <TextField
              label="Name"
              value={formData.name}
              name="name"
              onChange={handleChange}
              fullWidth
              disabled={editPassword}
            />
            <TextField
              label="Email"
              value={formData.email}
              name="email"
              onChange={handleChange}
              fullWidth
              disabled={editPassword}
            />
            {editPassword && (
              <>
                <TextField
                  label="Old Password"
                  name="oldPassword"
                  value={formUpdatePassword.oldPassword}
                  onChange={handleChangeUpdatePassword}
                  fullWidth
                  type="password"
                />
                <TextField
                  label="New Password"
                  name="newPassword"
                  value={formUpdatePassword.newPassword}
                  onChange={handleChangeUpdatePassword}
                  fullWidth
                  type="password"
                />
                <TextField
                  label="Confirm New Password"
                  name="confirmNewPassword"
                  value={formUpdatePassword.confirmNewPassword}
                  onChange={handleChangeUpdatePassword}
                  fullWidth
                  type="password"
                />
              </>
            )}
          </Stack>
        </Stack>
      </DialogContent>
      <Divider />
      <DialogActions
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 3,
          backgroundColor: theme.palette.bgColor.light,
        }}
      >
        <Button
          fullWidth
          variant="contained"
          onClick={() => {
            editPassword && setEditPassword(false);
            handleClose();
          }}
          color="inherit"
          autoFocus
        >
          Cancel
        </Button>
        <Button
          fullWidth
          variant="contained"
          onClick={() => {
            if (editPassword) {
              handleSubmitUpdatePassword();
              setEditPassword(false);
            } else {
              handleSubmit();
            }
            handleClose();
          }}
          color="primary"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditUser;
