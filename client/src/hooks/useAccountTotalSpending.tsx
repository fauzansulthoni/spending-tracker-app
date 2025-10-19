import type { TransactionType } from "../types/Transaction";

export const useAccountTotalSpending = () => {
  const totalSpendingAccount = (transactions: TransactionType[]) => {
    const totalPerAccount = transactions.reduce((sum, item) => {
      if (item.type === "Income") {
        return sum + item.amount;
      } else if (item.type === "Expense") {
        return sum - item.amount;
      }
      return sum;
    }, 0);
    return totalPerAccount;
  };
  const totalIncomeAccount = (transactions: TransactionType[]) => {
    const totalPerAccount = transactions.reduce((sum, item) => {
      if (item.type === "Income") {
        return sum + item.amount;
      } else if (item.type === "Expense") {
        return sum;
      }
      return sum;
    }, 0);
    return totalPerAccount;
  };
  const totalExpenseAccount = (transactions: TransactionType[]) => {
    const totalPerAccount = transactions.reduce((sum, item) => {
      if (item.type === "Expense") {
        return sum + item.amount;
      } else if (item.type === "Income") {
        return sum;
      }
      return sum;
    }, 0);
    return totalPerAccount;
  };

  const sumPerCategoryAccount = (
    transactions: TransactionType[],
    categoryId: string
  ) => {
    const totalPerCategory = transactions
      .filter((item) => item.categoryId === categoryId)
      .reduce((sum, item) => {
        if (item.type === "Income") {
          return sum + item.amount;
        } else if (item.type === "Expense") {
          return sum - item.amount;
        }
        return sum; // fallback if type is missing or unknown
      }, 0);

    return totalPerCategory;
  };

  return {
    totalIncomeAccount,
    totalExpenseAccount,
    totalSpendingAccount,
    sumPerCategoryAccount,
  };
};
