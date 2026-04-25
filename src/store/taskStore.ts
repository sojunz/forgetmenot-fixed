import { create } from "zustand";
import { useAuthStore } from "./authStore";

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

const API = "http://localhost:8080";

export const useTaskStore = create<TaskStore>()((set) => ({
  tasks: [],

  fetchTasks: async () => {
    const token = useAuthStore.getState().token;
    const res = await fetch(`${API}/api/tasks`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    set({ tasks: data });
  },

  addTask: async (text) => {
    const token = useAuthStore.getState().token;
    const res = await fetch(`${API}/api/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ text }),
    });
    const data = await res.json();
    set((state) => ({ tasks: [...state.tasks, data] }));
  },

  toggleTask: async (id) => {
    const token = useAuthStore.getState().token;
    const res = await fetch(`${API}/api/tasks/${id}`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    set((state) => ({
      tasks: state.tasks.map((t) => (t._id === id ? data : t)),
    }));
  },

  removeTask: async (id) => {
    const token = useAuthStore.getState().token;
    await fetch(`${API}/api/tasks/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    set((state) => ({ tasks: state.tasks.filter((t) => t._id !== id) }));
  },
}));