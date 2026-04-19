import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Memo {
  id: number;
  text: string;
}

interface MemoStore {
  memos: Memo[];
  addMemo: (text: string) => void;
  removeMemo: (id: number) => void;
}

export const useMemoStore = create<MemoStore>()(
  persist(
    (set) => ({
      memos: [],

      addMemo: (text) =>
        set((state) => ({
          memos: [...state.memos, { id: Date.now(), text }],
        })),

      removeMemo: (id) =>
        set((state) => ({
          memos: state.memos.filter((m) => m.id !== id),
        })),
    }),
    {
      name: "memo-storage",
    }
  )
);
