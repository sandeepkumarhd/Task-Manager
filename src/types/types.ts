export type Role = "admin" | "user";

export interface User {
  id: string;
  email: string;
  role: Role;
}

export type TaskStatus = "Pending" | "Done" | "";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt?: string;
  updatedAt?: string;
  createdBy: string;
  createdOn: string;
}
