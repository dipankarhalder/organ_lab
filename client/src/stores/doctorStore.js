import { create } from "zustand";

export const useDoctorStore = create((set) => ({
  isLoading: false,
  isDocData: [],
  detailsDoctor: "",

  setLoading: (loading) => set({ isLoading: loading }),
  setDocs: (dataInfo) => set({ isDocData: dataInfo }),
  setDetailsDoctor: (dataInfo) => set({ detailsDoctor: dataInfo }),
}));
