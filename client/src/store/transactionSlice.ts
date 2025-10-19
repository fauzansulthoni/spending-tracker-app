import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { Filter, TransactionType } from "../types/Transaction";

interface TransactionState {
  isLoading: boolean;
  transactionList: TransactionType[];
  transactionListFiltered: {
    items: TransactionType[];
    total: number;
  };
}

const initialState: TransactionState = {
  isLoading: false,
  transactionList: [],
  transactionListFiltered: {
    items: [],
    total: 0,
  },
};

export const getAllTransactions = createAsyncThunk(
  "/admin/transactions/",
  async () => {
    const response = await axios.get(
      `http://localhost:5000/api/user/transaction/`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  }
);

export const getFilteredTransactions = createAsyncThunk(
  "/admin/transactions/filtered",
  async (filter: Filter) => {
    const response = await axios.post(
      `http://localhost:5000/api/user/transaction/filtered`,
      filter,
      {
        withCredentials: true,
      }
    );
    return response.data;
  }
);

export const getAccountTotalSpending = createAsyncThunk(
  "/admin/transactions/account-spending",
  async (filter: Filter) => {
    const response = await axios.post(
      `http://localhost:5000/api/user/transaction/filtered`,
      filter,
      {
        withCredentials: true,
      }
    );
    return response.data;
  }
);

export const addTransaction = createAsyncThunk(
  "/admin/transaction/add",
  async (formData: TransactionType) => {
    const response = await axios.post(
      "http://localhost:5000/api/user/transaction/",
      formData
    );
    return response.data;
  }
);

export const deleteTransaction = createAsyncThunk(
  "/admin/transaction/delete",
  async (id: string) => {
    const response = await axios.delete(
      `http://localhost:5000/api/user/transaction/${id}`,
      {
        withCredentials: true,
      }
    );
    return response?.data;
  }
);

export const updateTransaction = createAsyncThunk(
  "/admin/transaction/update",
  async (formData: Partial<TransactionType>) => {
    const { _id } = formData;
    const { ...updateFields } = formData;
    const response = await axios.put(
      `http://localhost:5000/api/user/transaction/${_id}`,
      updateFields,
      {
        withCredentials: true,
      }
    );

    return response?.data;
  }
);

const TransactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllTransactions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactionList = action.payload.data;
      })
      .addCase(getAllTransactions.rejected, (state) => {
        state.isLoading = false;
        state.transactionList = [];
      })
      .addCase(getFilteredTransactions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFilteredTransactions.fulfilled, (state, action) => {
        const { items, total } = action.payload.data;
        state.isLoading = false;
        state.transactionListFiltered = { items, total };
      })
      .addCase(getFilteredTransactions.rejected, (state) => {
        state.isLoading = false;
        state.transactionListFiltered = { items: [], total: 0 };
      })
      .addCase(addTransaction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactionList = [...state.transactionList, action.payload.data];
      })
      .addCase(addTransaction.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateTransaction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactionList = state.transactionList.map((transaction) =>
          transaction._id === action.payload.data._id
            ? { ...transaction, ...action.payload.data }
            : transaction
        );
      })
      .addCase(updateTransaction.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteTransaction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactionList = state.transactionList.filter(
          (transaction) => transaction._id !== action.payload.data._id
        );
      })
      .addCase(deleteTransaction.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
export default TransactionSlice.reducer;
