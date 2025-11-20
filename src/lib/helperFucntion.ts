import { TASKS_STORAGE_KEY } from "@/App";
import type { Task } from "@/types/types";

export function saveTasksToStorage(newTasks: Task) {
  try {
    const raw = localStorage.getItem(TASKS_STORAGE_KEY);
    const existing = raw ? JSON.parse(raw) : [];
    const merged = Array.isArray(existing)
      ? [...existing, newTasks]
      : [newTasks];
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(merged));
  } catch (e) {
    console.error("Failed to save tasks:", e);
  }
}
