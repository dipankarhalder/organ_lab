import moment from "moment";
import { Link } from "react-router-dom";
import { paths } from "../../../routers/links";
import { Breadcrumb } from "../../../shared/Breadcrumb";
import {
  Members,
  Location,
  Categories,
  LabDoctor,
  Plans,
  Doctor,
  LabText,
} from "../../../icons";

const breadcrumbData = [
  { title: "Organ Diagnostic", path: paths.dashboard },
  { title: "Dashboard" },
];

export const DashboardPage = () => {
  return (
    <div className="app_page_insides">
      <Breadcrumb items={breadcrumbData} />
      <div className="app_main_container">
        <div className="app_main_content_dashboard">
          <div className="app_main_aval_doctor">
            <h2>
              Available General Doctors
              <span>Today, {moment().format("dddd, MMMM Do YYYY")}</span>
            </h2>
            <div className="app_doctor_today">
              <ul>
                <li>
                  <h6>Dr. Avijit Mukherjee</h6>
                  <p>MBBS / MD (General Physician)</p>
                  <div className="app_doct_time">
                    <span>11:30 AM - 2:30 PM</span>
                    <span>6:30 - 9:30 PM</span>
                  </div>
                </li>
                <li>
                  <h6>Dr. Avijit Mukherjee</h6>
                  <p>MBBS (Neurologist)</p>
                  <div className="app_doct_time">
                    <span>8:30 - 11:30 AM</span>
                    <span>2:30 - 4:30 PM</span>
                    <span>7:30 - 10:30 PM</span>
                  </div>
                </li>
                <li>
                  <h6>Dr. Avijit Mukherjee</h6>
                  <p>MBBS (Gynecologist)</p>
                  <div className="app_doct_time">
                    <span>11:30 AM</span>
                  </div>
                </li>
                <li>
                  <h6>Dr. Avijit Mukherjee</h6>
                  <p>MBBS (Orthopedic)</p>
                  <div className="app_doct_time">
                    <span>11:30 AM</span>
                    <span>5:30 PM</span>
                  </div>
                </li>
                <li>
                  <h6>Dr. Sagar Roy Choudharee</h6>
                  <p>MBBS (Dermatologist)</p>
                  <div className="app_doct_time">
                    <span>11:30 AM</span>
                  </div>
                </li>
                <li>
                  <h6>Dr. Avijit Mukherjee</h6>
                  <p>MBBS (Neurosurgeon)</p>
                  <div className="app_doct_time">
                    <span>11:30 AM</span>
                    <span>5:30 PM</span>
                  </div>
                </li>
                <li>
                  <h6>Dr. Sagar Roy Choudharee</h6>
                  <p>MBBS (Psychiatrist)</p>
                  <div className="app_doct_time">
                    <span>11:30 AM</span>
                  </div>
                </li>
                <li>
                  <h6>Dr. Avijit Mukherjee</h6>
                  <p>MBBS (Neurologist)</p>
                  <div className="app_doct_time">
                    <span>11:30 AM</span>
                  </div>
                </li>
                <li>
                  <h6>Dr. Avijit Mukherjee</h6>
                  <p>MBBS (Gynecologist)</p>
                  <div className="app_doct_time">
                    <span>11:30 AM</span>
                    <span>5:30 PM</span>
                  </div>
                </li>
                <li>
                  <h6>Dr. Avijit Mukherjee</h6>
                  <p>MBBS (Orthopedic)</p>
                  <div className="app_doct_time">
                    <span>11:30 AM</span>
                    <span>5:30 PM</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
