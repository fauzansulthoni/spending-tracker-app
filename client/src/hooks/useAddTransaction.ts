import { useState } from "react";
import { useAppDispatch } from "./hook";
import {
  addTransaction,
  deleteTransaction,
  updateTransaction,
} from "../store/transactionSlice";
import type { TransactionType } from "../types/Transaction";
import type { SelectChangeEvent } from "@mui/material";
import { useUserContext } from "../context/UserContext";
import { useSummary } from "./useSummary";

export const useAddTransaction = () => {
  const initialState: TransactionType = {
    accountId: "",
    amount: 0,
    categoryId: "",
    type: "Expense", // explicitly typed as "Expense" | "Income"
    note: "",
    date: new Date(),
  };
  const { setFilterTransaction, activeAccount } = useSummary();
  const [formData, setFormData] = useState<TransactionType>(initialState);
  const dispatch = useAppDispatch();
  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const userContext = useUserContext();
  const handleSubmit = async () => {
    // console.log(formData);
    dispatch(addTransaction(formData))
      .then((action) => {
        const { payload } = action;
        const error = (action as any).error;
        setFilterTransaction((prev) => ({
          ...prev,
          accountId: userContext.activeAccount ?? "",
        }));
        const message =
          payload?.message || error?.message || "Adding transaction failed";
        if (userContext && userContext.setSnackbarState) {
          userContext.setSnackbarState((prev) => ({
            ...prev,
            message: message,
            severity: action.payload.success ? "success" : "error",
            open: true,
          }));
        }
        setFormData(initialState);
      })
      .catch((error) => {
        console.log("Unexpected error:", error);
      });
  };
  const handleEdit = (currentTransaction: TransactionType) => {
    setFormData((prev) => ({ ...prev, ...currentTransaction }));
  };

  const handleEditSubmit = async () => {
    dispatch(updateTransaction(formData))
      .then((action) => {
        const { payload } = action;
        const error = (action as any).error;
        setFilterTransaction((prev) => ({
          ...prev,
          accountId: activeAccount ?? "",
        }));
        const message =
          payload?.message || error?.message || "Editing transaction failed";
        if (userContext && userContext.setSnackbarState) {
          userContext.setSnackbarState((prev) => ({
            ...prev,
            message: message,
            severity: action.payload.success ? "success" : "error",
            open: true,
          }));
        }

        setFormData(initialState);
      })
      .catch((error) => {
        console.log("Unexpected error:", error);
      });
  };

  const handleDelete = async (id: string) => {
    dispatch(deleteTransaction(id)).then((action) => {
      action.payload.success &&
        activeAccount &&
        setFilterTransaction((prev) => ({
          ...prev,
          accountId: activeAccount,
        }));
      const error = (action as any).error;
      const message =
        action.payload.message || error?.message || "Delete transaction failed";
      if (userContext && userContext.setSnackbarState) {
        userContext.setSnackbarState((prev) => ({
          ...prev,
          message: message,
          severity: action.payload.success ? "success" : "error",
          open: true,
        }));
      }
    });
  };

  return {
    formData,
    handleEdit,
    handleChange,
    handleSelectChange,
    handleSubmit,
    handleEditSubmit,
    handleDelete,
  };
};
