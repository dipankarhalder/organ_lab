import { postServices } from "./core.services";
import { authServices } from "./endpoints";

export const refreshAccessToken = async () => {
  const res = await postServices(`${authServices}/refresh-token`, {});

  if (res.success && res.data.accessToken) {
    localStorage.setItem("token", res.data.accessToken);
    return res.data.accessToken;
  }

  throw new Error("Refresh token expired or invalid");
};
