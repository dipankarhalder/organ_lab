import { create } from "zustand";
import { getServices } from "../services/core.services";
import { baseUrl, patientServices } from "../services/endpoints";

export const usePatientStore = create((set) => ({
  isPatientLoading: false,
  patientListData: [],
  detailsPatient: "",

  setLoading: (loading) => set({ isLoading: loading }),
  setPatients: (dataInfo) => set({ isPatientData: dataInfo }),
  setDetailsPatient: (dataInfo) => set({ detailsPatient: dataInfo }),

  fetchPatientLists: async () => {
    const userLocate = localStorage.getItem("locate");
    set({ isPatientLoading: true });
    try {
      const res = await getServices(
        `${baseUrl}/${userLocate}${patientServices}/list`
      );
      const patients = res?.data?.data || [];
      set({ patientListData: patients });
    } catch (err) {
      console.error("Failed to fetch locations", err);
      set({ locationInformation: [] });
    } finally {
      set({ isPatientLoading: false });
    }
  },
}));
