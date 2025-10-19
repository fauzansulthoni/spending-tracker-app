import { useState } from "react";
import { useAppDispatch } from "./hook";
import { loginUser } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
const loginInitialState = {
  email: "",
  password: "",
  rememberMe: false,
};

export const useLogin = () => {
  const [formData, setFormData] = useState(loginInitialState);
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

  const handleLogin = async () => {
    dispatch(loginUser(formData))
      .then((action) => {
        const { payload } = action;
        if (payload?.success) {
          navigate("/user/home", {
            state: { success: payload.success, message: payload.message },
          });
        } else {
          console.log("you enter this block", payload);
          const errorMessage = payload?.message || "Login failed";
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
    handleLogin,
    serverResponse,
    setServerResponse,
  };
};
