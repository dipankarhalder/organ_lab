import { Outlet } from "react-router-dom";
import { paths } from "../../../routers/links";
import { Breadcrumb } from "../../../shared/Breadcrumb";

const breadcrumbData = [
  { title: "Admin", path: paths.dashboard },
  { title: "Our Locations" },
];

export const LocationsPage = () => {
  return (
    <div className="app_page_insides">
      <Breadcrumb items={breadcrumbData} />
      <Outlet />
    </div>
  );
};
