import {
  Email,
  Location,
  Phone,
  Companies,
  Profile,
  Subscribers,
} from "../../../icons";

export const About = ({ profileInformation }) => {
  return (
    <div className="app_profile_main_info">
      <div className="app_profile_name_info">
        <h2>{`${profileInformation.firstName} ${profileInformation.lastName}`}</h2>
        <p>#{profileInformation._id}</p>
      </div>
      <div className="app_info_inside_profile">
        <h4>About</h4>
        <div className="app_maintain_profile">
          <h5>
            <Email />
            <b>Email:</b>
          </h5>
          <p>{profileInformation.email}</p>
        </div>
        <div className="app_maintain_profile">
          <h5>
            <Phone />
            <b>Phone:</b>
          </h5>
          <p>{profileInformation.phone}</p>
        </div>
        <div className="app_maintain_profile">
          <h5>
            <Profile />
            <b>Role:</b>
          </h5>
          <p className="app_design_role">
            {profileInformation.role.replace(/_/g, " ")}
          </p>
        </div>
      </div>
      <div className="app_info_inside_profile">
        <h4>Lab Information</h4>
        <div className="app_maintain_profile">
          <h5>
            <Profile />
            <b>Name:</b>
          </h5>
          <p>{profileInformation.labLocation.locationName}</p>
        </div>
        <div className="app_maintain_profile">
          <h5>
            <Companies />
            <b>Code:</b>
          </h5>
          <p>{profileInformation.labLocation.locationCode}</p>
        </div>
        <div className="app_maintain_profile">
          <h5>
            <Location />
            <b>Address:</b>
          </h5>
          <p className="app_design_role">
            {profileInformation.labLocation.locationAddress}
          </p>
        </div>
        <div className="app_maintain_profile">
          <h5>
            <Subscribers />
            <b>Pincode:</b>
          </h5>
          <p>{profileInformation.labLocation.locationPincode}</p>
        </div>
      </div>
    </div>
  );
};
