import { Outlet, Navigate } from "react-router-dom";
import { MainLogo } from "../components/auth/Logo";
import { Copyright } from "../components/auth/Copyright";
import { userRole } from "../constant";
import { paths } from "../routers/links";
import { useAuthStore } from "../stores/authStore";
import bgImg from "/bg.png";

export const AuthLayout = () => {
  const { isToken, isRole } = useAuthStore();
  const isLoggedIn = Boolean(isToken);
  const isAdminUser = isRole === userRole.ADMIN || isRole === userRole.SUPER;

  if (isLoggedIn && isAdminUser) {
    return <Navigate to={paths.dashboard} replace />;
  }

  return (
    <section className="app_main_cover">
      <div className="app_content">
        <div className="app_content_form">
          <div className="app_inside_content_form">
            <MainLogo />
            <Outlet />
          </div>
        </div>
        <Copyright />
      </div>
      <span className="app_gradient"></span>
      <div className="app_video_auth">
        <img src={bgImg} alt="Organ Lab" />
      </div>
    </section>
  );
};
