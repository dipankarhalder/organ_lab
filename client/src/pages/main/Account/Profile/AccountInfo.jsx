import { useState, useContext } from "react";
import mainbg from "/lushjungle.png";
import { getInitials } from "../../../../utils/corefunc";
import { uploadUrl } from "../../../../services/baseUrl";
import { Popup } from "../../../../shared/Popup";
import { ImageUpload } from "../../../../shared/ImageUpload";
import { useProfileStore } from "../../../../stores/profileStore";
import { About } from "../../../../components/main/profile/About";
import { Session } from "../../../../components/main/profile/Session";
import { ButtonGroup } from "../../../../components/main/profile/ButtonGroup";
import { profileServices } from "../../../../services/endpoints";
import { patchServices } from "../../../../services/core.services";
import { ToastContext } from "../../../../shared/toast/context/ToastContext";
import { toastStatus } from "../../../../constant";
import { Back, Camera } from "../../../../icons";

export const AccountInfo = () => {
  const { addToast } = useContext(ToastContext);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [uploadedImg, setUploadedImg] = useState(null);
  const { isProfileLoading, profileInformation, setProfileDetails } =
    useProfileStore();

  const handleFileSelect = (files) => setUploadedImg(files);
  const handleUpdateImage = async () => {
    if (!uploadedImg || uploadedImg.length === 0) return;

    const formData = new FormData();
    formData.append("profileImage", uploadedImg[0]);
    try {
      const res = await patchServices(
        `${profileServices}/update-profile-image`,
        formData
      );
      if (res.success) {
        const updatedProfile = {
          ...profileInformation,
          profileImage: res.data.data.profileImage,
        };
        setProfileDetails(updatedProfile);
      }
      await addToast({
        type: toastStatus.SUCCESS,
        title: "Success!",
        description: res.data.message,
      });
    } finally {
      setIsPopupOpen(false);
    }
  };

  if (isProfileLoading) {
    return <div>Loading....</div>;
  }

  return (
    profileInformation && (
      <div className="app_profile_cover">
        <div className="app_profile_wrapper">
          <div className="app_profile_main_bg">
            <img src={mainbg} alt="Organ Diagnostic background" />
            <span></span>
            <div className="app_profile_avatar">
              {!profileInformation.profileImage ? (
                <span className="app_text_avatar">
                  {getInitials(
                    `${profileInformation.firstName} ${profileInformation.lastName}`
                  )}
                </span>
              ) : (
                <div className="app_profile_dp">
                  <img
                    src={`${uploadUrl}${profileInformation.profileImage}`}
                    alt="Organ Diagnostic avatar"
                  />
                </div>
              )}
              <button onClick={() => setIsPopupOpen(true)}>
                <Camera />
              </button>
            </div>
            <div className="app_profile_back_btn">
              <Back />
              <p>Back</p>
            </div>
          </div>
          <div className="app_profile_body_content">
            <About profileInformation={profileInformation} />
            <Session profileInformation={profileInformation} />
            <ButtonGroup profileInformation={profileInformation} />
          </div>
        </div>
        <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
          <h2>Update Profile Image</h2>
          <p>Please upload your profile with .jpeg, .jpg, .png</p>
          <ImageUpload onFileSelect={handleFileSelect} multiple={false} />
          <div className="popup-btn">
            <span onClick={() => handleUpdateImage()}>Update</span>
          </div>
        </Popup>
      </div>
    )
  );
};
