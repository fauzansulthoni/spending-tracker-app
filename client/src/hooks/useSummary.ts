import { useMemo } from "react";
import { useUserContext } from "../context/UserContext";

export const useSummary = () => {
  const {
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
  } = useUserContext();

  const filteredAccounts = useMemo(
    () => accountListFiltered.items,
    [accountListFiltered.items]
  );
  const filteredTransactions = useMemo(
    () => transactionListFiltered.items,
    [transactionListFiltered.items]
  );
  const filteredCategories = useMemo(
    () => categoryListFiltered.items,
    [categoryListFiltered.items]
  );
  const filteredBudget = useMemo(
    () => budgetListFiltered.items,
    [budgetListFiltered.items]
  );

  return {
    activeAccount,
    setActiveItem,
    filteredAccounts,
    setFilterAccount,
    filteredTransactions,
    setFilterTransaction,
    filteredCategories,
    setFilterCategory,
    filteredBudget,
    setFilterBudget,
  };
};
