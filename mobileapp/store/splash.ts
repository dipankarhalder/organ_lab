import { create } from 'zustand';
import AsyncStorage from "@react-native-async-storage/async-storage";

interface SplashState {
  hasSeenSplash: boolean;
  setHasSeenSplash: (value: boolean) => void;
  hydrate: () => Promise<void>;
}

export const useSplashStore = create<SplashState>((set) => ({
  hasSeenSplash: false,
  setHasSeenSplash: (value) => {
    set({ hasSeenSplash: value });
    AsyncStorage.setItem("hasSeenSplash", value ? "true" : "false");
  },
  hydrate: async () => {
    const seen = await AsyncStorage.getItem("hasSeenSplash");
    set({ hasSeenSplash: seen === "true" });
  },
}));
