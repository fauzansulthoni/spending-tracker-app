import { type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import type { UserType } from "../types/User";
interface CheckAuthProps {
  isAuthenticated: boolean;
  user: UserType | null;
  children?: ReactNode;
}

const CheckAuth = ({ isAuthenticated, user, children }: CheckAuthProps) => {
  if (isAuthenticated && user === null) return <Navigate to="/auth/login" />;
  if (user === undefined) return <Navigate to="/auth/login" />;
  if (
    isAuthenticated &&
    user &&
    !location.pathname.includes("user") &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register")
    )
  ) {
    return <Navigate to="/auth/login" />;
  }

  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    return <Navigate to="/user/home" />;
  }

  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register")
    )
  ) {
    return <Navigate to="/auth/login" />;
  }

  return <>{children}</>;
};

export default CheckAuth;
