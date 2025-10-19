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
import {
  forwardRef,
  useEffect,
  useState,
  type ReactElement,
  type Ref,
} from "react";
import {
  Box,
  DialogActions,
  DialogContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useAddTransaction } from "../../hooks/useAddTransaction";
import { CurrencyTextField } from "../Common/CurrencyTextField";
import { useSummary } from "../../hooks/useSummary";
import type { TransactionType } from "../../types/Transaction";
import { useThemeContext } from "../../theme/ThemeContextProvider";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<unknown>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export interface SpendingFormType {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editData?: TransactionType;
}
const AddTransaction = (props: SpendingFormType) => {
  const { open, setOpen, editData } = props;
  const {
    formData,
    handleEdit,
    handleSelectChange,
    handleChange,
    handleSubmit,
    handleEditSubmit,
  } = useAddTransaction();

  const handleClose = () => {
    setOpen(false);
  };

  const { activeAccount, filteredCategories, setFilterCategory } = useSummary();
  const filterCategoryByType = (type: string) => {
    const newFilter = filteredCategories.filter((item) => item.type === type);
    return newFilter;
  };
  const [categories, setCategories] = useState(filterCategoryByType("Expense"));

  useEffect(() => {
    if (open && activeAccount) {
      handleChange({
        target: {
          name: "accountId",
          value: activeAccount,
        },
      } as React.ChangeEvent<HTMLInputElement>);
    }
    if (typeof editData !== undefined) {
      handleEdit(editData as TransactionType);
    }
  }, [open]);
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
              {formData._id ? "Edit Transaction" : "Add Transaction"}
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
                setCategories(filterCategoryByType(e.target.value));
                handleSelectChange(e);
              }}
            >
              <MenuItem value="Income">Income</MenuItem>
              <MenuItem value="Expense">Expense</MenuItem>
            </Select>
          </FormControl>
          <CurrencyTextField
            name="amount"
            value={String(formData.amount)}
            onValueChange={(value) => {
              handleChange({
                target: {
                  name: "amount",
                  value: value ?? "",
                },
              } as React.ChangeEvent<HTMLInputElement>);
            }}
            label="Amount"
            fullWidth
            variant="outlined"
          />
          <FormControl fullWidth>
            <InputLabel id="select-category-label">Category</InputLabel>
            <Select
              labelId="select-category-label"
              id="select-category"
              label="Category"
              name="categoryId"
              value={
                typeof formData.categoryId === "string"
                  ? formData.categoryId
                  : formData.category?._id
              }
              onChange={handleSelectChange}
            >
              {categories.map((item, index) => (
                <MenuItem value={item._id} key={index}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Description"
            multiline
            rows={4}
            fullWidth
            name="note"
            variant="outlined"
            value={formData.note}
            onChange={handleChange}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Due Date"
              value={formData.date ? dayjs(formData.date) : null}
              onChange={(newValue) => {
                handleChange({
                  target: {
                    name: "date",
                    value: newValue ? newValue.toISOString() : "",
                  },
                } as React.ChangeEvent<HTMLInputElement>);
              }}
              sx={{ border: "none", boxShadow: "none", bgColor: "red" }}
              slotProps={{
                textField: {
                  variant: "outlined",
                  fullWidth: true,
                  color: "primary",
                },
              }}
            />
          </LocalizationProvider>
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
            handleClose();
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

export default AddTransaction;
