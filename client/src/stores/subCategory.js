import { create } from "zustand";

export const useSubCategoryStore = create((set) => ({
  isLoading: false,
  subCateList: [],

  setLoading: (loading) => set({ isLoading: loading }),
  setSubCategories: (dataInfo) => set({ subCateList: dataInfo }),
}));
