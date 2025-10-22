import { Box, Typography } from "@mui/material";
import useCurrencyFormatter from "../../hooks/useCurrencyFormatter";
import { useAccountTotalSpending } from "../../hooks/useAccountTotalSpending";
import { useThemeContext } from "../../theme/ThemeContextProvider";
import { useSummary } from "../../hooks/useSummary";
const TotalSpending = () => {
  const { totalSpendingAccount } = useAccountTotalSpending();
  const { currencyFormatter } = useCurrencyFormatter();
  const { theme } = useThemeContext();
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
        Total Income - Expense
      </Typography>
      <Typography variant="h4" fontWeight={700}>
        {currencyFormatter(totalSpendingAccount(filteredTransactions))}
      </Typography>
    </Box>
  );
};

export default TotalSpending;
