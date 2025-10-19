import {
  alpha,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import useCurrencyFormatter from "../../hooks/useCurrencyFormatter";
import { useThemeContext } from "../../theme/ThemeContextProvider";
import React, { useState } from "react";
import { useSummary } from "../../hooks/useSummary";
import { useFilterTransactionByCategory } from "../../hooks/useFilterTransactionByCategory";
import DeleteButton from "../Common/DeleteButton";
import { deleteTransaction } from "../../store/transactionSlice";
import { useAppDispatch } from "../../hooks/hook";
import type { DeleteConfirmationType } from "../Common/DeleteConfirmation";
import { useUserContext } from "../../context/UserContext";
import EditButton from "../Common/EditButton";
import type { SpendingFormType } from "./AddTransaction";
import { useAddTransaction } from "../../hooks/useAddTransaction";
import DynamicIcon from "../../hooks/useDynamicIcon";

interface SpendingHistoryType {
  setOpenDeleteDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleteDialogProps: React.Dispatch<
    React.SetStateAction<DeleteConfirmationType | {}>
  >;
  setOpenAdd: React.Dispatch<React.SetStateAction<boolean>>;
  setEditSpending: React.Dispatch<React.SetStateAction<SpendingFormType | {}>>;
}
const SpendingHistory = (props: SpendingHistoryType) => {
  const {
    setOpenDeleteDialog,
    setDeleteDialogProps,
    setOpenAdd,
    setEditSpending,
  } = props;
  const { currencyFormatter } = useCurrencyFormatter();

  const { theme } = useThemeContext();
  const [category, setCategory] = useState<string>("All Categories");
  const {
    filteredCategories,
    filteredTransactions,
    setFilterTransaction,
    activeAccount,
  } = useSummary();

  const { filteredByCategory, handleFilterByCategory } =
    useFilterTransactionByCategory(filteredTransactions);
  const dispatch = useAppDispatch();
  const userContext = useUserContext();
  const { handleDelete } = useAddTransaction();
  const transactionCategory = (value: string) => {
    const data = filteredCategories.filter((item) => item._id === value)[0];
    return data;
  };
  return (
    <Stack>
      <Stack direction="row" justifyContent={"space-between"}>
        <Typography
          variant="h6"
          fontWeight={600}
          gutterBottom
          color={theme.palette.bgColorPrimary.contrastText}
        >
          Spending History
        </Typography>
        <Select
          sx={{
            color: theme.palette.bgColorPrimary.contrastText,
          }}
          size="small"
          defaultValue="All Categories"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            handleFilterByCategory(e.target.value);
          }}
        >
          <MenuItem value="All Categories">All Categories</MenuItem>

          {filteredCategories.length > 1 &&
            filteredCategories.map((cat, index) => (
              <MenuItem key={index} value={cat._id}>
                {cat.name}
              </MenuItem>
            ))}
        </Select>
      </Stack>
      <List
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          marginTop: 2,
          backgroundColor: theme.palette.bgColorPrimary.light,
          color: theme.palette.bgColorPrimary.contrastText,
          borderRadius: 4,
        }}
      >
        {filteredCategories.length > 1 &&
          filteredByCategory.map((tx, idx) => {
            const category = transactionCategory(tx.categoryId);
            return (
              <ListItem
                key={idx}
                disableGutters
                sx={{
                  paddingInline: 2,
                  gap: 1,
                }}
              >
                {" "}
                <IconButton
                  sx={{
                    backgroundColor: category && alpha(category.color, 0.2),
                    color: category && category.color,
                    width: "40px",
                    height: "40px",
                    padding: 3,
                    borderRadius: 2,
                    "&:hover": {
                      backgroundColor: category && alpha(category.color, 0.5),
                    },
                  }}
                >
                  {category ? <DynamicIcon iconName={category.icon} /> : "🤑"}
                  {/* {category && category.icon} */}
                </IconButton>
                <ListItemText
                  primary={tx.note}
                  secondary={
                    <Typography
                      fontSize={14}
                      color={theme.palette.bgColor.contrastText}
                    >
                      {category.name}
                    </Typography>
                  }
                />
                <Typography color={tx.type === "Expense" ? "error" : "success"}>
                  {currencyFormatter(tx.amount.toString())}
                </Typography>
                <Box>
                  <EditButton
                    onClick={() => {
                      setOpenAdd(true);
                      setEditSpending({ editData: tx });
                    }}
                  />
                  <DeleteButton
                    onDelete={() => {
                      setOpenDeleteDialog(true);
                      setDeleteDialogProps({
                        title: `Confirm Delete`,
                        message: `Are you sure want to delete this transaction - ${tx.note}? This action be undone.`,
                        onDelete: () => tx._id && handleDelete(tx._id),
                      });
                    }}
                  />
                </Box>
                {idx < filteredByCategory.length - 1 && <Divider />}
              </ListItem>
            );
          })}
      </List>
    </Stack>
  );
};

export default SpendingHistory;
