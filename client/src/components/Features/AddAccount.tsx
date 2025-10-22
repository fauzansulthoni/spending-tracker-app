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
import { forwardRef, useEffect, type ReactElement, type Ref } from "react";
import {
  Avatar,
  Box,
  DialogActions,
  DialogContent,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import { useAddAccount } from "../../hooks/useAddAccount";
import dayjs from "dayjs";
import { useSummary } from "../../hooks/useSummary";
import DeleteButton from "../Common/DeleteButton";
import type { DeleteConfirmationType } from "../Common/DeleteConfirmation";
import EditButton from "../Common/EditButton";
import { useThemeContext } from "../../theme/ThemeContextProvider";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<unknown>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type OpenDialogType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenDeleteDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleteDialogProps: React.Dispatch<
    React.SetStateAction<DeleteConfirmationType | {}>
  >;
};
const AddAccount = (props: OpenDialogType) => {
  const { open, setOpen, setOpenDeleteDialog, setDeleteDialogProps } = props;

  const handleClose = () => {
    handleResetFormData();
    setOpen(false);
  };
  const {
    formData,
    handleChange,
    handleSubmit,
    inputRef,
    previewUrl,
    handlePhotoUpload,
    handleFileChange,
    handleEdit,
    handleEditSubmit,
    handleResetFormData,
    handleDelete,
  } = useAddAccount();

  const { filteredAccounts, setFilterAccount } = useSummary();
  useEffect(() => {
    setFilterAccount((prev) => ({ ...prev, type: "" }));
  }, []);
  const { theme } = useThemeContext();
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
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" component="div">
              {formData._id ? "Edit Account" : "Add Account"}
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
          <TextField
            label="Name"
            fullWidth
            name="name"
            variant="outlined"
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            label="Description"
            fullWidth
            name="description"
            variant="outlined"
            value={formData.description}
            onChange={handleChange}
          />
          <input
            type="file"
            accept="image/*"
            ref={inputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <Stack direction="column" justifyContent="center" alignItems="center">
            <Stack spacing={2} direction={"row"}>
              {formData._id && !previewUrl && (
                <Avatar
                  src={`http://localhost:5000/uploads/${formData.photo}`}
                  alt="Uploaded photo preview"
                />
              )}
              {previewUrl && (
                <Avatar src={previewUrl} alt="Uploaded photo preview" />
              )}
              <Button
                startIcon={<CloudUpload />}
                variant="contained"
                onClick={handlePhotoUpload}
              >
                Upload new Photo
              </Button>
            </Stack>

            {previewUrl && (
              <Typography variant="subtitle2" textAlign={"center"}>
                {previewUrl}
              </Typography>
            )}
          </Stack>
          {/* Current Account Start */}
          {formData._id && (
            <Button
              fullWidth
              variant="contained"
              color="info"
              onClick={() => setTimeout(() => handleResetFormData(), 300)}
            >
              Cancel Edit
            </Button>
          )}
          <Typography>Current Account</Typography>
          <Box sx={{ width: "100%", overflowX: "auto" }}>
            <Table sx={{ tableLayout: "auto" }}>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Photo</TableCell>
                  <TableCell>Created At</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredAccounts.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>
                      <Avatar
                        src={`http://localhost:5000/uploads/${item.photo}`}
                        alt={item.name}
                      />
                    </TableCell>
                    <TableCell>
                      {item?.createdAt &&
                        dayjs(item.createdAt).format("DD/MM/YYYY")}
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <EditButton onClick={() => handleEdit(item)} />
                        <DeleteButton
                          onDelete={() => {
                            setOpenDeleteDialog(true);
                            setDeleteDialogProps({
                              title: `Confirm Delete`,
                              message: `Are you sure want to delete this account - ${item.name}? This action will delete all the account, transaction and category data.`,
                              onDelete: () =>
                                item._id && handleDelete(item._id),
                            });
                          }}
                        />
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
          {/* Current Account End */}
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
            if (formData._id) {
              handleEditSubmit();
            } else {
              handleSubmit();
            }
          }}
          color="primary"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddAccount;
