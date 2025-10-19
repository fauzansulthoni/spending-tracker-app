import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "./hook";
import {
  addAccount,
  deleteAccount,
  updateAccount,
} from "../store/accountSlice";
import type { AccountType } from "../types/Account";
import type { SelectChangeEvent } from "@mui/material";
import { useUserContext } from "../context/UserContext";
import axios from "axios";
import { useSummary } from "./useSummary";

export const useAddAccount = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { setFilterAccount } = useSummary();
  const initialState: AccountType = {
    userId: user?._id ?? "",
    name: "",
    description: "",
    photo: "",
  };
  const [formData, setFormData] = useState<AccountType>(initialState);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
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
  const [fileUpload, setFileUpload] = useState<File | undefined>(undefined);
  const userContext = useUserContext();
  const uploadPhotoToServer = async (accountId: string) => {
    const formData = new FormData();
    fileUpload && formData.append("photo", fileUpload);
    formData.append("accountId", accountId);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/image/upload/account",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("Upload success:", response.data);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };
  const inputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = () => {
    inputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFileUpload(event.target.files?.[0]);
    if (event.target.files?.[0]) {
      const url = URL.createObjectURL(event.target.files?.[0]);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = async () => {
    // console.log(formData);
    dispatch(addAccount(formData))
      .then((action) => {
        const { payload } = action;
        const error = (action as any).error;
        const message =
          payload?.message || error?.message || "Adding account failed";
        typeof fileUpload !== undefined &&
          uploadPhotoToServer(payload?.data._id).then(() => {
            setFilterAccount((prev) => ({ ...prev, type: "" }));
            setFileUpload(undefined);
          });
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

  const handleEdit = (category: AccountType) => {
    setFormData((prev) => ({ ...prev, ...category }));
  };
  const handleEditSubmit = async () => {
    console.log(formData);
    dispatch(updateAccount(formData))
      .then((action) => {
        const { payload } = action;
        const error = (action as any).error;
        setFilterAccount((prev) => ({ ...prev, userId: user?._id ?? "" }));
        const message =
          payload?.message || error?.message || "Editing account failed";
        typeof fileUpload !== undefined &&
          uploadPhotoToServer(payload?.data._id).then(() => {
            setFilterAccount((prev) => ({ ...prev, type: "" }));
            setFileUpload(undefined);
          });
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
    dispatch(deleteAccount(id)).then((action) => {
      action.payload.success &&
        setFilterAccount((prev) => ({ ...prev, userId: user?._id ?? "" }));
      const error = (action as any).error;
      const message =
        action.payload.message || error?.message || "Delete account failed";
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
    handleChange,
    handleSelectChange,
    handleSubmit,
    inputRef,
    previewUrl,
    handlePhotoUpload,
    handleFileChange,
    handleEdit,
    handleEditSubmit,
    handleResetFormData,
    handleDelete,
  };
};
