import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Category {
  name: string;
  count: number;
  memos: string[];
}

interface FlowStore {
  categories: Category[];

  setCategories: (newCats: Category[]) => void;
  addCategory: (name: string) => void;
  deleteCategories: (names: string[]) => void;
  renameCategory: (oldName: string, newName: string) => void;

  increaseCategoryCount: (categoryName: string) => void;
  addMemoToCategory: (categoryName: string, memoText: string) => void;
  removeMemoFromCategory: (categoryName: string, memoText: string) => void;
}

export const useFlowStore = create<FlowStore>()(
  persist(
    (set) => ({
      categories: [
        { name: "Household", count: 5, memos: [] },
        { name: "Ideas", count: 12, memos: [] },
        { name: "Shopping", count: 3, memos: [] },
        { name: "Emotions", count: 7, memos: [] },
      ],

      setCategories: (newCats) => set({ categories: newCats }),

      addCategory: (name) =>
        set((state) => ({
          categories: [...state.categories, { name, count: 0, memos: [] }],
        })),

      deleteCategories: (names) =>
        set((state) => ({
          categories: state.categories.filter(
            (cat) => !names.includes(cat.name)
          ),
        })),

      renameCategory: (oldName, newName) =>
        set((state) => ({
          categories: state.categories.map((cat) =>
            cat.name === oldName ? { ...cat, name: newName } : cat
          ),
        })),

      increaseCategoryCount: (categoryName) =>
        set((state) => ({
          categories: state.categories.map((c) =>
            c.name === categoryName ? { ...c, count: c.count + 1 } : c
          ),
        })),

      addMemoToCategory: (categoryName, memoText) =>
        set((state) => ({
          categories: state.categories.map((c) =>
            c.name === categoryName
              ? { ...c, memos: [...c.memos, memoText] }
              : c
          ),
        })),

      removeMemoFromCategory: (categoryName, memoText) =>
        set((state) => ({
          categories: state.categories.map((c) =>
            c.name === categoryName
              ? {
                  ...c,
                  memos: c.memos.filter((m) => m !== memoText),
                  count: c.count - 1,
                }
              : c
          ),
        })),
    }),
    {
      name: "flow-storage",
    }
  )
);
