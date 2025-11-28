import moment from "moment";

export const Session = ({ profileInformation }) => {
  return (
    <div className="app_expire_sec">
      <h4>Session logs (latest 5 logs)</h4>
      <ul>
        {[...profileInformation.refreshTokens].reverse().map((item) => (
          <li key={item._id}>
            <div className="app_sess_isactive"></div>
            <p>
              <span>Browser:</span>{" "}
              {item.browser ? item.browser : "External source"}
            </p>
            <p>
              <span>Device:</span> {item.device}
            </p>
            <p>
              <span>Date &amp; Time:</span>
              {moment(item.createdAt).format("DD-MM-YYYY, h:mm A")}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
