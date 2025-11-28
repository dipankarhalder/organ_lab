import { useContext, useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routers";
import { useAuthStore } from "./stores/authStore";
import { useProfileStore } from "./stores/profileStore";
import { useLocationStore } from "./stores/locationStore";
import { useTokenExpiryWatcher } from "./hooks/useTokenExpiryWatcher";
import { PopModal } from "./shared/PopModel";
import { toastStatus } from "./constant";
import { authServices } from "./services/endpoints";
import { postServices } from "./services/core.services";
import { handleApiErrorToast } from "./utils/handleApiErrorToast";
import { ToastContext } from "./shared/toast/context/ToastContext";

export const App = () => {
  const { addToast } = useContext(ToastContext);
  const { fetchLocations } = useLocationStore();
  const {
    logoutRequested,
    setLoadLogout,
    setLogoutRequested,
    logout,
    isToken,
    isRole,
  } = useAuthStore();
  const { fetchProfile } = useProfileStore();
  const { showWarning, setShowWarning } = useTokenExpiryWatcher();

  const handleLogout = async () => {
    setLoadLogout(true);

    try {
      const res = await postServices(`${authServices}/signout`, {});
      const isError = await handleApiErrorToast(res, addToast, toastStatus);
      if (isError) return;

      await addToast({
        type: toastStatus.SUCCESS,
        title: "Success",
        description: res.data.message,
      });

      await logout();
    } finally {
      setLoadLogout(false);
    }
  };

  /* called location API */
  useEffect(() => {
    fetchLocations();
  }, [fetchLocations]);

  /* called profile API */
  useEffect(() => {
    if (isToken && isRole) {
      fetchProfile();
    }
  }, [isToken, isRole, fetchProfile]);

  return (
    <>
      {logoutRequested && (
        <PopModal
          title="Logout Confirmation"
          onCancelText="Cancel"
          onCancel={() => {
            setLogoutRequested(false);
          }}
          confirmText="Yes, Logout"
          onConfirm={() => handleLogout()}
        >
          <p>Are you sure you want to logout?</p>
        </PopModal>
      )}

      {showWarning && (
        <PopModal
          title="Session Expiring Soon"
          confirmText="Logout Now"
          onConfirm={() => {
            setShowWarning(false);
            setLogoutRequested(true);
          }}
        >
          <p>
            Your session will expire in 5 minutes.
            <br />
            Do you want to stay logged in?
          </p>
        </PopModal>
      )}

      <RouterProvider router={router} />
    </>
  );
};
