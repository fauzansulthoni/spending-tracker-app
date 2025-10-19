import CurrencyInput from "react-currency-input-field";
import { TextField } from "@mui/material";
import type { ComponentProps, FC } from "react";

interface CurrencyTextFieldProps extends ComponentProps<typeof TextField> {
  name: string;
  value: string;
  onValueChange: (value: string | undefined) => void;
}

export const CurrencyTextField: FC<CurrencyTextFieldProps> = ({
  name,
  value,
  onValueChange,
  ...muiProps
}) => (
  <CurrencyInput
    name={name}
    value={value}
    onValueChange={onValueChange}
    decimalsLimit={2}
    prefix="Rp"
    customInput={TextField}
    {...muiProps}
  />
);
