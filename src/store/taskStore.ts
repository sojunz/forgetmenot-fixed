import { create } from "zustand";
import { apiFetch } from "../utils/api";

interface Task {
  _id: string;
  text: string;
  done: boolean;
}

interface TaskStore {
  tasks: Task[];
  fetchTasks: () => Promise<void>;
  addTask: (text: string) => Promise<void>;
  toggleTask: (id: string) => Promise<void>;
  removeTask: (id: string) => Promise<void>;
}

export const useTaskStore = create<TaskStore>()((set) => ({
  tasks: [],

  fetchTasks: async () => {
    const res = await apiFetch("/api/tasks");
    if (!res) return;
    const data = await res.json();
    set({ tasks: data });
  },

  addTask: async (text) => {
    const res = await apiFetch("/api/tasks", {
      method: "POST",
      body: JSON.stringify({ text }),
    });
    if (!res) return;
    const data = await res.json();
    set((state) => ({ tasks: [...state.tasks, data] }));
  },

  toggleTask: async (id) => {
    const res = await apiFetch(`/api/tasks/${id}`, { method: "PATCH" });
    if (!res) return;
    const data = await res.json();
    set((state) => ({
      tasks: state.tasks.map((t) => (t._id === id ? data : t)),
    }));
  },

  removeTask: async (id) => {
    await apiFetch(`/api/tasks/${id}`, { method: "DELETE" });
    set((state) => ({ tasks: state.tasks.filter((t) => t._id !== id) }));
  },
}));