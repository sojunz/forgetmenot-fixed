import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LeaveItem {
  id: number;
  text: string;
  checked: boolean;
}

interface LeaveStore {
  items: LeaveItem[];
  addItem: (text: string) => void;
  toggleItem: (id: number) => void;
  removeItem: (id: number) => void;
}

export const useLeaveStore = create<LeaveStore>()(
  persist(
    (set) => ({
      items: [
        { id: 1, text: "Keys", checked: false },
        { id: 2, text: "Wallet", checked: false },
        { id: 3, text: "Phone", checked: false },
      ],

      addItem: (text) =>
        set((state) => ({
          items: [...state.items, { id: Date.now(), text, checked: false }],
        })),

      toggleItem: (id) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, checked: !item.checked } : item
          ),
        })),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
    }),
    { name: "leave-storage" }
  )
);