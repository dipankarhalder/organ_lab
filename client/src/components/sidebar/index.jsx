import { Link, useLocation } from "react-router-dom";
import { navlinks } from "../../constant/static";
import { getInitials } from "../../utils/corefunc";
import { MainLogo } from "../auth/Logo";
import { uploadUrl } from "../../services/baseUrl";
import { useAuthStore } from "../../stores/authStore";
import { useProfileStore } from "../../stores/profileStore";
import avatar from "/avt2.png";

const normalizePath = (path) =>
  path?.startsWith("/") ? path : `/admin/${path}`;
const isDashboardPath = (path) =>
  path === "/admin" || path === "admin" || path === "/admin/";
const isLinkActive = (currentPath, linkPath) =>
  currentPath === linkPath || currentPath.startsWith(linkPath + "/");

export const Sidebar = () => {
  const { pathname } = useLocation();
  const { setLogoutRequested } = useAuthStore();
  const { profileInformation } = useProfileStore();
  const handleLogout = async () => setLogoutRequested(true);

  return (
    <div className="app_sidebar">
      <div className="app_inside_sidebar">
        <div className="app_side_logo">
          <MainLogo />
        </div>
        <div className="app_sidebar_cover">
          {navlinks.map((section) => {
            const sectionIsActive = section.children?.some(({ path }) => {
              if (!path) return false;

              const normalizedPath = normalizePath(path);
              return isDashboardPath(normalizedPath)
                ? pathname === "/admin"
                : isLinkActive(pathname, normalizedPath);
            });

            return (
              <div
                className={`app_sideber_item ${sectionIsActive ? "expanded" : ""}`}
                key={section.id}
              >
                <p>{section.label}</p>
                <ul>
                  {section.children?.map(({ id, path, label, icon: Icon }) => {
                    if (!path) return null;

                    const linkPath = normalizePath(path);
                    const active = isDashboardPath(linkPath)
                      ? pathname === "/admin"
                      : isLinkActive(pathname, linkPath);

                    return (
                      <li key={id} className={active ? "active_sidebar" : ""}>
                        <Link to={linkPath}>
                          {Icon && <Icon />} <p>{label}</p>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
      {profileInformation && (
        <div className="app_logout">
          <button className="app_logout_inside" onClick={() => handleLogout()}>
            <span>
              {!profileInformation.profileImage ? (
                <>
                  {getInitials(
                    `${profileInformation.firstName} ${profileInformation.lastName}`
                  )}
                </>
              ) : (
                <img
                  src={
                    profileInformation.profileImage
                      ? `${uploadUrl}${profileInformation.profileImage}`
                      : avatar
                  }
                  alt={profileInformation.firstName || "Profile"}
                />
              )}
            </span>
            <div className="app_user_logout_btn">
              <h4>{`${profileInformation.firstName} ${profileInformation.lastName}`}</h4>
              <p>Logout</p>
            </div>
          </button>
        </div>
      )}
    </div>
  );
};
