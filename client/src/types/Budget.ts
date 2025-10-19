import type { CategoryType } from "./Category";
import type { AccountType } from "./Account";

export interface BudgetType {
  _id?: string;
  accountId: string | AccountType;
  categoryId: string | CategoryType;
  month: Date;
  limitAmount: number;
}

export interface Filter {
  page?: number;
  limit?: number;
  month?: Date;
  accountId?: string;
  categoryId?: string;
}
