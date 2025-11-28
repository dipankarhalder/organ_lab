import { create } from "zustand";

export const useCategoryStore = create((set) => ({
  isLoading: false,
  categoryList: [],

  setLoading: (loading) => set({ isLoading: loading }),
  setCategories: (dataInfo) => set({ categoryList: dataInfo }),
}));
