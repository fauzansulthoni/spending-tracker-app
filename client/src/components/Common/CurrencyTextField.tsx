import { TextField, type TextFieldProps } from "@mui/material";
import CurrencyInput from "react-currency-input-field";
import { forwardRef } from "react";

interface CurrencyTextFieldProps
  extends Omit<TextFieldProps, "value" | "onChange" | "inputComponent"> {
  name: string;
  value: string;
  onValueChange: (value: string | undefined) => void;
}

const CurrencyInputComponent = forwardRef<HTMLInputElement, any>(
  (props, ref) => (
    <CurrencyInput {...props} ref={ref} decimalsLimit={2} prefix="Rp" />
  )
);

export const CurrencyTextField = ({
  name,
  value,
  onValueChange,
  ...muiProps
}: CurrencyTextFieldProps) => {
  return (
    <TextField
      {...muiProps}
      name={name}
      value={value}
      onChange={() => {}} // required to suppress MUI warning
      InputProps={{
        inputComponent: CurrencyInputComponent as any,
        inputProps: {
          value,
          onValueChange,
        },
      }}
    />
  );
};
