import type { User } from "@/types/types";

interface UserWithPassword extends User {
  password: string;
}

export const MOCK_USERS: UserWithPassword[] = [
  {
    id: "1",
    email: "admin@example.com",
    password: "admin123",
    role: "admin",
  },
  {
    id: "2",
    email: "user@example.com",
    password: "user123",
    role: "user",
  },
];
