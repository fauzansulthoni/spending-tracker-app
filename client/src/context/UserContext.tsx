import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type FC,
  type PropsWithChildren,
} from "react";
import type { SnackbarCustomProps } from "../components/Common/SnackbarCustom";
import { useAppDispatch, useAppSelector } from "../hooks/hook";
import { getFilteredAccounts } from "../store/accountSlice";
import type {
  Filter as FilterAccountType,
  AccountType,
} from "../types/Account";
import type {
  Filter as FilterTransactionType,
  TransactionType,
} from "../types/Transaction";
import type {
  Filter as FilterCategoryType,
  CategoryType,
} from "../types/Category";
import type { Filter as FilterBudgetType, BudgetType } from "../types/Budget";
import { getFilteredTransactions } from "../store/transactionSlice";
import { getFilteredCategories } from "../store/categorySlice";
import dayjs from "dayjs";
import { getFilteredBudgets } from "../store/budgetSlice";

type UserContextType = {
  snackbarState: SnackbarCustomProps;
  setSnackbarState: React.Dispatch<React.SetStateAction<SnackbarCustomProps>>;
  activeAccount: string | null;
  setActiveItem: (clickedItem: string) => void;
  accountListFiltered: {
    items: AccountType[];
    total: number;
  };
  setFilterAccount: React.Dispatch<React.SetStateAction<FilterAccountType>>;
  transactionListFiltered: {
    items: TransactionType[];
    total: number;
  };
  setFilterTransaction: React.Dispatch<
    React.SetStateAction<FilterTransactionType>
  >;
  categoryListFiltered: {
    items: CategoryType[];
    total: number;
  };
  setFilterCategory: React.Dispatch<React.SetStateAction<FilterCategoryType>>;
  budgetListFiltered: {
    items: BudgetType[];
    total: number;
  };
  setFilterBudget: React.Dispatch<React.SetStateAction<FilterBudgetType>>;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const UserContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [snackbarState, setSnackbarState] = useState<SnackbarCustomProps>({
    open: false,
    severity: "success",
    onClose: () => setSnackbarState((prev) => ({ ...prev, open: false })),
    anchorOrigin: {
      horizontal: "right",
      vertical: "top",
    },
    autoHideDuration: 4000,
    variant: "filled",
    message: "Message:...",
  });
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  // dispatch account
  const initialAccountFilter = {
    page: 1,
    limit: 100,
    userId: user && user._id ? user._id : "",
  };
  const [filterAccount, setFilterAccount] =
    useState<FilterAccountType>(initialAccountFilter);
  useEffect(() => {
    dispatch(getFilteredAccounts(filterAccount));
  }, [filterAccount]);

  const accountListFiltered = useAppSelector(
    (state) => state.account.accountListFiltered
  );
  const [activeAccount, setActiveAccount] = useState<string | null>(null);
  const setActiveItem = (clickedItem: string) => {
    setActiveAccount(clickedItem);
    localStorage.setItem("account", clickedItem);
  };
  useEffect(() => {
    if (!accountListFiltered.items || accountListFiltered.items.length === 0)
      return;
    let stored = localStorage.getItem("account");
    const isMatchFound =
      accountListFiltered?.items?.filter((item) => item._id === stored)
        ?.length > 0;
    isMatchFound ? stored : (stored = null);
    const fallback = accountListFiltered.items[0]?._id;

    const initial = stored || fallback;

    if (!stored && fallback) {
      localStorage.setItem("account", fallback);
    }
    initial && setActiveAccount(initial);
  }, [accountListFiltered]);

  // dispatch transactions;
  const initialTransactionFilter = {
    page: 1,
    limit: 100,
    accountId: activeAccount ?? "null", //check if the user doesnt have any account!
  };
  const [filterTransaction, setFilterTransaction] =
    useState<FilterTransactionType>(initialTransactionFilter);
  useEffect(() => {
    dispatch(getFilteredTransactions(filterTransaction));
  }, [filterTransaction]);
  const transactionListFiltered = useAppSelector(
    (state) => state.transaction.transactionListFiltered
  );
  // dispatch category;
  const initialCategoryFilter = {
    page: 1,
    limit: 100,
    accountId: activeAccount ?? "null", //check if the user doesnt have any account!
  };
  const [filterCategory, setFilterCategory] = useState<FilterCategoryType>(
    initialCategoryFilter
  );
  useEffect(() => {
    dispatch(getFilteredCategories(filterCategory));
  }, [filterCategory]);

  const categoryListFiltered = useAppSelector(
    (state) => state.category.categoryListFiltered
  );

  // dispatch budget
  const firstDayOfMonth = dayjs().startOf("month").toDate();
  const initialBudgetFilter = {
    page: 1,
    limit: 100,
    month: firstDayOfMonth,
    accountId: activeAccount ?? "null", //check if the user doesnt have any account!
  };
  const [filterBudget, setFilterBudget] =
    useState<FilterBudgetType>(initialBudgetFilter);
  useEffect(() => {
    dispatch(getFilteredBudgets(filterBudget));
  }, [filterBudget]);

  const budgetListFiltered = useAppSelector(
    (state) => state.budget.budgetListFiltered
  );

  // Refetch all data if account changes
  useEffect(() => {
    if (typeof activeAccount !== "string") return;
    setFilterTransaction((prev) => ({ ...prev, accountId: activeAccount }));
    setFilterCategory((prev) => ({ ...prev, accountId: activeAccount }));
    setFilterBudget((prev) => ({ ...prev, accountId: activeAccount }));
  }, [activeAccount]);

  const value = useMemo(
    () => ({
      snackbarState,
      setSnackbarState,
      activeAccount,
      setActiveItem,
      accountListFiltered,
      setFilterAccount,
      transactionListFiltered,
      setFilterTransaction,
      categoryListFiltered,
      setFilterCategory,
      budgetListFiltered,
      setFilterBudget,
    }),
    [
      snackbarState,
      activeAccount,
      accountListFiltered,
      transactionListFiltered,
      categoryListFiltered,
      budgetListFiltered,
    ]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  return context;
};
