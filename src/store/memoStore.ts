import { create } from "zustand";

export const useMemoStore = create((set) => ({
  memos: [],
  addMemo: (text) =>
    set((state) => ({
      memos: [...state.memos, { id: Date.now(), text }],
    })),
  removeMemo: (id) =>
    set((state) => ({
      memos: state.memos.filter((m) => m.id !== id),
    })),
}));
