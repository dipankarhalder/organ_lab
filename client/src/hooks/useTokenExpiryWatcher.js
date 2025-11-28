import { useEffect, useState } from "react";
import { useAuthStore } from "../stores/authStore";

export const useTokenExpiryWatcher = () => {
  const { isToken, logoutRequested, setLogoutRequested } = useAuthStore();
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    if (!isToken) return;

    let warningTimer;
    let logoutTimer;

    try {
      const payload = JSON.parse(atob(isToken.split(".")[1]));
      const expiryTime = payload.exp * 1000;
      const now = Date.now();
      const timeLeft = expiryTime - now;
      if (timeLeft <= 0) {
        if (!logoutRequested) setLogoutRequested(true);
        return;
      }

      const warningTime = 5 * 60 * 1000;
      const warningDelay = timeLeft - warningTime;
      if (warningDelay > 0) {
        warningTimer = setTimeout(() => setShowWarning(true), warningDelay);
      }

      logoutTimer = setTimeout(() => {
        if (!logoutRequested) setLogoutRequested(true);
      }, timeLeft);
    } catch (err) {
      console.error("Token decode failed", err);
      setLogoutRequested(true);
    }

    return () => {
      clearTimeout(warningTimer);
      clearTimeout(logoutTimer);
    };
  }, [isToken, logoutRequested, setLogoutRequested]);

  return { showWarning, setShowWarning };
};
