import { useState } from "react";

const useCurrencyFormatter = () => {
  const initialState = {
    numberFormat: "id-ID",
    currency: "IDR",
  };
  const [currency, setCurrency] = useState<{
    numberFormat: string;
    currency: string;
  }>(initialState);
  const currencyFormatter = (value: string | number) =>
    new Intl.NumberFormat(currency.numberFormat, {
      style: "currency",
      currency: currency.currency,
    }).format(typeof value !== "number" ? parseFloat(value) : value);

  return {
    currencyFormatter,
    currency,
    setCurrency,
  };
};

export default useCurrencyFormatter;
