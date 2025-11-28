import { create } from "zustand";
import { baseUrl, profileServices } from "../services/endpoints";
import { getServices } from "../services/core.services";

export const useProfileStore = create((set) => ({
  isProfileLoading: false,
  profileInformation: "",
  isLoadingListUser: false,
  userListInformation: [],

  fetchProfile: async () => {
    const userLocate = localStorage.getItem("locate");
    set({ isProfileLoading: true });
    try {
      const res = await getServices(
        `${baseUrl}/${userLocate}${profileServices}/me`
      );
      const profile = res?.data?.data;
      set({ profileInformation: profile });
      if (profile) {
        localStorage.setItem("userProfile", JSON.stringify(profile));
      }
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    } finally {
      set({ isProfileLoading: false });
    }
  },

  fetchUsersList: async () => {
    const userLocate = localStorage.getItem("locate");
    set({ isLoadingListUser: true });
    try {
      const res = await getServices(
        `${baseUrl}/${userLocate}${profileServices}/list`
      );
      set({ userListInformation: res?.data?.data || [] });
    } catch (error) {
      console.error("Failed to fetch users:", error);
      set({ userListInformation: [] });
    } finally {
      set({ isLoadingListUser: false });
    }
  },
}));
