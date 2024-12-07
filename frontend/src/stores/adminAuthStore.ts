import { create } from "zustand";

interface AdminAuthState {
  isAdminAuthenticated: boolean;
  adminLogin: (token: string) => void;
  adminLogout: () => void;
  setAdminAuthenticated: (isAdminAuthenticated: boolean) => void;
}

export const useAdminAuthStore = create<AdminAuthState>((set) => ({
  isAdminAuthenticated: localStorage.getItem("adminToken") ? true : false,
  adminLogin: (token: string) => {
    localStorage.setItem("adminToken", token);
    set({ isAdminAuthenticated: true });
  },
  adminLogout: () => {
    localStorage.removeItem("adminToken");
    set({ isAdminAuthenticated: false });
  },
  setAdminAuthenticated: (isAdminAuthenticated: boolean) => {
    set({ isAdminAuthenticated });
  },
}));
