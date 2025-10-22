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
  Box,
  DialogActions,
  DialogContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import DynamicIcon, { iconsArr } from "../../hooks/useDynamicIcon";
import { dynamicColors } from "../../hooks/useDynamicColor";
import { Circle } from "@mui/icons-material";
import { useAddCategory } from "../../hooks/useAddCategory";
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
const AddCategory = (props: OpenDialogType) => {
  const { open, setOpen, setOpenDeleteDialog, setDeleteDialogProps } = props;  
  const handleClose = () => {
    setOpen(false);
  };

  const {
    formData,
    handleSelectChange,
    handleChange,
    handleSubmit,
    handleEdit,
    handleEditSubmit,
    handleResetFormData,
    handleDelete,
  } = useAddCategory();
  const { filteredCategories } = useSummary();
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
              {formData._id ? "Edit Category" : "Add Category"}
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
          <FormControl fullWidth>
            <InputLabel id="select-type-label">Type</InputLabel>
            <Select
              labelId="select-type-label"
              id="select-type"
              label="Type"
              name="type"
              value={formData.type}
              onChange={(e) => {
                handleSelectChange(e);
              }}
            >
              <MenuItem value="Income">Income</MenuItem>
              <MenuItem value="Expense">Expense</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Name"
            fullWidth
            name="name"
            variant="outlined"
            value={formData.name}
            onChange={handleChange}
          />
          <FormControl fullWidth>
            <InputLabel id="select-icon-label">Icon</InputLabel>
            <Select
              labelId="select-icon-label"
              id="select-icon"
              label="Icon"
              name="icon"
              value={formData.icon}
              onChange={(e) => {
                handleSelectChange(e);
              }}
            >
              {iconsArr.map((item, index) => (
                <MenuItem
                  value={item}
                  sx={{ display: "flex", gap: 2 }}
                  key={index}
                >
                  <DynamicIcon iconName={item} />
                  <Typography variant="body1">{item}</Typography>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="select-color-label">Color</InputLabel>
            <Select
              labelId="select-color-label"
              id="select-color"
              label="color"
              name="color"
              value={formData.color}
              onChange={(e) => {
                handleSelectChange(e);
              }}
            >
              {dynamicColors.map((item, index) => (
                <MenuItem
                  value={item.color}
                  sx={{ display: "flex", gap: 2 }}
                  key={index}
                >
                  <Circle sx={{ color: item.color }} />
                  <Typography variant="body1">{item.colorName}</Typography>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Current Category Start */}
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
          <Typography>Current Category</Typography>
          <Box sx={{ width: "100%", overflowX: "auto" }}>
            <Table sx={{ tableLayout: "auto" }}>
              <TableHead>
                <TableRow>
                  <TableCell>Type</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Icon</TableCell>
                  <TableCell>Color</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredCategories.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.type}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>
                      <DynamicIcon iconName={item.icon} />
                    </TableCell>
                    <TableCell>
                      {" "}
                      <Circle sx={{ color: item.color }} />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <EditButton onClick={() => handleEdit(item)} />
                        <DeleteButton
                          onDelete={() => {
                            setOpenDeleteDialog(true);
                            setDeleteDialogProps({
                              title: `Confirm Delete`,
                              message: `Are you sure want to delete this category - ${item.name}? This action will delete this category, it's transaction and budget data.`,
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
          {/* Current Category End */}
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
            // handleClose();
          }}
          color="primary"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCategory;
