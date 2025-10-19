import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { Filter, CategoryType } from "../types/Category";

interface CategoryState {
  isLoading: boolean;
  categoryList: CategoryType[];
  categoryListFiltered: {
    items: CategoryType[];
    total: number;
  };
}

const initialState: CategoryState = {
  isLoading: false,
  categoryList: [],
  categoryListFiltered: {
    items: [],
    total: 0,
  },
};

export const getAllCategories = createAsyncThunk(
  "/admin/categorys/",
  async () => {
    const response = await axios.get(
      `http://localhost:5000/api/user/category/`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  }
);

export const getFilteredCategories = createAsyncThunk(
  "/admin/categories/filtered",
  async (filter: Filter) => {
    const response = await axios.post(
      `http://localhost:5000/api/user/category/filtered`,
      filter,
      {
        withCredentials: true,
      }
    );
    return response.data;
  }
);

export const addCategory = createAsyncThunk(
  "/admin/category/add",
  async (formData: CategoryType) => {
    const response = await axios.post(
      "http://localhost:5000/api/user/category/",
      formData
    );
    return response.data;
  }
);

export const deleteCategory = createAsyncThunk(
  "/admin/category/delete",
  async (id: string) => {
    const response = await axios.delete(
      `http://localhost:5000/api/user/category/${id}`,
      {
        withCredentials: true,
      }
    );
    return response?.data;
  }
);

export const updateCategory = createAsyncThunk(
  "/admin/category/update",
  async (formData: Partial<CategoryType>) => {
    const { _id } = formData;
    const { ...updateFields } = formData;
    const response = await axios.put(
      `http://localhost:5000/api/user/category/${_id}`,
      updateFields,
      {
        withCredentials: true,
      }
    );

    return response?.data;
  }
);

const CategorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categoryList = action.payload.data;
      })
      .addCase(getAllCategories.rejected, (state) => {
        state.isLoading = false;
        state.categoryList = [];
      })
      .addCase(getFilteredCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFilteredCategories.fulfilled, (state, action) => {
        const { items, total } = action.payload.data;
        state.isLoading = false;
        state.categoryListFiltered = { items, total };
      })
      .addCase(getFilteredCategories.rejected, (state) => {
        state.isLoading = false;
        state.categoryListFiltered = { items: [], total: 0 };
      })
      .addCase(addCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categoryList = [...state.categoryList, action.payload.data];
      })
      .addCase(addCategory.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categoryList = state.categoryList.map((category) =>
          category._id === action.payload.data._id
            ? { ...category, ...action.payload.data }
            : category
        );
      })
      .addCase(updateCategory.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categoryList = state.categoryList.filter(
          (category) => category._id !== action.payload.data._id
        );
      })
      .addCase(deleteCategory.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
export default CategorySlice.reducer;
