import { create } from "zustand";

interface ColorSchemeState {
  isDarkMode: boolean;
  setDarkMode: (isDarkMode: boolean) => void;
}

export const useColorSchemeStore = create<ColorSchemeState>((set) => ({
  isDarkMode:
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches,
  setDarkMode: (isDarkMode: boolean) => set({ isDarkMode }),
}));
