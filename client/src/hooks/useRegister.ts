import { useState } from "react";
import { useAppDispatch } from "./hook";
import { registerUser } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

const registerInitialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};
export const useRegister = () => {
  const [formData, setFormData] = useState(registerInitialState);
  const [serverResponse, setServerResponse] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleRegister = async () => {
    dispatch(registerUser(formData))
      .then((action) => {
        const { payload } = action;
        const error = (action as any).error;
        if (payload?.success) {
          navigate("/auth/login", {
            state: { success: payload.success, message: payload.message },
          });
        } else {
          const errorMessage =
            payload?.message || error?.message || "Registration failed";
          setServerResponse({
            success: false,
            message: errorMessage,
          });
        }
      })
      .catch((error) => {
        console.log("Unexpected error:", error);
      });
  };

  return {
    formData,
    handleChange,
    handleRegister,
    serverResponse,
    setServerResponse,
  };
};
