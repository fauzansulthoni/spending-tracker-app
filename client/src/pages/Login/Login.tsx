import { ArrowBack, Lock, Mail } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Typography,
} from "@mui/material";
import { useThemeContext } from "../../theme/ThemeContextProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import authIllustration from "/images/illustration/auth-illustration.png";
import { useEffect, useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import { validateLoginForm } from "../../hooks/validateLoginForm";
import { useLayoutContext } from "../../context/LayoutContext";

const ErrorMessage = ({ errors }: { errors?: string }) => {
  return (
    <Typography
      sx={{ position: "absolute", top: "-20px", left: 0 }}
      variant="subtitle2"
      color="error"
    >
      {errors}
    </Typography>
  );
};

type FormDataType = {
  email: string;
  password: string;
  rememberMe?: boolean;
};

const Login = () => {
  const { theme } = useThemeContext();
  const navigate = useNavigate();
  const location = useLocation();
  const registrationState = location.state;
  const {
    formData,
    handleChange,
    handleLogin,
    serverResponse,
    setServerResponse,
  } = useLogin();

  useEffect(() => {
    setServerResponse(registrationState);
  }, [registrationState]);

  useEffect(() => {
    setTimeout(() => setServerResponse(null), 5000);
  }, [serverResponse]);

  const [errors, setErrors] = useState<
    Partial<Record<keyof FormDataType, string>>
  >({});
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const error = validateLoginForm(
      name as keyof FormDataType,
      value,
      formData
    );
    setErrors((prev) => ({ ...prev, [name]: error }));
  };
  const { isSmUp } = useLayoutContext();
  return (
    <Grid
      container
      size={12}
      sx={{
        gap: 4,
        maxWidth: "500px",
        maxHeight: isSmUp ? "1000px" : "none",
        p: isSmUp ? 3 : 0,
        boxShadow: isSmUp ? 3 : "none",
        borderRadius: isSmUp ? 4 : "none",
        backgroundColor: theme.palette.bgColor.main,
      }}
    >
      <Grid
        size={12}
        sx={{
          alignSelf: "start",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <IconButton
          sx={{
            position: "absolute",
            left: 0,
            color: theme.palette.text.secondary,
          }}
          onClick={() => navigate({ pathname: "/" })}
        >
          <ArrowBack />
        </IconButton>
        <Typography variant="h6" sx={{ fontWeight: "700" }}>
          Sign In
        </Typography>
      </Grid>
      <Grid size={12} sx={{ display: "flex", gap: 3, flexDirection: "column" }}>
        <img
          alt="Auth illustration"
          src={authIllustration}
          style={{ width: "100%" }}
        />
        {serverResponse && (
          <Alert severity={serverResponse.success ? "success" : "error"}>
            {serverResponse.message}.
          </Alert>
        )}
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            backgroundColor: theme.palette.bgColor.main,
            boxShadow: "none",
            border: `1px solid ${theme.palette.customColor.dark}`,
            position: "relative",
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Email"
            inputProps={{ "aria-label": "Email" }}
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <IconButton
            type="button"
            sx={{ color: theme.palette.customColor.main, p: "10px" }}
            aria-label="Email"
            tabIndex={-1}
            disableRipple
            disableFocusRipple
          >
            <Mail />
          </IconButton>
          {errors.email && <ErrorMessage errors={errors?.email} />}
        </Paper>
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            backgroundColor: theme.palette.bgColor.main,
            boxShadow: "none",
            border: `1px solid ${theme.palette.customColor.dark}`,
            position: "relative",
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Password"
            type="password"
            inputProps={{ "aria-label": "Password" }}
            name="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <IconButton
            type="button"
            sx={{ color: theme.palette.customColor.main, p: "10px" }}
            aria-label="Password"
            tabIndex={-1}
            disableRipple
            disableFocusRipple
          >
            <Lock />
          </IconButton>
          {errors.password && <ErrorMessage errors={errors?.password} />}
        </Paper>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alighItems: "center",
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                name="rememberMe"
                value={formData.rememberMe}
                onChange={handleChange}
              />
            }
            label="Keep me logged in"
          />
          <Link
            style={{
              textDecoration: "none",
              marginBlock: "auto",
              color: theme.palette.text.secondary,
            }}
            to="/auth/forgot-password"
          >
            Forgot Password
          </Link>
        </Box>
        <Button
          type="button"
          variant="contained"
          fullWidth
          sx={{ textTransform: "none" }}
          onClick={handleLogin}
        >
          Sign In
        </Button>
        <Typography variant="subtitle2" sx={{ textAlign: "center" }}>
          Don't have an account?
          <Link
            style={{
              textDecoration: "none",
              color: theme.palette.text.secondary,
            }}
            to="/auth/register"
          >
            {" "}
            Sign Up
          </Link>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Login;
