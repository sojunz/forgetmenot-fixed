import { create } from "zustand";
import { apiFetch } from "../utils/api";

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

export const useLeaveStore = create<LeaveStore>()((set) => ({
  items: [],

  fetchItems: async () => {
    const res = await apiFetch("/api/leave");
    if (!res) return;
    const data = await res.json();
    set({ items: data });
  },

  addItem: async (text) => {
    const res = await apiFetch("/api/leave", {
      method: "POST",
      body: JSON.stringify({ text }),
    });
    if (!res) return;
    const data = await res.json();
    set((state) => ({ items: [...state.items, data] }));
  },

  toggleItem: async (id) => {
    const res = await apiFetch(`/api/leave/${id}`, { method: "PATCH" });
    if (!res) return;
    const data = await res.json();
    set((state) => ({
      items: state.items.map((item) => (item._id === id ? data : item)),
    }));
  },

  removeItem: async (id) => {
    await apiFetch(`/api/leave/${id}`, { method: "DELETE" });
    set((state) => ({
      items: state.items.filter((item) => item._id !== id),
    }));
  },
}));