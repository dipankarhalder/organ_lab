import { create } from 'zustand';
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthState = {
  isAuthenticated: boolean;
  setAuthenticated: (value: boolean) => void;
  login: () => void;
  logout: () => void;
  hydrate: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  setAuthenticated: (value) => {
    set({ isAuthenticated: value });
    AsyncStorage.setItem("isAuthenticated", value ? "true" : "false");
  },
  login: () => {
    set({ isAuthenticated: true });
    AsyncStorage.setItem("isAuthenticated", "true");
  },

  logout: () => {
    set({ isAuthenticated: false });
    AsyncStorage.setItem("isAuthenticated", "false");
  },
  hydrate: async () => {
    const auth = await AsyncStorage.getItem("isAuthenticated");
    set({ isAuthenticated: auth === "true" });
  },
}));