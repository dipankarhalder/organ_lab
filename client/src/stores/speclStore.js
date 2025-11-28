import { create } from "zustand";

export const useSpeclStore = create((set) => ({
  isLoading: false,
  isSpeclData: [],

  setLoading: (loading) => set({ isLoading: loading }),
  setSpcl: (dataInfo) => set({ isSpeclData: dataInfo }),
}));
