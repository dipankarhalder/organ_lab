import { create } from "zustand";

export const useLabDoctorStore = create((set) => ({
  isLoading: false,
  labDoctorList: [],

  setLoading: (loading) => set({ isLoading: loading }),
  setLabDoctors: (dataInfo) => set({ labDoctorList: dataInfo }),
}));
