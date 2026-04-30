import { create } from "zustand";
import { apiFetch } from "../utils/api";

interface Diary {
  _id: string;
  mood: string;
  content: string;
  date: string;
  createdAt: string;
}

interface DiaryStore {
  diaries: Diary[];
  fetchDiaries: () => Promise<void>;
  addDiary: (mood: string, content: string, date: string) => Promise<void>;
  updateDiary: (id: string, mood: string, content: string) => Promise<void>;
  deleteDiary: (id: string) => Promise<void>;
}

export const useDiaryStore = create<DiaryStore>()((set) => ({
  diaries: [],

  fetchDiaries: async () => {
    const res = await apiFetch("/api/diary");
    if (!res) return;
    const data = await res.json();
    set({ diaries: data });
  },

  addDiary: async (mood, content, date) => {
    const res = await apiFetch("/api/diary", {
      method: "POST",
      body: JSON.stringify({ mood, content, date }),
    });
    if (!res) return;
    const data = await res.json();
    set((state) => ({ diaries: [data, ...state.diaries] }));
  },

  updateDiary: async (id, mood, content) => {
    const res = await apiFetch(`/api/diary/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ mood, content }),
    });
    if (!res) return;
    const data = await res.json();
    set((state) => ({
      diaries: state.diaries.map((d) => (d._id === id ? data : d)),
    }));
  },

  deleteDiary: async (id) => {
    await apiFetch(`/api/diary/${id}`, { method: "DELETE" });
    set((state) => ({
      diaries: state.diaries.filter((d) => d._id !== id),
    }));
  },
}));