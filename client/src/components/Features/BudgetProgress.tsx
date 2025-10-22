import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import {
  alpha,
  Box,
  Button,
  Divider,
  Grid,
  LinearProgress,
  Stack,
} from "@mui/material";
import { useThemeContext } from "../../theme/ThemeContextProvider";
import { useSummary } from "../../hooks/useSummary";
import { useAccountTotalSpending } from "../../hooks/useAccountTotalSpending";
import DynamicIcon from "../../hooks/useDynamicIcon";
import useCurrencyFormatter from "../../hooks/useCurrencyFormatter";
interface BudgetProgress {
  setOpenSpendingGoals: React.Dispatch<React.SetStateAction<boolean>>;
}
export const BudgetProgress = ({ setOpenSpendingGoals }: BudgetProgress) => {
  const { theme } = useThemeContext();

  const { filteredBudget, filteredCategories, filteredTransactions } =
    useSummary();
  const budgetCategory = (value: string) => {
    const category = filteredCategories.filter((item) => item._id === value)[0];
    return category;
  };
  const categoryTransaction = (value: string) => {
    const transaction = filteredTransactions.filter(
      (item) => item.categoryId === value
    );
    return transaction;
  };
  const { sumPerCategoryAccount } =
    useAccountTotalSpending();
  const { currencyFormatter } = useCurrencyFormatter();

  return (
    <>
      <Stack direction="row" justifyContent={"space-between"}>
        <Typography
          variant="h6"
          fontWeight={600}
          gutterBottom
          color={theme.palette.bgColorPrimary.contrastText}
        >
          Budget Progress
        </Typography>

        <Button variant="contained" onClick={() => setOpenSpendingGoals(true)}>
          Set Goals
        </Button>
      </Stack>
      <Grid
        size={12}
        spacing={2}
        sx={{
          marginTop: 2,
          backgroundColor: theme.palette.bgColorPrimary.light,
          color: theme.palette.bgColorPrimary.contrastText,
          borderRadius: 4,
        }}
      >
        {filteredBudget.map((item, index) => {
          const category =
            typeof item.categoryId === "string"
              ? budgetCategory(item.categoryId)
              : null;
          const transactions =
            typeof item.categoryId === "string"
              ? categoryTransaction(item.categoryId)
              : null;
          const sumTransactions =
            typeof item.categoryId === "string" &&
            transactions !== null &&
            sumPerCategoryAccount(transactions, item.categoryId);
          // const totalIncome =
          //   transactions !== null
          //     ? totalIncomeAccount(filteredTransactions)
          //     : 0;
          const percentage =
            typeof sumTransactions === "number"
              ? Math.round((Math.abs(sumTransactions) / item.limitAmount) * 100)
              : 0;
          const isMoreThanBudget = percentage > 100;
          // const anotherCategoryBudget =
          //   typeof item._id === "string"
          //     ? sumAnotherCategoryBudget(filteredBudget, item._id)
          //     : 0;
          return (
            <Box key={index}>
              <Stack direction="column" spacing={2} padding={2}>
                <Stack direction="row" spacing={1.5}>
                  <IconButton
                    sx={{
                      backgroundColor: category && alpha(category.color, 0.2),
                      color: category && category.color,
                      width: "40px",
                      height: "40px",
                      padding: 3,
                      borderRadius: 2,
                      "&:hover": {
                        backgroundColor: category && alpha(category.color, 0.5),
                      },
                    }}
                  >
                    {category ? <DynamicIcon iconName={category.icon} /> : "🤑"}
                    {/* {category && category.icon} */}
                  </IconButton>
                  <Box>
                    <Typography variant="body1" fontSize={18} fontWeight={700}>
                      {category && category.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Current Spending:{" "}
                      {sumTransactions &&
                        currencyFormatter(Math.abs(sumTransactions))}{" "}
                      / {currencyFormatter(item.limitAmount)}
                    </Typography>
                  </Box>
                </Stack>
                <Stack spacing={1}>
                  <LinearProgress
                    variant="determinate"
                    value={isMoreThanBudget ? 100 : percentage}
                    // value={80}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: "#eee",
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: isMoreThanBudget
                          ? "#b70a07ff"
                          : "#1976d2",
                      },
                    }}
                  />
                </Stack>
              </Stack>
              {index < filteredBudget.length - 1 && <Divider />}
            </Box>
          );
        })}
      </Grid>
    </>
  );
};
