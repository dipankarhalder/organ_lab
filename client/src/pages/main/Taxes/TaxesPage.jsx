import { Outlet } from "react-router-dom";
import { paths } from "../../../routers/links";
import { Breadcrumb } from "../../../shared/Breadcrumb";

const breadcrumbData = [
  { title: "Admin", path: paths.taxList },
  { title: "All Taxes" },
];

export const TaxesPage = () => {
  return (
    <div className="app_page_insides">
      <Breadcrumb items={breadcrumbData} />
      <Outlet />
    </div>
  );
};
