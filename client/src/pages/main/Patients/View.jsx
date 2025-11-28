import { useEffect, useRef, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import avatar from "/avt2.png";
import patientbg from "/patientbg.jpg";
import { toastStatus } from "../../../constant";
import {
  Email,
  Phone,
  DateofBirth,
  Gender,
  Map,
  Back,
  Edit,
  Delete,
} from "../../../icons";
import { patientServices } from "../../../services/endpoints";
import { getServices } from "../../../services/core.services";
import { usePatientStore } from "../../../stores/patientStore";
import { ToastContext } from "../../../shared/toast/context/ToastContext";
import { handleApiErrorToast } from "../../../utils/handleApiErrorToast";

export const PatientView = () => {
  const { id } = useParams();
  const hasFetched = useRef(false);
  const { addToast } = useContext(ToastContext);
  const { isLoading, setLoading, detailsPatient, setDetailsPatient } =
    usePatientStore();

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    setLoading(true);
    const fetchPatientList = async () => {
      try {
        const res = await getServices(`${patientServices}/details/${id}`);
        const isError = await handleApiErrorToast(res, addToast, toastStatus);
        if (isError) return;
        setDetailsPatient(res.data.data);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientList();
  }, [addToast, id, setDetailsPatient, setLoading]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    detailsPatient && (
      <div className="app_profile_cover">
        <div className="app_profile_wrapper">
          <div className="app_profile_main_bg">
            <img src={patientbg} alt="Organ Diagnostic background" />
            <span></span>
            <div className="app_profile_avatar">
              <img src={avatar} alt="Organ Diagnostic avatar" />
            </div>
          </div>
          <div className="app_profile_body_content">
            <div className="app_profile_main_info">
              <div className="app_profile_name_info">
                <h2>{`${detailsPatient.firstName} ${detailsPatient.lastName}`}</h2>
                <p>#{detailsPatient._id}</p>
              </div>
              <div className="app_info_inside_profile">
                <h4>About</h4>
                <div className="app_maintain_profile">
                  <h5>
                    <Email />
                    <b>Email:</b>
                  </h5>
                  <p>{detailsPatient.email}</p>
                </div>
                <div className="app_maintain_profile">
                  <h5>
                    <Phone />
                    <b>Phone:</b>
                  </h5>
                  <p>{detailsPatient.phone}</p>
                </div>
                <div className="app_maintain_profile">
                  <h5>
                    <DateofBirth />
                    <b>Date of Birth:</b>
                  </h5>
                  <p className="app_design_role">
                    {moment(detailsPatient.dateOfBirth).format("DD-MMMM-YYYY")}
                  </p>
                </div>
                <div className="app_maintain_profile">
                  <h5>
                    <Gender />
                    <b>Gender:</b>
                  </h5>
                  <p className="app_design_role">{detailsPatient.gender}</p>
                </div>
                <div className="app_maintain_profile">
                  <h5>
                    <Map />
                    <b>Address:</b>
                  </h5>
                  <p className="app_design_role">{detailsPatient.address}</p>
                </div>
              </div>
              <div className="app_info_inside_profile">
                <h4>Emergency Contact</h4>
                <div className="app_relationship">
                  <ul>
                    {detailsPatient.emergencyContact.map((itm) => (
                      <li key={itm._id}>
                        <p>
                          <span>Name:</span>
                          <em>{itm.name}</em>
                        </p>
                        <p>
                          <span>Phone:</span>
                          <em>{itm.phone}</em>
                        </p>
                        <p>
                          <span>Relation:</span>
                          <em>{itm.relation}</em>
                        </p>
                      </li>
                    ))}
                  </ul>
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
