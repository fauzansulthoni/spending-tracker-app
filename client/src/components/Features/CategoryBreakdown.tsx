import { Box, LinearProgress, Stack, Typography } from "@mui/material";
import { useThemeContext } from "../../theme/ThemeContextProvider";
import { useAccountTotalSpending } from "../../hooks/useAccountTotalSpending";
import type { CategoryType } from "../../types/Category";
import useCurrencyFormatter from "../../hooks/useCurrencyFormatter";
import { useSummary } from "../../hooks/useSummary";
// const categoryData = [
//   { name: "Food", amount: 875 },
//   { name: "Bills", amount: 250 },
//   { name: "Entertainment", amount: 100 },
//   { name: "Other", amount: 25 },
// ];
// const totalSpending = categoryData.reduce((sum, c) => sum + c.amount, 0);
const CategoryBreakdown = () => {
  const { currencyFormatter } = useCurrencyFormatter();
  function hasValidId(
    item: CategoryType
  ): item is CategoryType & { _id: string } {
    return typeof item._id === "string" && item.type === "Expense";
  }

  const { filteredCategories, filteredTransactions } = useSummary();
  const { totalSpendingAccount, sumPerCategoryAccount } =
    useAccountTotalSpending();

  const categoryData = filteredCategories.filter(hasValidId).map((item) => ({
    name: item.name,
    amount: sumPerCategoryAccount(filteredTransactions, item._id),
  }));

  const { theme } = useThemeContext();

  return (
    <Box>
      <Typography
        variant="h6"
        fontWeight={600}
        gutterBottom
        color={theme.palette.bgColorPrimary.contrastText}
      >
        Category Breakdown
      </Typography>
      <Stack
        spacing={2}
        sx={{
          padding: 2,
          backgroundColor: theme.palette.bgColorPrimary.light,
          color: theme.palette.bgColorPrimary.contrastText,
          borderRadius: 4,
        }}
      >
        {filteredTransactions.length > 1 &&
          categoryData.map((cat, index) => {
            const percentages = Math.floor(
              Math.abs(
                cat.amount / totalSpendingAccount(filteredTransactions)
              ) * 100
            );
            return (
              <Stack direction="row" key={index} spacing={2}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    gap: 2,
                  }}
                >
                  <Typography variant="body2" fontWeight={600}>
                    {cat.name}
                  </Typography>
                  <Box sx={{ width: "100%" }}>
                    <LinearProgress
                      variant="determinate"
                      value={percentages}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: "primary",
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: "#1976d2",
                        },
                      }}
                    />
                  </Box>
                </Box>
                <Box sx={{ maxWidth: { sm: 120, md: 130, lg: 160 } }}>
                  <Typography variant="body2" fontWeight={600} noWrap>
                    {percentages}% {currencyFormatter(cat.amount)}
                  </Typography>
                </Box>
              </Stack>
            );
          })}
      </Stack>
    </Box>
  );
};

export default CategoryBreakdown;
