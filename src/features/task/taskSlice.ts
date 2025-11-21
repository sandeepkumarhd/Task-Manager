import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
export interface Task {
  id: string;
  title: string;
  description: string;
  userId: string;
  createdOn: string;
  createdBy: string;
  status: string;
}
export const LOCAL_KEY = "tasks";
interface TaskState {
  tasks: Task[];
}

const loadTasks = (): Task[] => {
  try {
    const saved = localStorage.getItem(LOCAL_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    console.error("Failed to load tasks:", e);
    return [];
  }
};
const initialState: TaskState = {
  tasks: loadTasks(),
};

const saveTasks = (tasks: Task[]) => {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(tasks));
};

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Omit<Task, "id">>) => {
      const newTasks: Task = {
        id: crypto.randomUUID(),
        ...action.payload,
      };
      state.tasks.push(newTasks);
      saveTasks(state.tasks);
    },
    updateTaskStatus: (state, action: PayloadAction<{ taskId: string }>) => {
      const { taskId } = action.payload;
      state.tasks = state.tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: "Done",
              updatedOn: new Date().toISOString(),
            }
          : task
      );
      saveTasks(state.tasks);
    },

    editTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
        saveTasks(state.tasks);
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
      saveTasks(state.tasks);
    },
    clearAllTasks: (state) => {
      state.tasks = [];
      saveTasks(state.tasks);
    },
  },
});

export const {
  addTask,
  editTask,
  deleteTask,
  clearAllTasks,
  updateTaskStatus,
} = taskSlice.actions;

export default taskSlice.reducer;
