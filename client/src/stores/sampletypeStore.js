import { create } from "zustand";

export const useSampleTypeStore = create((set) => ({
  isLoading: false,
  isSampleData: [],
  detailsSample: "",

  setLoading: (loading) => set({ isLoading: loading }),
  setSampleType: (data) => set({ isSampleData: data }),
  setDetailsSampleType: (data) => set({ detailsSample: data }),
}));
