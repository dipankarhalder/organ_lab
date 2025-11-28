import moment from "moment";
import MainBg from "/bgdata.png";
import { getInitials } from "../../../utils/corefunc";
import { uploadUrl } from "../../../services/baseUrl";
import { Edit, Delete, Back, Cross } from "../../../icons";

export const DetailsPage = ({ isClosing, memberDetails, onClose }) => {
  return (
    memberDetails && (
      <div className="app_add_new_item_form_cover">
        <div className="app_details_cover">
          <div
            className={`app_details_wrapper ${isClosing ? "slideOut" : "slideIn"}`}
          >
            <div className="app_main_details_bg">
              <div className="app_profile_avatar">
                {!memberDetails.profileImage ? (
                  <span className="app_text_avatar">
                    {getInitials(
                      `${memberDetails.firstName} ${memberDetails.lastName}`
                    )}
                  </span>
                ) : (
                  <div className="app_profile_dp">
                    <img
                      src={`${uploadUrl}${memberDetails.profileImage}`}
                      alt="Organ Diagnostic avatar"
                    />
                  </div>
                )}
              </div>
              <img src={MainBg} alt={"location_bg"} />
              <span></span>
              <button className="app_cross_btn_form" onClick={onClose}>
                <Cross />
              </button>
            </div>
            <h1>Member Information</h1>
            <div className="app_inside_details">
              {memberDetails && (
                <>
                  <div className="app_wrapper_items">
                    <p>Profile Information</p>
                    <div className="app_inside_filed">
                      <p>Name:</p>
                      <span>
                        {memberDetails.firstName} {memberDetails.lastName}
                      </span>
                    </div>
                    <div className="app_inside_filed">
                      <p>Role:</p>
                      <span>
                        {memberDetails.role
                          .replace(/_/g, " ")
                          .replace(/\b\w/g, (c) => c.toUpperCase())}
                      </span>
                    </div>
                    <div className="app_inside_filed">
                      <p>Email:</p>
                      <span>{memberDetails.email}</span>
                    </div>
                    <div className="app_inside_filed">
                      <p>Phone:</p>
                      <span className="app_status_location">
                        {memberDetails.phone}
                      </span>
                    </div>
                    <div className="app_inside_filed">
                      <p>Status:</p>
                      <span>
                        {memberDetails.isApproved ? "Approved" : "Not Approved"}
                      </span>
                    </div>
                  </div>
                  <div className="app_wrapper_items">
                    <p>Location Information</p>
                    <div className="app_inside_filed">
                      <p>Name:</p>
                      <span>
                        {memberDetails.labLocation.locationName || "-"}
                      </span>
                    </div>
                    <div className="app_inside_filed">
                      <p>Address:</p>
                      <span>
                        {memberDetails.labLocation.locationAddress || "-"}
                      </span>
                    </div>
                    <div className="app_inside_filed">
                      <p>Code:</p>
                      <span>
                        {memberDetails.labLocation.locationCode || "-"}
                      </span>
                    </div>
                    <div className="app_inside_filed">
                      <p>Pincode:</p>
                      <span className="app_status_location">
                        {memberDetails.labLocation.locationPincode || "-"}
                      </span>
                    </div>
                    <div className="app_inside_filed">
                      <p>Status:</p>
                      <span>
                        {memberDetails.labLocation.isActive
                          ? "Active"
                          : "In Active"}
                      </span>
                    </div>
                  </div>
                  <div className="app_wrapper_items">
                    <p>Login Information</p>
                    <div className="app_devider_create_update">
                      {memberDetails.refreshTokens.map((item) => (
                        <div
                          className="app_creation_update_block"
                          key={item._id}
                        >
                          <div className="app_create_filed">
                            <span>
                              {moment(item.createdAt).format(
                                "DD-MMMM-YYYY, h:mm a"
                              )}
                            </span>
                          </div>
                        </div>
                      ))}
                      <div className="app_button_section">
                        <button className="app_edit_btn">
                          <Edit /> Update
                        </button>
                        <button className="app_del_btn">
                          <Delete />
                          Delete
                        </button>
                        <button onClick={() => onClose()}>
                          <Back />
                          Back
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};
