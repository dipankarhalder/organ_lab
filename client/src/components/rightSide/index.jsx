import { useState, useCallback, Fragment } from "react";
import { EventModal } from "./EventModel";
import {
  Members,
  Phone,
  Categories,
  LabDoctor,
  Plans,
  Doctor,
  LabText,
  Close,
} from "../../icons";
import { Calender } from "../../shared/Calender";

export const RightSide = () => {
  const [events, setEvents] = useState({});
  const [popupDate, setPopupDate] = useState(null);
  const [, setYearSelected] = useState(new Date().getFullYear()); //yearSelected
  const [isOpenReminder, setIsOpenReminder] = useState(false);
  const [isOpenSchedule, setIsOpenSchedule] = useState(false);

  const handleDateClick = useCallback((dateStr) => {
    setPopupDate(dateStr);
  }, []);

  const handleYearChange = useCallback((year) => {
    setYearSelected(year);
  }, []);

  const handleSaveEvent = useCallback((dateStr, title) => {
    if (!title.trim()) return;
    setEvents((prev) => ({ ...prev, [dateStr]: title }));
    setPopupDate(null);
  }, []);

  const handleOpenReminder = () => setIsOpenReminder(!isOpenReminder);
  const handleOpenSchedule = () => setIsOpenSchedule(!isOpenSchedule);

  return (
    <div className="app_right_sidebar">
      <Calender
        onDateClick={handleDateClick}
        onYearChange={handleYearChange}
        events={events}
      />

      {popupDate && (
        <EventModal
          date={popupDate}
          onSave={handleSaveEvent}
          onClose={() => setPopupDate(null)}
          initialTitle={events[popupDate] || ""}
        />
      )}

      <div className="app_link_items">
        <h4>Add All Items</h4>
        <ul>
          <li>
            <Members />
            <p>Member</p>
          </li>
          <li>
            <LabText />
            <p>Lab Test</p>
          </li>
          <li>
            <Doctor />
            <p>Gen. Doc</p>
          </li>
          <li>
            <LabDoctor />
            <p>Lab Doc</p>
          </li>
          <li>
            <Plans />
            <p>Special.</p>
          </li>
          <li>
            <Categories />
            <p>Category</p>
          </li>
        </ul>
      </div>

      <div className="app_reminder">
        <h4>All The Reminders</h4>
        <ul>
          <li>
            <div className="app_task_title">
              <p>
                <b>
                  <Phone />
                </b>
                <em className="app_timing">
                  <span>10:00 AM</span>
                </em>
              </p>
              <p>Call Dr. Abhishek Das Gupta</p>
            </div>
          </li>
          <li>
            <div className="app_task_title">
              <p>
                <b>
                  <Members />
                </b>
                <em className="app_timing">
                  <span>12:00 PM</span>
                </em>
              </p>
              <p>Add records of new joiners</p>
            </div>
          </li>
          <li>
            <div className="app_task_title">
              <p>
                <b>
                  <Doctor />
                </b>
                <em className="app_timing">
                  <span>02:00 PM</span>
                </em>
              </p>
              <p>Approve the new vendors records</p>
            </div>
          </li>
        </ul>
        <span className="app_more" onClick={() => handleOpenReminder()}>
          more
        </span>
      </div>

      <div className="app_schedules">
        <h4>All Schedules</h4>
        <ul>
          <li>
            <div className="app_task_title">
              <p>
                <b>
                  <Members />
                </b>
                <em className="app_timing">
                  <span>10:00 AM</span>
                </em>
              </p>
              <p>Meeting related to revenue</p>
            </div>
          </li>
          <li>
            <div className="app_task_title">
              <p>
                <b>
                  <Members />
                </b>
                <em className="app_timing">
                  <span>12:00 PM</span>
                </em>
              </p>
              <p>Meeting with CMO for renovation of the clinic</p>
            </div>
          </li>
          <li>
            <div className="app_task_title">
              <p>
                <b>
                  <Members />
                </b>
                <em className="app_timing">
                  <span>02:00 PM</span>
                </em>
              </p>
              <p>Meeting with internal clinic members</p>
            </div>
          </li>
        </ul>
        <span className="app_more" onClick={() => handleOpenSchedule()}>
          more
        </span>
      </div>

      {isOpenReminder && (
        <div className="app_full_items">
          <div className="app_reminder">
            <h4>
              Reminder lists{" "}
              <div className="close_app" onClick={() => handleOpenReminder()}>
                <Close />
              </div>
            </h4>
            <ul>
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <Fragment key={item}>
                  <li>
                    <div className="app_timing">
                      <span>10:00 AM</span>
                    </div>
                    <div className="app_task_title">
                      <p>Call Dr. Abhishek Das Gupta</p>
                      <p>
                        <b>
                          <Phone />
                          Phone Call
                        </b>
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="app_timing">
                      <span>12:00 PM</span>
                    </div>
                    <div className="app_task_title">
                      <p>Add records of new joiners</p>
                      <p>
                        <b>
                          <Members />
                          Internal Works
                        </b>
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="app_timing">
                      <span>02:00 PM</span>
                    </div>
                    <div className="app_task_title">
                      <p>Approve the new vendors records</p>
                      <p>
                        <b>
                          <Members />
                          Internal Works
                        </b>
                      </p>
                    </div>
                  </li>
                </Fragment>
              ))}
            </ul>
          </div>
        </div>
      )}

      {isOpenSchedule && (
        <div className="app_full_items">
          <div className="app_schedules">
            <h4>
              Schedule lists{" "}
              <div className="close_app" onClick={() => handleOpenSchedule()}>
                <Close />
              </div>
            </h4>
            <ul>
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <Fragment key={item}>
                  <li>
                    <div className="app_timing">
                      <span>10:00 AM</span>
                    </div>
                    <div className="app_task_title">
                      <p>Call Dr. Abhishek Das Gupta</p>
                      <p>
                        <b>
                          <Phone />
                          Phone Call
                        </b>
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="app_timing">
                      <span>12:00 PM</span>
                    </div>
                    <div className="app_task_title">
                      <p>Add records of new joiners</p>
                      <p>
                        <b>
                          <Members />
                          Internal Works
                        </b>
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="app_timing">
                      <span>02:00 PM</span>
                    </div>
                    <div className="app_task_title">
                      <p>Approve the new vendors records</p>
                      <p>
                        <b>
                          <Members />
                          Internal Works
                        </b>
                      </p>
                    </div>
                  </li>
                </Fragment>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
