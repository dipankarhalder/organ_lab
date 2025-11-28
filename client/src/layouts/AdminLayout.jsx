import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { paths } from "../routers/links";
import { Loading, Approve, Logout } from "../icons";
import { Sidebar } from "../components/sidebar";
import { RightSide } from "../components/rightSide";
import { useAuthStore } from "../stores/authStore";

export const AdminLayout = () => {
  const [loadLocation, setLoadLoading] = useState(true);
  const { isApprove, isToken, isRole, setLogoutRequested } = useAuthStore();

  const handleLogout = () => setLogoutRequested(true);

  useEffect(() => {
    setTimeout(() => {
      return setLoadLoading(false);
    }, 1000);
  }, []);

  const isAuthenticated = Boolean(isToken && isRole);
  if (!isAuthenticated) {
    return <Navigate to={paths.login} />;
  }

  return (
    <div className="app_admin_cover">
      <Sidebar />
      <div className="app_main_content_area">
        <Outlet />
      </div>
      <RightSide />

      {loadLocation && (
        <div className="app_loading_data_option">
          <div className="app_loading_content">
            <Loading />
            <div className="app_content_item">
              <h6>
                We are trying to load the <br />
                content for you.
              </h6>
              <p>Please wait.....</p>
            </div>
          </div>
        </div>
      )}

      {!isApprove && (
        <div className="app_loading_data_option">
          <div className="app_approve_content">
            <Approve />
            <div className="app_content_item">
              <h6>Unauthorized Access</h6>
              <p>
                You are not authorized to access. Please contact
                <br />
                with your admin...
              </p>
              <div className="app_logout_bun" onClick={() => handleLogout()}>
                <Logout /> Logout
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
