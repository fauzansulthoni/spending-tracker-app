import type { TimeStampType } from "./Common";
import type { UserType } from "./User";

export interface AccountType extends TimeStampType {
  _id?: string;
  name: string;
  description: string;
  photo: string;
  userId: string | UserType;
}

export interface Filter {
  page?: number;
  limit?: number;
  userId?: string;
}
