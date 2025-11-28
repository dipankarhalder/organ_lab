import { Link } from "react-router-dom";
import { Rarrow } from "../../icons";

export const Breadcrumb = ({ items }) => {
  if (!items || items.length === 0) return null;
  const userLocate = localStorage.getItem("locate");
  const locations = JSON.parse(localStorage.getItem("locations"));

  const loggedinUserLocation = () => {
    const findUserLocation = locations.filter(
      (location) => location._id === userLocate && location
    );

    return (
      <div className="app_log_location_info">
        <p>
          {findUserLocation[0].locationName},{" "}
          {findUserLocation[0].locationPincode}
        </p>
      </div>
    );
  };

  return (
    <div className="app_breadcrumb_sec" aria-label="breadcrumb">
      <ul>
        {items.map((item, idx) => (
          <li key={idx}>
            {item.path ? (
              <Link to={item.path}>{item.title}</Link>
            ) : (
              <span>{item.title}</span>
            )}
            {idx < items.length - 1 && <Rarrow />}
          </li>
        ))}
      </ul>
      {loggedinUserLocation()}
    </div>
  );
};
