interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const validateRegisterForm = (
  name: keyof RegisterFormData,
  value: string,
  formData: RegisterFormData
): string | undefined => {
  switch (name) {
    case "name":
      if (!value.trim()) return "Name is required.";
      break;

    case "email":
      if (!value.trim()) return "Email is required.";
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) return "Email format is invalid.";
      break;

    case "password":
      if (!value) return "Password is required.";
      if (value.length < 6) return "Password must be at least 6 characters.";
      break;

    case "confirmPassword":
      if (!value) return "Please confirm your password.";
      if (value !== formData.password) return "Passwords do not match.";
      break;

    default:
      return undefined;
  }
};
