import { useRef, useState } from "react";
import type { UserType } from "../types/User";
import { useAppDispatch, useAppSelector } from "./hook";
import { useUserContext } from "../context/UserContext";
import { updatePassword, updateUser } from "../store/authSlice";
import axios from "axios";

export const useEditUser = () => {
  const { user } = useAppSelector((state) => state.auth);
  const initialState: UserType = {
    _id: user?._id ?? "",
    name: user?.name ?? "",
    email: user?.email ?? "",
    photo: user?.photo ?? "",
  };
  const [formData, setFormData] = useState<UserType>(initialState);
  const userContext = useUserContext();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileUpload, setFileUpload] = useState<File | undefined>(undefined);
  const dispatch = useAppDispatch();
  const uploadPhotoToServer = async (userId: string) => {
    const formData = new FormData();
    fileUpload && formData.append("photo", fileUpload);
    formData.append("_id", userId);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/image/upload/",
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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
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
    dispatch(updateUser(formData))
      .then((action) => {
        const { payload } = action;
        const error = (action as any).error;
        const message =
          payload?.message || error?.message || "Adding account failed";
        typeof fileUpload !== undefined &&
          uploadPhotoToServer(payload?.user._id).then(() => {
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
  const userData = user;

  const initialStateUpdatePassword = {
    _id: user?._id ?? "",
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };
  const [formUpdatePassword, setFormUpdatePassword] = useState(
    initialStateUpdatePassword
  );
  const handleChangeUpdatePassword = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setFormUpdatePassword((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleSubmitUpdatePassword = async () => {
    dispatch(updatePassword(formUpdatePassword)).then((action) => {
      const { payload } = action;
      const error = (action as any).error;
      const message =
        payload?.message || error?.message || "Editing user password failed";
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
    userData,
    formData,
    handleChange,
    handleSubmit,
    previewUrl,
    handleFileChange,
    inputRef,
    handlePhotoUpload,
    handleSubmitUpdatePassword,
    handleChangeUpdatePassword,
    formUpdatePassword,
  };
};
