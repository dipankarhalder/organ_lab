import { useEffect, useRef } from "react";
import { useAuthStore } from "../stores/authStore";

export const useIdleTimer = (timeout = 15 * 60 * 1000) => {
  const timerRef = useRef(null);
  const { logoutRequested, setLogoutRequested } = useAuthStore();

  useEffect(() => {
    const resetTimer = () => {
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        if (!logoutRequested) {
          setLogoutRequested(true);
        }
      }, timeout);
    };

    const events = ["mousemove", "keydown", "click", "scroll", "touchstart"];
    events.forEach((event) => window.addEventListener(event, resetTimer));
    resetTimer();

    return () => {
      clearTimeout(timerRef.current);
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, [logoutRequested, setLogoutRequested, timeout]);
};
