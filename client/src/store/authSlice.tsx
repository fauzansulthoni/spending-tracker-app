import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { UserType } from "../types/User";

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: UserType | null;
  accessToken: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  accessToken: null,
};
export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const registerUser = createAsyncThunk(
  "/auth/register",

  async (formData: RegisterPayload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (err) {
      if (
        typeof err === "object" &&
        err !== null &&
        "response" in err &&
        (err as any).response?.data
      ) {
        return rejectWithValue((err as any).response.data); // 👈 preserves your custom error
      }
      return rejectWithValue({ message: "Unexpected error occurred" });
    }
  }
);

interface LoginPayload {
  email: string;
  password: string;
  rememberMe: boolean;
}
export const loginUser = createAsyncThunk(
  "/auth/login",

  async (formData: LoginPayload) => {
    const response = await axios.post(
      "http://localhost:5000/api/auth/login",
      formData,
      {
        withCredentials: true,
      }
    );

    return response.data;
  }
);

export const logoutUser = createAsyncThunk(
  "/auth/logout",

  async () => {
    const response = await axios.post(
      "http://localhost:5000/api/auth/logout",
      {},
      {
        withCredentials: true,
      }
    );

    return response.data;
  }
);

export const checkAuth = createAsyncThunk("/auth/check-auth", async () => {
  const response = await axios.get(
    "http://localhost:5000/api/auth/check-auth",
    {
      withCredentials: true,
      headers: {
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
      },
    }
  );
  return response.data;
});

export const updateUser = createAsyncThunk(
  "/admin/user/update",
  async (formData: Partial<UserType>) => {
    const { _id } = formData;
    const { ...updateFields } = formData;
    const response = await axios.put(
      `http://localhost:5000/api/user/user/${_id}`,
      updateFields,
      {
        withCredentials: true,
      }
    );

    return response?.data;
  }
);

interface ChangePasswordType {
  _id: string;
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}
export const updatePassword = createAsyncThunk(
  "/admin/user/update-password",
  async (formData: ChangePasswordType) => {
    const { _id } = formData;
    const { ...updateFields } = formData;
    const response = await axios.put(
      `http://localhost:5000/api/user/user/change-password/${_id}`,
      updateFields,
      {
        withCredentials: true,
      }
    );

    return response?.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        action.payload.success
          ? (state.user = action.payload.user)
          : state.user;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
      })
      .addCase(updatePassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
