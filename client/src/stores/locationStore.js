import { create } from "zustand";
import { getServices } from "../services/core.services";
import { locationServices } from "../services/endpoints";

export const useLocationStore = create((set) => ({
  isLocationLoading: false,
  locationInformation: [],
  locationDetails: null,

  fetchLocations: async () => {
    set({ isLocationLoading: true });
    try {
      const res = await getServices(`${locationServices}/list`);
      const locations = res?.data?.data || [];
      set({ locationInformation: locations });
      localStorage.setItem("locations", JSON.stringify(locations));
    } catch (err) {
      console.error("Failed to fetch locations", err);
      set({ locationInformation: [] });
    } finally {
      set({ isLocationLoading: false });
    }
  },

  fetchDetailsLocation: async (id) => {
    try {
      const res = await getServices(`${locationServices}/${id}`);
      const locationInfo = res?.data?.data || null;
      set({ locationDetails: locationInfo });
    } catch (err) {
      console.error("Failed to fetch location details", err);
      set({ locationDetails: null });
    }
  },
}));
