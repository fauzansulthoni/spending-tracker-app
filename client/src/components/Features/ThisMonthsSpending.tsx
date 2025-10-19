import { Box, Typography } from "@mui/material";
import { useThemeContext } from "../../theme/ThemeContextProvider";
import useCurrencyFormatter from "../../hooks/useCurrencyFormatter";
import { useAccountTotalSpending } from "../../hooks/useAccountTotalSpending";
import { useSummary } from "../../hooks/useSummary";

const ThisMonthsSpending = () => {
  const { theme } = useThemeContext();
  const { currencyFormatter } = useCurrencyFormatter();
  const { totalExpenseAccount } = useAccountTotalSpending();
  const { filteredTransactions } = useSummary();
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.bgColorPrimary.light,
        color: theme.palette.bgColorPrimary.contrastText,
        borderRadius: 4,
        padding: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="body1" fontWeight={600} color="primary.light">
        Total Month's Spending
      </Typography>
      <Typography variant="h4" fontWeight={700}>
        {currencyFormatter(totalExpenseAccount(filteredTransactions))}
      </Typography>
    </Box>
  );
};

export default ThisMonthsSpending;
