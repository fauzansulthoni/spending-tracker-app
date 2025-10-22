import { ArrowBack, Lock, Mail, Person } from "@mui/icons-material";
import {
  Alert,
  Button,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Typography,
} from "@mui/material";
import { useThemeContext } from "../../theme/ThemeContextProvider";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import authIllustration from "/images/illustration/registration-illustration.png";
import { useRegister } from "../../hooks/useRegister";
import { validateRegisterForm } from "../../hooks/validateRegisterForm";
import { useLayoutContext } from "../../context/LayoutContext";

type FormDataType = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};
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

const Register = () => {
  const { theme } = useThemeContext();
  const {
    formData,
    handleChange,
    handleRegister,
    serverResponse,
    setServerResponse,
  } = useRegister();
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormDataType, string>>
  >({});

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const error = validateRegisterForm(
      name as keyof FormDataType,
      value,
      formData
    );
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  useEffect(() => {
    setTimeout(() => setServerResponse(null), 5000);
  }, [serverResponse]);
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
        >
          <ArrowBack />
        </IconButton>
        <Typography variant="h6" sx={{ fontWeight: "700" }}>
          Sign Up
        </Typography>
      </Grid>
      <Grid size={12} sx={{ display: "flex", gap: 3, flexDirection: "column" }}>
        <img
          alt="Auth illustration"
          src={authIllustration}
          style={{ width: "100%" }}
        />
        {serverResponse && (
          <Alert severity="error">{serverResponse.message}.</Alert>
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
            placeholder="Name"
            inputProps={{ "aria-label": "Name" }}
            value={formData?.name}
            onChange={handleChange}
            onBlur={handleBlur}
            name="name"
          />
          <IconButton
            type="button"
            sx={{ color: theme.palette.customColor.main, p: "10px" }}
            aria-label="Name"
            aria-hidden="true"
            tabIndex={-1}
            disableRipple
            disableFocusRipple
          >
            <Person />
          </IconButton>
          {errors?.name && <ErrorMessage errors={errors?.name} />}
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
            placeholder="Email"
            inputProps={{ "aria-label": "Email" }}
            value={formData?.email}
            onChange={handleChange}
            onBlur={handleBlur}
            name="email"
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
          {errors?.email && <ErrorMessage errors={errors?.email} />}
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
            value={formData?.password}
            onChange={handleChange}
            onBlur={handleBlur}
            name="password"
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
          {errors?.password && <ErrorMessage errors={errors?.password} />}
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
            placeholder="Confirm Password"
            inputProps={{ "aria-label": "Confirm Password" }}
            type="password"
            value={formData?.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            name="confirmPassword"
          />
          <IconButton
            type="button"
            sx={{ color: theme.palette.customColor.main, p: "10px" }}
            aria-label="Confirm Password"
            tabIndex={-1}
            disableRipple
            disableFocusRipple
          >
            <Lock />
          </IconButton>
          {errors?.confirmPassword && (
            <ErrorMessage errors={errors?.confirmPassword} />
          )}
        </Paper>
      </Grid>
      <Grid size={12} sx={{ alignSelf: "end" }}>
        <Button
          type="button"
          variant="contained"
          fullWidth
          sx={{ textTransform: "none" }}
          onClick={handleRegister}
        >
          Sign Up
        </Button>

        <Typography
          variant="subtitle2"
          sx={{
            textAlign: "center",
            marginBlock: 3,
            color: theme.palette.text.primary,
          }}
        >
          Already have an account?
          <Link
            style={{
              textDecoration: "none",
              color: theme.palette.text.secondary,
            }}
            to="/auth/login"
          >
            {" "}
            Sign In
          </Link>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Register;
