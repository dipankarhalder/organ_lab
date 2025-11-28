import { useEffect, useRef, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import avatar from "/avt3.png";
import doctorbg from "/doctorbg.jpg";
import { toastStatus } from "../../../constant";
import {
  Email,
  Phone,
  Gender,
  Map,
  Timer,
  Profile,
  Back,
  Edit,
  Delete,
  Calender,
} from "../../../icons";
import { doctorServices } from "../../../services/endpoints";
import { getServices } from "../../../services/core.services";
import { useDoctorStore } from "../../../stores/doctorStore";
import { ToastContext } from "../../../shared/toast/context/ToastContext";
import { handleApiErrorToast } from "../../../utils/handleApiErrorToast";

export const DoctorView = () => {
  const { id } = useParams();
  const hasFetched = useRef(false);
  const { addToast } = useContext(ToastContext);
  const { isLoading, setLoading, detailsDoctor, setDetailsDoctor } =
    useDoctorStore();

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    setLoading(true);
    const fetchPatientList = async () => {
      try {
        const res = await getServices(`${doctorServices}/details/${id}`);
        const isError = await handleApiErrorToast(res, addToast, toastStatus);
        if (isError) return;
        setDetailsDoctor(res.data.data);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientList();
  }, [addToast, id, setDetailsDoctor, setLoading]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    detailsDoctor && (
      <div className="app_profile_cover">
        <div className="app_profile_wrapper">
          <div className="app_profile_main_bg">
            <img src={doctorbg} alt="Organ Diagnostic background" />
            <span></span>
            <div className="app_profile_avatar">
              <img src={avatar} alt="Organ Diagnostic avatar" />
            </div>
          </div>
          <div className="app_profile_body_content">
            <div className="app_profile_main_info">
              <div className="app_profile_name_info">
                <h2>{detailsDoctor.fullName}</h2>
                <p>#{detailsDoctor._id}</p>
                <p className="app_profile_desc">{detailsDoctor.bio}</p>
              </div>
              <div className="app_info_inside_profile">
                <h4>About</h4>
                <div className="app_maintain_profile">
                  <h5>
                    <Email />
                    <b>Email:</b>
                  </h5>
                  <p>{detailsDoctor.email}</p>
                </div>
                <div className="app_maintain_profile">
                  <h5>
                    <Phone />
                    <b>Phone:</b>
                  </h5>
                  <p>{detailsDoctor.phone}</p>
                </div>
                <div className="app_maintain_profile">
                  <h5>
                    <Timer />
                    <b>Experience:</b>
                  </h5>
                  <p className="app_design_role">
                    {detailsDoctor.experience} years
                  </p>
                </div>
                <div className="app_maintain_profile">
                  <h5>
                    <Map />
                    <b>Located in:</b>
                  </h5>
                  <p className="app_design_role">{detailsDoctor.location}</p>
                </div>
                <div className="app_maintain_profile">
                  <h5>
                    <Gender />
                    <b>Qualification:</b>
                  </h5>
                  <p className="app_design_role">
                    {detailsDoctor.qualifications.toString()}
                  </p>
                </div>
              </div>
              <div className="app_info_inside_profile">
                <h4>Created by</h4>
                <div className="app_maintain_profile">
                  <h5>
                    <Profile />
                    <b>Name:</b>
                  </h5>
                  <p>{`${detailsDoctor.user.firstName} ${detailsDoctor.user.lastName}`}</p>
                </div>
                <div className="app_maintain_profile">
                  <h5>
                    <Email />
                    <b>Email:</b>
                  </h5>
                  <p>{detailsDoctor.user.email}</p>
                </div>
                <div className="app_maintain_profile">
                  <h5>
                    <Calender />
                    <b>Create Date:</b>
                  </h5>
                  <p>
                    {moment(detailsDoctor.createdAt).format("DD-MMMM-YYYY")}
                  </p>
                </div>
              </div>
              <div className="app_info_inside_profile">
                <h4>Last Updated by</h4>
                <div className="app_maintain_profile">
                  <h5>
                    <Profile />
                    <b>Name:</b>
                  </h5>
                  <p>{`${detailsDoctor.lastUpdatedBy.firstName} ${detailsDoctor.lastUpdatedBy.lastName}`}</p>
                </div>
                <div className="app_maintain_profile">
                  <h5>
                    <Email />
                    <b>ID:</b>
                  </h5>
                  <p>#{detailsDoctor.lastUpdatedBy._id}</p>
                </div>
                <div className="app_maintain_profile">
                  <h5>
                    <Gender />
                    <b>Role:</b>
                  </h5>
                  <p>{detailsDoctor.lastUpdatedBy.role}</p>
                </div>
                <div className="app_maintain_profile">
                  <h5>
                    <Calender />
                    <b>Create Date:</b>
                  </h5>
                  <p>
                    {moment(detailsDoctor.createdAt).format("DD-MMMM-YYYY")}
                  </p>
                </div>
              </div>
              <div className="app_profile_btns">
                <Link to="..">
                  <Back /> Back
                </Link>
                <div className="app_edit_btn">
                  <Edit /> Edit
                </div>
                <div className="app_delete_btn">
                  <Delete /> Delete
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};
