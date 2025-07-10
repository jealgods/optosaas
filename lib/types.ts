export interface User {
  id: number;
  name: string;
  email: string;
  role: "super_admin" | "owner" | "manager" | "staff";
  franchiseId?: number;
  branchAccess: number[];
  isDispenser: boolean;
  isOptometrist?: boolean;
  status: "active" | "inactive";
}

export interface Branch {
  id: number;
  name: string;
}

export interface Franchise {
  id: number;
  name: string;
}

export type UserRole = "super_admin" | "owner" | "manager" | "staff";