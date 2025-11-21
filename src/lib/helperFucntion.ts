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

export function formatDateCustom(isoString: string): string {
  if (!isoString) return "NA";
  const date = new Date(isoString);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const day = date.getDate().toString().padStart(2, "0");
  const monthName = months[date.getMonth()];
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");

  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // convert 0 → 12
  const formattedHours = hours.toString().padStart(2, "0");

  return `${day} ${monthName} ${year} , ${formattedHours}:${minutes} ${ampm}`;
}
