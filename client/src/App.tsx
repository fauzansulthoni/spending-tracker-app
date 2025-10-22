import { CssBaseline } from "@mui/material";
import { Route, Routes } from "react-router-dom";

import { ThemeProvider } from "@mui/material/styles";
import { useThemeContext } from "./theme/ThemeContextProvider";
import { useAppDispatch, useAppSelector } from "./hooks/hook";
import { lazy, Suspense, useEffect } from "react";
import { checkAuth } from "./store/authSlice";
import { UserContextProvider } from "./context/UserContext";
import Loading from "./components/Common/Loading";
import { LayoutContextProvider } from "./context/LayoutContext";
const AuthLayout = lazy(() => import("./components/Layout/AuthLayout"));
const UserLayout = lazy(() => import("./components/Layout/UserLayout"));
const CheckAuth = lazy(() => import("./config/CheckAuth"));
const Login = lazy(() => import("./pages/Login/Login"));
const Register = lazy(() => import("./pages/Register/Register"));
const Welcome = lazy(() => import("./pages/Welcome/Welcome"));
const Insight = lazy(() => import("./pages/Insight/Insight"));
const Settings = lazy(() => import("./pages/Settings/Settings"));
const Summary = lazy(() => import("./pages/Summary/Summary"));

function App() {
  const { theme } = useThemeContext();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        {/* <Route
          path="/"
          element={<CheckAuth isAuthenticated={isAuthenticated} user={user} />}
        /> */}
        {/* <Route path="/" element={<Test />}></Route> */}
        <Route
          path="/"
          element={
            <LayoutContextProvider>
              <Welcome />
            </LayoutContextProvider>
          }
        ></Route>
        <Route
          path="/auth"
          element={
            <CheckAuth user={user} isAuthenticated={isAuthenticated}>
              <LayoutContextProvider>
                <Suspense fallback={<Loading />}>
                  <AuthLayout />
                </Suspense>
              </LayoutContextProvider>
            </CheckAuth>
          }
        >
          <Route
            path="login"
            element={
              <Suspense fallback={<Loading />}>
                <Login />
              </Suspense>
            }
          ></Route>
          <Route
            path="register"
            element={
              <Suspense fallback={<Loading />}>
                <Register />
              </Suspense>
            }
          ></Route>
        </Route>
        <Route
          path="/user"
          element={
            <CheckAuth user={user} isAuthenticated={isAuthenticated}>
              <LayoutContextProvider>
                <UserContextProvider>
                  <Suspense fallback={<Loading />}>
                    <UserLayout />
                  </Suspense>
                </UserContextProvider>
              </LayoutContextProvider>
            </CheckAuth>
          }
        >
          <Route
            path="home"
            element={
              <Suspense fallback={<Loading />}>
                <Insight />
              </Suspense>
            }
          ></Route>
          <Route
            path="main-dashboard"
            element={
              <Suspense fallback={<Loading />}>
                <Summary />
              </Suspense>
            }
          ></Route>
          <Route
            path="settings"
            element={
              <Suspense fallback={<Loading />}>
                <Settings />
              </Suspense>
            }
          ></Route>
        </Route>
        {/* <Route path="edit" element={<EditUser />}></Route> */}
      </Routes>
    </ThemeProvider>
  );
}

export default App;
