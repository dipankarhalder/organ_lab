import { axiosInstance } from "./base.config";

export const postServices = async (url, payload) => {
  try {
    const res = await axiosInstance.post(url, payload);
    return {
      success: true,
      data: res.data,
      status: res.status,
    };
  } catch (error) {
    return {
      success: false,
      data: (error.response && error.response.data) || {
        message: "Unknown error",
      },
      status: (error.response && error.response.status) || 500,
    };
  }
};

export const getServices = async (url) => {
  try {
    const res = await axiosInstance.get(url);
    return {
      success: true,
      data: res.data,
      status: res.status,
    };
  } catch (error) {
    return {
      success: false,
      data: (error.response && error.response.data) || {
        message: "Unknown error",
      },
      status: (error.response && error.response.status) || 500,
    };
  }
};

export const patchServices = async (url, payload) => {
  try {
    const res = await axiosInstance.patch(url, payload);
    return {
      success: true,
      data: res.data,
      status: res.status,
    };
  } catch (error) {
    return {
      success: false,
      data: (error.response && error.response.data) || {
        message: "Unknown error",
      },
      status: (error.response && error.response.status) || 500,
    };
  }
};

export const deleteServices = async (url) => {
  try {
    const res = await axiosInstance.delete(url);
    return {
      success: true,
      data: res.data,
      status: res.status,
    };
  } catch (error) {
    return {
      success: false,
      data: (error.response && error.response.data) || {
        message: "Unknown error",
      },
      status: (error.response && error.response.status) || 500,
    };
  }
};
