import type { TransactionType } from "../types/Transaction";
import { useEffect, useState } from "react";
export const useFilterTransactionByCategory = (
  transactions: TransactionType[]
) => {
  const [filteredByCategory, setFilteredByCategory] = useState(transactions);
  useEffect(() => {
    setFilteredByCategory(transactions);
  }, [transactions]);
  const handleFilterByCategory = (value: string) => {
    if (value !== "All Categories") {
      const filtered = transactions.filter((item) => {
        return item.categoryId === value;
      });
      setFilteredByCategory(filtered);
    } else {
      setFilteredByCategory(transactions);
    }
  };
  return {
    filteredByCategory,
    handleFilterByCategory,
  };
};
