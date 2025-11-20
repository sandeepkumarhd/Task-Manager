import type { Task, TaskStatus } from "@/types/types";
import { useEffect, useMemo, useState } from "react";

function makeKey(email: string) {
  return `tm_tasks_${email}`;
}

type SortOption = "latest" | "oldest";

export function useTasks() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<TaskStatus | "all">("all");
  const [sort, setSort] = useState<SortOption>("latest");

  useEffect(() => {
    if (!user) return;
    const key = makeKey(user.email);
    const raw = localStorage.getItem(key);
    if (raw) {
      try {
        setTasks(JSON.parse(raw));
      } catch {
        setTasks([]);
      }
    }
  }, [user]);

  useEffect(() => {
    if (!user) return;
    const key = makeKey(user.email);
    localStorage.setItem(key, JSON.stringify(tasks));
  }, [tasks, user]);

  function addTask(input: { title: string; description: string }) {
    if (!user) return;
    const now = new Date().toISOString();
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: input.title.trim(),
      description: input.description.trim(),
      status: "pending",
      createdAt: now,
      updatedAt: now,
      createdBy: user.id,
    };
    setTasks((prev) => [newTask, ...prev]);
  }

  function updateTask(
    id: string,
    updates: Partial<Pick<Task, "title" | "description" | "status">>
  ) {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, ...updates, updatedAt: new Date().toISOString() }
          : t
      )
    );
  }

  function deleteTask(id: string) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  function toggleStatus(id: string) {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              status: t.status === "pending" ? "done" : "pending",
              updatedAt: new Date().toISOString(),
            }
          : t
      )
    );
  }

  const filteredTasks = useMemo(() => {
    let result = [...tasks];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((t) => t.title.toLowerCase().includes(q));
    }

    if (statusFilter !== "all") {
      result = result.filter((t) => t.status === statusFilter);
    }

    result.sort((a, b) => {
      const da = new Date(a.createdAt).getTime();
      const db = new Date(b.createdAt).getTime();
      return sort === "latest" ? db - da : da - db;
    });

    return result;
  }, [tasks, search, statusFilter, sort]);

  return {
    tasks,
    filteredTasks,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    sort,
    setSort,
    addTask,
    updateTask,
    deleteTask,
    toggleStatus,
  };
}
