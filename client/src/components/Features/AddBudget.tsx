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
} from "@mui/material";
import { useSummary } from "../../hooks/useSummary";
import { useAddBudget } from "../../hooks/useAddBudget";
import { months } from "../../config/monthConfig";
import dayjs from "dayjs";
import { CurrencyTextField } from "../Common/CurrencyTextField";
import useCurrencyFormatter from "../../hooks/useCurrencyFormatter";
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
};
const AddBudget = (props: OpenDialogType) => {
  const { open, setOpen } = props;

  const handleClose = () => {
    setOpen(false);
  };

  const { formData, handleSelectChange, handleChange, handleSubmit } =
    useAddBudget();
  const { filteredBudget, filteredCategories, activeAccount } = useSummary();
  const { theme } = useThemeContext();
  if (filteredCategories.length < 1) {
    <Typography
      variant="h6"
      fontWeight={600}
      gutterBottom
      color={theme.palette.bgColorPrimary.contrastText}
    >
      Sorry, but you need to add category before using this feature🙏.
    </Typography>;
  } else {
    const budgetCategoryLabel = (value: string) => {
      const data = filteredCategories.filter((item) => item._id === value)[0];
      const label =
        data && typeof data.name === "string" ? data.name : "Unknown Category";
      return label;
    };
    useEffect(() => {
      if (open && activeAccount) {
        handleChange({
          target: {
            name: "accountId",
            value: activeAccount,
          },
        } as React.ChangeEvent<HTMLInputElement>);
      }
    }, [open]);

    const { currencyFormatter } = useCurrencyFormatter();
    const usedCategoryIds = new Set(filteredBudget.map((b) => b.categoryId));
    const unusedCategories = filteredCategories.filter(
      (category) =>
        category.type === "Expense" &&
        category._id &&
        !usedCategoryIds.has(category._id)
    );

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
                Add Budget
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
              <InputLabel id="select-month-label">Month</InputLabel>
              <Select
                labelId="select-month-label"
                id="select-month"
                label="Month"
                name="month"
                value={typeof formData.month === "string" ? formData.month : ""}
                onChange={(e) => {
                  handleSelectChange(e);
                }}
              >
                {months.map((month, index) => {
                  const currentYear = dayjs().year(); // Move inside the loop to ensure freshness
                  const firstDay = dayjs(
                    `${currentYear}-${index + 1}-01`
                  ).startOf("month");
                  return (
                    <MenuItem key={month} value={firstDay.format("YYYY-MM-DD")}>
                      {month}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
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
                    : formData.categoryId?._id
                }
                onChange={handleSelectChange}
              >
                {unusedCategories.map((item, index) => (
                  <MenuItem value={item._id} key={index}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <CurrencyTextField
              name="limitAmount"
              value={String(formData.limitAmount)}
              onValueChange={(value) => {
                handleChange({
                  target: {
                    name: "limitAmount",
                    value: value ?? "",
                  },
                } as React.ChangeEvent<HTMLInputElement>);
              }}
              label="Limit amount"
              fullWidth
            />
            {/* Look up for current target start*/}
            <Typography>Current Budget</Typography>
            <Table sx={{ tableLayout: "auto" }}>
              <TableHead>
                <TableRow>
                  <TableCell>Category</TableCell>
                  <TableCell>Month</TableCell>
                  <TableCell>Limit Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredBudget.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {typeof item.categoryId === "string" &&
                        budgetCategoryLabel(item.categoryId)}
                    </TableCell>
                    <TableCell>
                      {dayjs(item.month).format("DD/MM/YYYY")}
                    </TableCell>
                    <TableCell>{currencyFormatter(item.limitAmount)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {/* Look up for current target end*/}
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
              handleSubmit();
              // handleClose();
            }}
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
};

export default AddBudget;
