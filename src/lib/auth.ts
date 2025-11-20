import type { User } from "@/types/types";
import Cookies from "js-cookie";

const AUTH_COOKIE_KEY = "tm_auth";

export function saveAuth(user: User) {
  const payload = JSON.stringify(user);
  Cookies.set(AUTH_COOKIE_KEY, payload, { expires: 1 });
}

export function getAuth(): User | null {
  const value = Cookies.get(AUTH_COOKIE_KEY);
  if (!value) return null;
  try {
    return JSON.parse(value) as User;
  } catch {
    return null;
  }
}

export function clearAuth() {
  Cookies.remove(AUTH_COOKIE_KEY);
}
