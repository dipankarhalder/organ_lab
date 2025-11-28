import { paths } from "../../../../routers/links";
import { Breadcrumb } from "../../../../shared/Breadcrumb";

const breadcrumbData = [
  { title: "Admin", path: paths.dashboard },
  { title: "Settings" },
];

export const SettingsPage = () => {
  return (
    <div className="app_page_insides">
      <Breadcrumb items={breadcrumbData} />
      <div className="app_form_cover_inside">
        <h2>Settings</h2>
      </div>
    </div>
  );
};
