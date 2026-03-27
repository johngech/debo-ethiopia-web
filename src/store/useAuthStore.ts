import { create } from "zustand";
import { authService, type LoginRequest } from "../api/authService";
import { exceptionHandler } from "../api/ExceptionHandler";
import { tokenManager } from "../api/TokenManager";

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: any) => Promise<void>;
  logout: () => Promise<void>;
  register: <T>(userData: T) => Promise<void>;
  requestPasswordReset: (email: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  isAuthenticated: tokenManager.isAuthenticated(),
  isLoading: false,
  register: async <T>(userData: T) => {
    set({ isLoading: true });
    try {
      await authService.register(userData);
      // Optional: Auto-login logic could go here if your backend returns tokens on register
      exceptionHandler.emit({
        message: "Registration successful! Please login.",
        type: "info",
      });
    } finally {
      set({ isLoading: false });
    }
  },
  requestPasswordReset: async (email: string) => {
    set({ isLoading: true });
    try {
      await authService.resetPassword(email);
    } finally {
      set({ isLoading: false });
    }
  },
  login: async (credentials: LoginRequest) => {
    set({ isLoading: true });
    try {
      await authService.login(credentials);
      set({ isLoading: false });
    } catch (error) {
      set({
        isAuthenticated: false,
      });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      await authService.logout();
    } finally {
      set({
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },
}));
