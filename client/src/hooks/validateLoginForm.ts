interface LoginFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export const validateLoginForm = (
  name: keyof LoginFormData,
  value: string,
  _formData: LoginFormData
): string | undefined => {
  switch (name) {
    case "email":
      if (!value.trim()) return "Email is required.";
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) return "Email format is invalid.";
      break;
    case "password":
      if (!value) return "Password is required.";
      break;

    default:
      return undefined;
  }
};
