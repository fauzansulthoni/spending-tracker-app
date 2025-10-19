import {
  Box,
  Typography,
  Stack,
  Button,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Chip,
  Avatar,
  Grid,
} from "@mui/material";
import { useThemeContext } from "../../theme/ThemeContextProvider";
import AddTransaction from "../../components/Features/AddTransaction";
import {
  AccountCircleOutlined,
  AddCardOutlined,
  CategoryOutlined,
  FlagOutlined,
  InsertChartOutlined,
  WalletOutlined,
} from "@mui/icons-material";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import useSpeedDialTrigger from "../../hooks/useSpeedDialTrigger";
import { useSummary } from "../../hooks/useSummary";
import useCurrencyFormatter from "../../hooks/useCurrencyFormatter";
import { useAccountTotalSpending } from "../../hooks/useAccountTotalSpending";
import Loading from "../../components/Common/Loading";
import { AccountSelector } from "../../components/Features/AccountSelector";
import AddBudget from "../../components/Features/AddBudget";
import SpendingGoals from "../../components/Features/SpendingGoals";
import SpendingReport from "../../components/Features/SpendingReport";
import DeleteConfirmation from "../../components/Common/DeleteConfirmation";
import ThisMonthsSpending from "../../components/Features/ThisMonthsSpending";
import ThisMonthsIncome from "../../components/Features/ThisMonthsIncome";
import { BudgetProgress } from "../../components/Features/BudgetProgress";
import MonthSelector from "../../components/Features/MonthSelector";
import AddTransactionBtn from "../../components/Features/AddTransactionBtn";
import TotalSpending from "../../components/Features/TotalSpending";
import CustomSpeedDial from "../../components/Layout/CustomSpeedDial";
const SpendingHistory = lazy(
  () => import("../../components/Features/SpendingHistory")
);
const CategoryBreakdown = lazy(
  () => import("../../components/Features/CategoryBreakdown")
);
const AddCategory = lazy(() => import("../../components/Features/AddCategory"));
const AddAccount = lazy(() => import("../../components/Features/AddAccount"));

const Summary = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [openAddCategory, setOpenAddCategory] = useState(false);
  const [openAddAccount, setOpenAddAccount] = useState(false);
  const [openSpendingReport, setOpenSpendingReport] = useState(false);
  const [openSpendingGoals, setOpenSpendingGoals] = useState(false);
  const [openSpendingBudget, setOpenSpendingBudget] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [editSpending, setEditSpending] = useState({});
  const [deleteDialogProps, setDeleteDialogProps] = useState({});
  const { theme } = useThemeContext();
  const { speedDialProps } = useSpeedDialTrigger();
  const actions = [
    {
      icon: <AddCardOutlined />,
      name: "Spending",
      control: () => {
        if (filteredCategories.length > 0) {
          setOpenAdd(true);
        } else {
          alert(
            "You don't have any category, please add category before adding budget"
          );
        }
      },
    },
    {
      icon: <CategoryOutlined />,
      name: "Category",
      control: () => setOpenAddCategory(true),
    },
    {
      icon: <AccountCircleOutlined />,
      name: "Account",
      control: () => setOpenAddAccount(true),
    },
    {
      icon: <WalletOutlined />,
      name: "Budget",
      control: () => {
        if (filteredCategories.length > 0) {
          setOpenSpendingBudget(true);
        } else {
          alert(
            "You don't have any category, please add category before adding budget"
          );
        }
      },
    },
  ];

  const { currencyFormatter } = useCurrencyFormatter();
  const { totalSpendingAccount } = useAccountTotalSpending();
  const {
    activeAccount,
    setActiveItem,
    filteredAccounts,
    filteredTransactions,
    filteredCategories,
  } = useSummary();
  // const { setFilteredByCategory } = FilterTransactionByCategory;

  const chipRefs = useRef<Record<string, HTMLDivElement | null>>({});
  useEffect(() => {
    const activeChip = activeAccount && chipRefs.current[activeAccount];
    if (activeChip) {
      activeChip.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [activeAccount]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid container size={{ sm: 12, md: 12 }}>
          <Grid size={{ xs: 12, md: 8 }}>
            {/* Account Selector */}
            <AccountSelector
              filteredAccounts={filteredAccounts}
              activeAccount={activeAccount ?? ""}
              setActiveItem={setActiveItem}
              chipRefs={chipRefs}
            />
          </Grid>
          <Grid container size={{ xs: 12, md: 4 }}>
            {/* Month Selector */}
            <Grid size={6}>
              <MonthSelector />
            </Grid>
            {/* Add Transaction Btn */}
            <Grid size={6}>
              <AddTransactionBtn
                open={() => {
                  if (filteredCategories.length > 0) {
                    setOpenAdd(true);
                  } else {
                    alert(
                      "You don't have any category, please add category before adding budget"
                    );
                  }
                }}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid container size={{ sm: 12, md: 8 }}>
          <Grid container size={{ sm: 12, md: 12 }}>
            {/* This Month's Spending */}
            <Grid size={{ sm: 12, md: 6 }}>
              {/* <Box sx={{ borderColor: "1px solid white" }}>
                This Month's Spending
              </Box> */}
              <ThisMonthsSpending />
            </Grid>
            {/* This Month's Income */}
            <Grid size={{ sm: 12, md: 6 }}>
              {/* <Box sx={{ borderColor: "1px solid white" }}>
                This Month's Income
              </Box> */}
              <ThisMonthsIncome />
            </Grid>
            {/* Total Spending */}
            {/* <Box sx={{ borderColor: "1px solid white" }}>Income x Expense</Box> */}
            <Grid size={{ sm: 12, md: 12 }}>
              <TotalSpending />
            </Grid>
          </Grid>
          <Grid size={{ sm: 12, md: 12 }}>
            {/* <Box sx={{ borderColor: "1px solid white" }}>
              Recent Transaction
            </Box> */}
            {/* Spending History */}
            <Suspense fallback={<Loading />}>
              <SpendingHistory
                setOpenAdd={setOpenAdd}
                setOpenDeleteDialog={setOpenDeleteDialog}
                setDeleteDialogProps={setDeleteDialogProps}
                setEditSpending={setEditSpending}
              />
            </Suspense>
          </Grid>
        </Grid>
        <Grid container size={{ sm: 12, md: 4 }}>
          <Grid size={{ sm: 12, md: 12 }}>
            {/* Category Breakdown */}
            <Suspense fallback={<Loading />}>
              <CategoryBreakdown />
            </Suspense>
          </Grid>
          <Grid size={{ sm: 12, md: 12 }}>
            {/* <Box sx={{ borderColor: "1px solid white" }}>Budget Progress</Box> */}
            <BudgetProgress setOpenSpendingGoals={setOpenSpendingGoals} />
          </Grid>
        </Grid>

        {/* <Grid size={{ sm: 12, md: 8 }}>
          <Box sx={{ borderColor: "1px solid white" }}>size=8</Box>
        </Grid> */}
      </Grid>
      {/* Speed Dial */}
      <CustomSpeedDial
        setOpenAdd={setOpenAdd}
        setOpenAddCategory={setOpenAddCategory}
        setOpenAddAccount={setOpenAddAccount}
        setOpenSpendingBudget={setOpenSpendingBudget}
      />
      {/* Dialog Boxes */}
      {/* Dialog Boxes */}
      <Suspense fallback={<Loading />}>
        <AddCategory
          open={openAddCategory}
          setOpen={setOpenAddCategory}
          setOpenDeleteDialog={setOpenDeleteDialog}
          setDeleteDialogProps={setDeleteDialogProps}
        />
        {filteredCategories.length > 0 && (
          <>
            <AddTransaction
              open={openAdd}
              setOpen={setOpenAdd}
              {...editSpending}
            />
            <AddBudget
              open={openSpendingBudget}
              setOpen={setOpenSpendingBudget}
            />
          </>
        )}

        <SpendingGoals
          open={openSpendingGoals}
          setOpen={setOpenSpendingGoals}
        />
        <AddAccount
          open={openAddAccount}
          setOpen={setOpenAddAccount}
          setOpenDeleteDialog={setOpenDeleteDialog}
          setDeleteDialogProps={setDeleteDialogProps}
        />
        <SpendingReport
          open={openSpendingReport}
          setOpen={setOpenSpendingReport}
        />
        <DeleteConfirmation
          open={openDeleteDialog}
          setOpen={setOpenDeleteDialog}
          setDeleteDialogProps={setDeleteDialogProps}
          {...deleteDialogProps}
        />
      </Suspense>
    </Box>
  );
};

export default Summary;
