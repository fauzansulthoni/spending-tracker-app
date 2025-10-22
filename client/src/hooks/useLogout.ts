import { useAppDispatch } from "./hook";
import { logoutUser } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    dispatch(logoutUser()).then((action) =>
      navigate("/auth/login", {
        state: {
          success: action.payload.success,
          message: action.payload.message,
        },
      })
    );
  };

  return {
    handleLogout,
  };
};
