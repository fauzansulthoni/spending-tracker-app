import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { AccountType } from "../types/Account";
import type { Filter } from "../types/Category";

interface AccountState {
  isLoading: boolean;
  accountList: AccountType[];
  accountListFiltered: {
    items: AccountType[];
    total: number;
  };
}

const initialState: AccountState = {
  isLoading: false,
  accountList: [],
  accountListFiltered: {
    items: [],
    total: 0,
  },
};

export const getAllAccounts = createAsyncThunk("/admin/accounts/", async () => {
  const response = await axios.get(`http://localhost:5000/api/user/account/`, {
    withCredentials: true,
  });
  return response.data;
});

export const getFilteredAccounts = createAsyncThunk(
  "/admin/accounts/filtered",
  async (filter: Filter) => {
    const response = await axios.post(
      `http://localhost:5000/api/user/account/filtered`,
      filter,
      {
        withCredentials: true,
      }
    );
    return response.data;
  }
);

export const addAccount = createAsyncThunk(
  "/admin/account/add",
  async (formData: AccountType) => {
    const response = await axios.post(
      "http://localhost:5000/api/user/account/",
      formData
    );
    return response.data;
  }
);

export const deleteAccount = createAsyncThunk(
  "/admin/account/delete",
  async (id: string) => {
    const response = await axios.delete(
      `http://localhost:5000/api/user/account/${id}`,
      {
        withCredentials: true,
      }
    );
    return response?.data;
  }
);

export const updateAccount = createAsyncThunk(
  "/admin/account/update",
  async (formData: Partial<AccountType>) => {
    const { _id } = formData;
    const { ...updateFields } = formData;
    const response = await axios.put(
      `http://localhost:5000/api/user/account/${_id}`,
      updateFields,
      {
        withCredentials: true,
      }
    );

    return response?.data;
  }
);

const AccountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllAccounts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllAccounts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.accountList = action.payload.data;
      })
      .addCase(getAllAccounts.rejected, (state) => {
        state.isLoading = false;
        state.accountList = [];
      })
      .addCase(getFilteredAccounts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFilteredAccounts.fulfilled, (state, action) => {
        const { items, total } = action.payload.data;
        state.isLoading = false;
        state.accountListFiltered = { items, total };
      })
      .addCase(getFilteredAccounts.rejected, (state) => {
        state.isLoading = false;
        state.accountListFiltered = { items: [], total: 0 };
      })
      .addCase(addAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addAccount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.accountList = [...state.accountList, action.payload.data];
      })
      .addCase(addAccount.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAccount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.accountList = state.accountList.map((account) =>
          account._id === action.payload.data._id
            ? { ...account, ...action.payload.data }
            : account
        );
      })
      .addCase(updateAccount.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAccount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.accountList = state.accountList.filter(
          (account) => account._id !== action.payload.data._id
        );
      })
      .addCase(deleteAccount.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
export default AccountSlice.reducer;
