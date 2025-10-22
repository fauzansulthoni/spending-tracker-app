import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { Filter, BudgetType } from "../types/Budget";

interface BudgetState {
  isLoading: boolean;
  budgetList: BudgetType[];
  budgetListFiltered: {
    items: BudgetType[];
    total: number;
  };
}

const initialState: BudgetState = {
  isLoading: false,
  budgetList: [],
  budgetListFiltered: {
    items: [],
    total: 0,
  },
};

export const getAllBudgets = createAsyncThunk("/admin/budgets/", async () => {
  const response = await axios.get(`http://localhost:5000/api/user/budget/`, {
    withCredentials: true,
  });
  return response.data;
});

export const getFilteredBudgets = createAsyncThunk(
  "/admin/budgets/filtered",
  async (filter: Filter) => {
    const response = await axios.post(
      `http://localhost:5000/api/user/budget/filtered`,
      filter,
      {
        withCredentials: true,
      }
    );
    return response.data;
  }
);

export const checkBudget = createAsyncThunk(
  "/admin/budget/check",
  async (formData: Partial<BudgetType>) => {
    const response = await axios.post(
      "http://localhost:5000/api/user/budget/check",
      formData
    );
    return response.data;
  }
);

export const addBudget = createAsyncThunk(
  "/admin/budget/add",
  async (formData: BudgetType) => {
    const response = await axios.post(
      "http://localhost:5000/api/user/budget/",
      formData
    );
    return response.data;
  }
);

export const deleteBudget = createAsyncThunk(
  "/admin/budget/delete",
  async (id: string) => {
    const response = await axios.delete(
      `http://localhost:5000/api/user/budget/${id}`,
      {
        withCredentials: true,
      }
    );
    return response?.data;
  }
);

export const updateBudget = createAsyncThunk(
  "/admin/budget/update",
  async (formData: Partial<BudgetType> & { _id: string }) => {
    const { _id } = formData;
    const { ...updateFields } = formData;
    const response = await axios.put(
      `http://localhost:5000/api/user/budget/${_id}`,
      updateFields,
      {
        withCredentials: true,
      }
    );

    return response?.data;
  }
);

const BudgetSlice = createSlice({
  name: "budget",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBudgets.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllBudgets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.budgetList = action.payload.data;
      })
      .addCase(getAllBudgets.rejected, (state) => {
        state.isLoading = false;
        state.budgetList = [];
      })
      .addCase(getFilteredBudgets.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFilteredBudgets.fulfilled, (state, action) => {
        const { items, total } = action.payload.data;
        state.isLoading = false;
        state.budgetListFiltered = { items, total };
      })
      .addCase(getFilteredBudgets.rejected, (state) => {
        state.isLoading = false;
        state.budgetListFiltered = { items: [], total: 0 };
      })
      .addCase(checkBudget.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkBudget.fulfilled, (state, _action) => {
        state.isLoading = false;
      })
      .addCase(checkBudget.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(addBudget.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addBudget.fulfilled, (state, action) => {
        state.isLoading = false;
        state.budgetList = [...state.budgetList, action.payload.data];
      })
      .addCase(addBudget.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateBudget.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBudget.fulfilled, (state, action) => {
        state.isLoading = false;
        state.budgetList = state.budgetList.map((budget) =>
          budget._id === action.payload.data._id
            ? { ...budget, ...action.payload.data }
            : budget
        );
      })
      .addCase(updateBudget.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteBudget.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBudget.fulfilled, (state, action) => {
        state.isLoading = false;
        state.budgetList = state.budgetList.filter(
          (budget) => budget._id !== action.payload.data._id
        );
      })
      .addCase(deleteBudget.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
export default BudgetSlice.reducer;
