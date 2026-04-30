import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ThemeStore {
  isDark: boolean;
  toggleDark: () => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      isDark: false,

      toggleDark: () => {
        const newDark = !get().isDark;
        set({ isDark: newDark });
        if (newDark) {
          document.body.classList.add("dark");
        } else {
          document.body.classList.remove("dark");
        }
      },
    }),
    { name: "theme-storage" }
  )
);