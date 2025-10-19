import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./hook";
import {
  addCategory,
  deleteCategory,
  updateCategory,
} from "../store/categorySlice";
import type { CategoryType } from "../types/Category";
import type { SelectChangeEvent } from "@mui/material";
import { useUserContext } from "../context/UserContext";
import { useSummary } from "./useSummary";

export const useAddCategory = () => {
  const { activeAccount } = useUserContext();
  const initialState: CategoryType = {
    accountId: activeAccount ?? "",
    name: "",
    icon: "",
    type: "Expense",
    color: "",
  };
  const { setFilterCategory } = useSummary();
  const [formData, setFormData] = useState<CategoryType>(initialState);
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
    dispatch(addCategory(formData))
      .then((action) => {
        const { payload } = action;
        const error = (action as any).error;
        setFilterCategory((prev) => ({ ...prev, type: "" }));
        const message =
          payload?.message || error?.message || "Adding category failed";
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

  const handleEdit = (category: CategoryType) => {
    setFormData((prev) => ({ ...prev, ...category }));
  };
  const handleEditSubmit = async () => {
    dispatch(updateCategory(formData))
      .then((action) => {
        const { payload } = action;
        const error = (action as any).error;
        setFilterCategory((prev) => ({ ...prev, type: "" }));
        const message =
          payload?.message || error?.message || "Editing category failed";
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
  const handleResetFormData = () => {
    setFormData(initialState);
  };

  const handleDelete = async (id: string) => {
    dispatch(deleteCategory(id)).then((action) => {
      action.payload.success &&
        activeAccount &&
        setFilterCategory((prev) => ({
          ...prev,
          accountId: activeAccount,
        }));
      const error = (action as any).error;
      const message =
        action.payload.message || error?.message || "Delete category failed";
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
  useEffect(() => {
    activeAccount &&
      setFormData((prev) => ({ ...prev, accountId: activeAccount }));
    activeAccount &&
      setFilterCategory((prev) => ({
        ...prev,
        accountId: activeAccount,
      }));
  }, [activeAccount]);

  return {
    formData,
    handleChange,
    handleSelectChange,
    handleSubmit,
    handleEdit,
    handleEditSubmit,
    handleResetFormData,
    handleDelete,
  };
};
