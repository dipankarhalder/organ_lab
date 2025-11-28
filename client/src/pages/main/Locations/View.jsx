import moment from "moment";
import MainBg from "/locinsidebg.jpg";
import { formatRole } from "../../../utils/corefunc";
import { Edit, Delete, Back, Cross } from "../../../icons";

const UserCard = ({ userInfo, label = "User Information" }) => {
  const { firstName, lastName, email, phone, role, createdAt } = userInfo;
  return (
    <div className="app_creation_update_block">
      <h5>{label}</h5>
      <div className="app_create_filed">
        <p>Name:</p>
        <span>{`${firstName} ${lastName}`}</span>
      </div>
      <div className="app_create_filed">
        <p>Role:</p>
        <span>{formatRole(role)}</span>
      </div>
      <div className="app_create_filed">
        <p>Email:</p>
        <span>{email}</span>
      </div>
      <div className="app_create_filed">
        <p>Phone:</p>
        <span>{phone}</span>
      </div>
      <div className="app_create_filed">
        <p>Date:</p>
        <span>{moment(createdAt).format("DD-MMMM-YYYY, h:mm a")}</span>
      </div>
    </div>
  );
};

export const LocationDetails = ({ isClosing, viewDetails, onClose }) => {
  const {
    locationName,
    locationCode,
    locationAddress,
    locationPincode,
    isActive,
    createdBy,
    createdAt,
    updatedBy,
    updatedAt,
  } = viewDetails;

  return (
    viewDetails && (
      <div className="app_add_new_item_form_cover">
        <div className="app_details_cover">
          <div
            className={`app_details_wrapper ${isClosing ? "slideOut" : "slideIn"}`}
          >
            <div className="app_main_details_bg">
              <img src={MainBg} alt={"location_bg"} />
              <span></span>
              <button className="app_cross_btn_form" onClick={onClose}>
                <Cross />
              </button>
            </div>
            <h1>Location Details Information - {locationCode}</h1>
            <div className="app_inside_details">
              <div className="app_wrapper_items">
                <p>Location Information</p>
                <div className="app_inside_filed">
                  <p>Name:</p>
                  <span>{locationName}</span>
                </div>
                <div className="app_inside_filed">
                  <p>Code:</p>
                  <span>{locationCode}</span>
                </div>
                <div className="app_inside_filed">
                  <p>Address:</p>
                  <span>{locationAddress}</span>
                </div>
                <div className="app_inside_filed">
                  <p>Pincode:</p>
                  <span className="app_status_location">{locationPincode}</span>
                </div>
                <div className="app_inside_filed">
                  <p>Status:</p>
                  <span className={isActive ? "active" : "inactive"}>
                    {isActive ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
              <div className="app_wrapper_items">
                <div className="app_devider_create_update">
                  {createdBy && (
                    <UserCard
                      userInfo={{ ...createdBy, createdAt: createdAt }}
                      label="Created By"
                    />
                  )}
                  {updatedBy && (
                    <UserCard
                      userInfo={{ ...updatedBy, createdAt: updatedAt }}
                      label="Updated By"
                    />
                  )}
                  <div className="app_button_section">
                    <button className="app_edit_btn">
                      <Edit /> Update
                    </button>
                    <button className="app_del_btn">
                      <Delete /> Delete
                    </button>
                    <button onClick={() => onClose()}>
                      <Back /> Back
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};
