import type { AccountType } from "./Account";

export interface CategoryType {
  _id?: string;
  name: string;
  icon: string;
  type: string;
  color: string;
  accountId: string | AccountType;
}

export interface Filter {
  page?: number;
  limit?: number;
  accountId?: string;
}
