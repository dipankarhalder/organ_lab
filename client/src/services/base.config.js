import axios from "axios";
import { paths } from "../routers/links";
import { apiUrl } from "./baseUrl";
import { refreshApi } from "./endpoints";
import { refreshAccessToken } from "./authextra.services";
import { useAuthStore } from "../stores/authStore";

export const axiosInstance = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
});

const token = localStorage.getItem("token");
if (token) {
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    const authExcludedRoutes = [
      paths.login,
      paths.register,
      paths.forgot,
      paths.createpassword,
    ];

    const isAuthExcluded = authExcludedRoutes.some((route) =>
      config.url.includes(route)
    );
    if (token && !isAuthExcluded) {
      console.log("Adding token to request:", token);
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

let isRefreshing = false;
let failedQueue = [];
const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const isAuthError =
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry &&
      !originalRequest.url.includes(refreshApi);

    if (!isAuthError) return Promise.reject(error);
    originalRequest._retry = true;

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: (token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(axiosInstance(originalRequest));
          },
          reject,
        });
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const newToken = await refreshAccessToken();
      if (!newToken) {
        throw new Error("Token refresh failed");
      }

      axiosInstance.defaults.headers.common.Authorization = `Bearer ${newToken}`;
      originalRequest.headers.Authorization = `Bearer ${newToken}`;

      processQueue(null, newToken);
      return axiosInstance(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null);
      const logout = useAuthStore.getState().logout;
      logout();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);
