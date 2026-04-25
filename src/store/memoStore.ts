import { create } from "zustand";
import { useAuthStore } from "./authStore";

interface Memo {
  _id: string;
  text: string;
}

interface MemoStore {
  memos: Memo[];
  fetchMemos: () => Promise<void>;
  addMemo: (text: string) => Promise<void>;
  removeMemo: (id: string) => Promise<void>;
}

const API = "http://localhost:8080";

export const useMemoStore = create<MemoStore>()((set) => ({
  memos: [],

  fetchMemos: async () => {
    const token = useAuthStore.getState().token;
    const res = await fetch(`${API}/api/memos`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    set({ memos: data });
  },

  addMemo: async (text) => {
    const token = useAuthStore.getState().token;
    const res = await fetch(`${API}/api/memos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ text }),
    });
    const data = await res.json();
    set((state) => ({ memos: [...state.memos, data] }));
  },

  removeMemo: async (id) => {
    const token = useAuthStore.getState().token;
    await fetch(`${API}/api/memos/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    set((state) => ({ memos: state.memos.filter((m) => m._id !== id) }));
  },
}));