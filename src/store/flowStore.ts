import { create } from "zustand";
import { apiFetch } from "../utils/api";

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

export const useFlowStore = create<FlowStore>()((set, get) => ({
  categories: [],

  fetchCategories: async () => {
    const res = await apiFetch("/api/categories");
    if (!res) return;
    const data = await res.json();
    set({ categories: data });
  },

  addCategory: async (name) => {
    const res = await apiFetch("/api/categories", {
      method: "POST",
      body: JSON.stringify({ name }),
    });
    if (!res) return;
    const data = await res.json();
    set((state) => ({ categories: [...state.categories, data] }));
  },

  deleteCategories: async (ids) => {
    await Promise.all(
      ids.map((id) => apiFetch(`/api/categories/${id}`, { method: "DELETE" }))
    );
    set((state) => ({
      categories: state.categories.filter((cat) => !ids.includes(cat._id)),
    }));
  },

  renameCategory: async (id, newName) => {
    const res = await apiFetch(`/api/categories/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ name: newName }),
    });
    if (!res) return;
    const data = await res.json();
    set((state) => ({
      categories: state.categories.map((cat) => cat._id === id ? data : cat),
    }));
  },

  addMemoToCategory: async (categoryName, memoText) => {
    const category = get().categories.find((c) => c.name === categoryName);
    if (!category) return;
    const res = await apiFetch(`/api/categories/${category._id}/memos`, {
      method: "POST",
      body: JSON.stringify({ text: memoText }),
    });
    if (!res) return;
    const data = await res.json();
    set((state) => ({
      categories: state.categories.map((cat) =>
        cat._id === category._id ? data : cat
      ),
    }));
  },

  removeMemoFromCategory: async (categoryName, memoText) => {
    const category = get().categories.find((c) => c.name === categoryName);
    if (!category) return;
    const res = await apiFetch(`/api/categories/${category._id}/memos`, {
      method: "DELETE",
      body: JSON.stringify({ text: memoText }),
    });
    if (!res) return;
    const data = await res.json();
    set((state) => ({
      categories: state.categories.map((cat) =>
        cat._id === category._id ? data : cat
      ),
    }));
  },
}));