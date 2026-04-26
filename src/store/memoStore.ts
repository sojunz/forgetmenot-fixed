import { create } from "zustand";
import { apiFetch } from "../utils/api";

interface Memo {
  _id: string;
  text: string;
  createdAt: string;
}

interface MemoStore {
  memos: Memo[];
  fetchMemos: () => Promise<void>;
  addMemo: (text: string) => Promise<void>;
  removeMemo: (id: string) => Promise<void>;
}

export const useMemoStore = create<MemoStore>()((set) => ({
  memos: [],

  fetchMemos: async () => {
    const res = await apiFetch("/api/memos");
    if (!res) return;
    const data = await res.json();
    set({ memos: data });
  },

  addMemo: async (text) => {
    const res = await apiFetch("/api/memos", {
      method: "POST",
      body: JSON.stringify({ text }),
    });
    if (!res) return;
    const data = await res.json();
    set((state) => ({ memos: [...state.memos, data] }));
  },

  removeMemo: async (id) => {
    await apiFetch(`/api/memos/${id}`, { method: "DELETE" });
    set((state) => ({ memos: state.memos.filter((m) => m._id !== id) }));
  },
}));