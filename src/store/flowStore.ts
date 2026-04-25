import { create } from "zustand";
import { useAuthStore } from "./authStore";

interface Category {
  _id: string;
  name: string;
  memos: string[];
}

interface FlowStore {
  categories: Category[];
  fetchCategories: () => Promise<void>;
  addCategory: (name: string) => Promise<void>;
  deleteCategories: (ids: string[]) => Promise<void>;
  renameCategory: (id: string, newName: string) => Promise<void>;
  addMemoToCategory: (categoryName: string, memoText: string) => Promise<void>;
  removeMemoFromCategory: (categoryName: string, memoText: string) => Promise<void>;
}

const API = "http://localhost:8080";

export const useFlowStore = create<FlowStore>()((set, get) => ({
  categories: [],

  fetchCategories: async () => {
    const token = useAuthStore.getState().token;
    const res = await fetch(`${API}/api/categories`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    set({ categories: data });
  },

  addCategory: async (name) => {
    const token = useAuthStore.getState().token;
    const res = await fetch(`${API}/api/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name }),
    });
    const data = await res.json();
    set((state) => ({ categories: [...state.categories, data] }));
  },

  deleteCategories: async (ids) => {
    const token = useAuthStore.getState().token;
    await Promise.all(
      ids.map((id) =>
        fetch(`${API}/api/categories/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        })
      )
    );
    set((state) => ({
      categories: state.categories.filter((cat) => !ids.includes(cat._id)),
    }));
  },

  renameCategory: async (id, newName) => {
    const token = useAuthStore.getState().token;
    const res = await fetch(`${API}/api/categories/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: newName }),
    });
    const data = await res.json();
    set((state) => ({
      categories: state.categories.map((cat) =>
        cat._id === id ? data : cat
      ),
    }));
  },

  addMemoToCategory: async (categoryName, memoText) => {
    const token = useAuthStore.getState().token;
    const category = get().categories.find((c) => c.name === categoryName);
    if (!category) return;
    const res = await fetch(`${API}/api/categories/${category._id}/memos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ text: memoText }),
    });
    const data = await res.json();
    set((state) => ({
      categories: state.categories.map((cat) =>
        cat._id === category._id ? data : cat
      ),
    }));
  },

  removeMemoFromCategory: async (categoryName, memoText) => {
    const token = useAuthStore.getState().token;
    const category = get().categories.find((c) => c.name === categoryName);
    if (!category) return;
    const res = await fetch(`${API}/api/categories/${category._id}/memos`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ text: memoText }),
    });
    const data = await res.json();
    set((state) => ({
      categories: state.categories.map((cat) =>
        cat._id === category._id ? data : cat
      ),
    }));
  },
}));