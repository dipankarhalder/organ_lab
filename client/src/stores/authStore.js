import { create } from "zustand";
import { toastStatus } from "../constant";
import { authServices } from "../services/endpoints";
import { axiosInstance } from "../services/base.config";
import { postServices } from "../services/core.services";
import { handleApiErrorToast } from "../utils/handleApiErrorToast";

export const useAuthStore = create((set, get) => ({
  isAuthLoading: false,
  isLoadLogout: false,
  logoutRequested: false,
  isRole: localStorage.getItem("role") || null,
  isToken: localStorage.getItem("token") || null,
  isLocate: localStorage.getItem("locate") || null,
  isApprove: localStorage.getItem("approve") || null,

  setLoading: (loading) => set({ isAuthLoading: loading }),
  setRole: (role) => {
    localStorage.setItem("role", role);
    set({ isRole: role });
  },
  setApprove: (status) => {
    localStorage.setItem("approve", status);
    set({ isApprove: status });
  },
  setToken: (token) => {
    localStorage.setItem("token", token);
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    set({ isToken: token });
  },
  setLocate: (locate) => {
    localStorage.setItem("locate", locate);
    set({ isLocate: locate });
  },

  setLoadLogout: (logoutInfo) => set({ isLoadLogout: logoutInfo }),
  setLogoutRequested: (value) => set({ logoutRequested: value }),

  // logout or signout
  logout: async () => {
    localStorage.clear();
    set({
      isToken: null,
      isRole: null,
      isApprove: null,
      isAuthLoading: false,
      isLoadLogout: false,
      logoutRequested: false,
    });
    setTimeout(() => (window.location.href = "/"), 3000);
  },

  // login or signin
  signin: async (payload, addToast) => {
    set({ isAuthLoading: true });
    try {
      const res = await postServices(`${authServices}/signin`, payload);
      const isError = await handleApiErrorToast(res, addToast, toastStatus);
      if (isError) return { success: false };

      get().setRole(res.data.role);
      get().setLocate(res.data.location);
      get().setToken(res.data.accessToken);
      get().setApprove(res.data.isApproved);

      await addToast({
        type: toastStatus.SUCCESS,
        title: "Success",
        description: res.data.message,
      });

      return { success: true };
    } catch (err) {
      console.error(err);
      return { success: false };
    } finally {
      set({ isAuthLoading: false });
    }
  },

  // registration or sign up
  signup: async (payload, addToast) => {
    set({ isAuthLoading: true });
    try {
      const res = await postServices(`${authServices}/signup`, payload);
      const isError = await handleApiErrorToast(res, addToast, toastStatus);
      if (isError) return { success: false };

      get().setRole(res.data.role);
      get().setLocate(res.data.location);
      get().setToken(res.data.accessToken);
      get().setApprove(res.data.isApproved);

      await addToast({
        type: toastStatus.SUCCESS,
        title: "Success",
        description: res.data.message,
      });

      return { success: true };
    } catch (err) {
      console.error(err);
      return { success: false };
    } finally {
      set({ isAuthLoading: false });
    }
  },
}));
