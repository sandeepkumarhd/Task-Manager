export type Role = "admin" | "user";

export interface User {
  id: string;
  email: string;
  role: Role;
}

export type TaskStatus = "pending" | "done";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: string; // ISO date
  updatedAt: string;
  createdBy: string; // user id or email
}
