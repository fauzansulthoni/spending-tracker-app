import type { CategoryType } from "./Category";
import type { TimeStampType } from "./Common";
import type { AccountType } from "./Account";

export interface TransactionType extends TimeStampType {
  _id?: string;
  accountId: string | AccountType;
  categoryId: string;
  category?: CategoryType;
  amount: number;
  type: "Income" | "Expense";
  note: string;
  date: Date;
}

export interface Filter {
  page?: number;
  limit?: number;
  categoryId?: string;
  month?: string;
  startDateRaw?: string;
  endDateRaw?: string;
  startAmount?: string;
  endAmount?: string;
  accountId?: string;
}
