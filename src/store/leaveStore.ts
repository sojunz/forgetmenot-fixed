import { create } from "zustand";
import { useAuthStore } from "./authStore";

interface LeaveItem {
  _id: string;
  text: string;
  checked: boolean;
}

interface LeaveStore {
  items: LeaveItem[];
  fetchItems: () => Promise<void>;
  addItem: (text: string) => Promise<void>;
  toggleItem: (id: string) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
}

const API = "http://localhost:8080";

export const useLeaveStore = create<LeaveStore>()((set) => ({
  items: [],

  fetchItems: async () => {
    const token = useAuthStore.getState().token;
    const res = await fetch(`${API}/api/leave`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    set({ items: data });
  },

  addItem: async (text) => {
    const token = useAuthStore.getState().token;
    const res = await fetch(`${API}/api/leave`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ text }),
    });
    const data = await res.json();
    set((state) => ({ items: [...state.items, data] }));
  },

  toggleItem: async (id) => {
    const token = useAuthStore.getState().token;
    const res = await fetch(`${API}/api/leave/${id}`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    set((state) => ({
      items: state.items.map((item) => (item._id === id ? data : item)),
    }));
  },

  removeItem: async (id) => {
    const token = useAuthStore.getState().token;
    await fetch(`${API}/api/leave/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    set((state) => ({
      items: state.items.filter((item) => item._id !== id),
    }));
  },
}));