import { useState } from "react";
import { useAppDispatch } from "./hook";
import { addBudget } from "../store/budgetSlice";
import type { BudgetType } from "../types/Budget";
import type { SelectChangeEvent } from "@mui/material";
import { useUserContext } from "../context/UserContext";
import { useSummary } from "./useSummary";
import dayjs from "dayjs";

export const useAddBudget = () => {
  const { activeAccount } = useUserContext();
  const firstDayOfMonth = dayjs().startOf("month").toDate();
  const initialState: BudgetType = {
    accountId: activeAccount ?? "",
    categoryId: "",
    month: firstDayOfMonth,
    limitAmount: 0,
  };

  const { setFilterBudget } = useSummary();
  const [formData, setFormData] = useState<BudgetType>(initialState);
  const dispatch = useAppDispatch();
  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === "month") {
      setFilterBudget((prev) => ({
        ...prev,
        accountId: formData.accountId as string,
        month: new Date(value),
      }));
    }
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
    console.log(formData);
    dispatch(addBudget(formData))
      .then((action) => {
        const { payload } = action;
        const error = (action as any).error;
        if (typeof formData.accountId === "string") {
          setFilterBudget((prev) => ({
            ...prev,
            accountId: formData.accountId as string,
          }));
        }
        const message =
          payload?.message || error?.message || "Adding budget failed";
        if (userContext && userContext.setSnackbarState) {
          userContext.setSnackbarState((prev) => ({
            ...prev,
            message: message,
            severity: action.payload.success ? "success" : "error",
            open: true,
          }));
        }
      })
      .catch((error) => {
        console.log("Unexpected error:", error);
      });
  };

  return {
    formData,
    handleChange,
    handleSelectChange,
    handleSubmit,
  };
};
