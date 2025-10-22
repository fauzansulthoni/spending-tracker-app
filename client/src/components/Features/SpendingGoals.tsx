import Dialog from "@mui/material/Dialog";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";
import type { TransitionProps } from "@mui/material/transitions";
import {
  forwardRef,
  type ReactElement,
  type Ref,
} from "react";
import {
  alpha,
  Box,
  Card,
  CardContent,
  DialogContent,

  LinearProgress,

  Stack,
} from "@mui/material";
import {
  ArrowBack,
} from "@mui/icons-material";
import { useThemeContext } from "../../theme/ThemeContextProvider";
import { useSummary } from "../../hooks/useSummary";
import { useAccountTotalSpending } from "../../hooks/useAccountTotalSpending";
import DynamicIcon from "../../hooks/useDynamicIcon";
import useCurrencyFormatter from "../../hooks/useCurrencyFormatter";
import BudgetSlider from "./BudgetSlider";
import type { BudgetType } from "../../types/Budget";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<unknown>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type OpenDialogType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const SpendingGoals = (props: OpenDialogType) => {
  const { open, setOpen } = props;
  const { theme } = useThemeContext();
 
  const handleClose = () => {
    setOpen(false);
  };

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
  const { sumPerCategoryAccount, totalIncomeAccount } =
    useAccountTotalSpending();
  const { currencyFormatter } = useCurrencyFormatter();
  const sumAnotherCategoryBudget = (
    budgets: BudgetType[],
    currentId: string
  ) => {
    const totalBudget = budgets.reduce((sum, item) => {
      if (item._id !== currentId) {
        return sum + item.limitAmount;
      }
      return sum;
    }, 0);
    return totalBudget;
  };
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      slots={{
        transition: Transition,
      }}
    >
      <AppBar
        sx={{
          position: "relative",
          paddingBlock: "6px",
          backgroundColor: theme.palette.bgColor.main,
          color: theme.palette.bgColor.contrastText,
        }}
      >
        <Toolbar>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconButton
              sx={{ position: "absolute", left: "18px" }}
              //   edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <ArrowBack />
            </IconButton>
            <Typography variant="h6" component="div">
              Spending Goals
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <DialogContent
        sx={{
          backgroundColor: theme.palette.bgColor.light,
        }}
      >
        <Typography variant="h6" fontWeight={700} gutterBottom>
          Set Your Goals
        </Typography>
        <Stack spacing={2}>
          {/* Start Loop */}
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
            const totalIncome =
              transactions !== null
                ? totalIncomeAccount(filteredTransactions)
                : 0;
            const percentage =
              typeof sumTransactions === "number"
                ? Math.round(
                    (Math.abs(sumTransactions) / item.limitAmount) * 100
                  )
                : 0;
            const isMoreThanBudget = percentage > 100;
            const anotherCategoryBudget =
              typeof item._id === "string"
                ? sumAnotherCategoryBudget(filteredBudget, item._id)
                : 0;
            return (
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 3,
                  height: "100%",
                  backgroundColor: theme.palette.bgColorPrimary.light,
                  color: theme.palette.bgColorPrimary.contrastText,
                }}
                key={index}
              >
                <CardContent>
                  <Stack direction="column" spacing={2}>
                    <Stack direction="row" spacing={1.5}>
                      <IconButton
                        sx={{
                          backgroundColor:
                            category && alpha(category.color, 0.2),
                          color: category && category.color,
                          width: "40px",
                          height: "40px",
                          padding: 3,
                          borderRadius: 2,
                          "&:hover": {
                            backgroundColor:
                              category && alpha(category.color, 0.5),
                          },
                        }}
                      >
                        {category ? (
                          <DynamicIcon iconName={category.icon} />
                        ) : (
                          "🤑"
                        )}
                        {/* {category && category.icon} */}
                      </IconButton>
                      <Box>
                        <Typography
                          variant="body1"
                          fontSize={18}
                          fontWeight={700}
                        >
                          {category && category.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {currencyFormatter(item.limitAmount)} / month
                        </Typography>
                      </Box>
                    </Stack>
                    <Stack>
                      <Typography variant="body2" color="text.secondary">
                        {category && category.name} Budget:{" "}
                        {currencyFormatter(item.limitAmount)}
                        {/* Category Budget */}
                      </Typography>
                      <BudgetSlider
                        budgetId={typeof item._id === "string" ? item._id : ""}
                        budget={item.limitAmount}
                        anotherCategoryBudget={anotherCategoryBudget}
                        totalIncome={totalIncome}
                      />
                    </Stack>
                    <Stack spacing={1}>
                      <Typography variant="body2">
                        Current Spending:{" "}
                        {sumTransactions &&
                          currencyFormatter(Math.abs(sumTransactions))}{" "}
                        / {currencyFormatter(item.limitAmount)}
                        {/* Current Spending: spent / budget */}
                      </Typography>
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
                </CardContent>
              </Card>
            );
          })}
          {/* End Loop */}
        </Stack>
      </DialogContent>
      <Divider />
    </Dialog>
  );
};

export default SpendingGoals;
