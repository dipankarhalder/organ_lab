import { Link } from "react-router-dom";

export const Copyright = () => {
  return (
    <div className="app_content_footer">
      <p>
        &copy; {new Date().getFullYear()}
        <span>Organ Diagnostics.</span> All Rights Reserved.
      </p>
      <span>
        Designed &amp; Developed by -
        <Link to="https://thepixelwiz.com/" target="_blank">
          Pixelwiz Pvt. Ltd.
        </Link>
      </span>
    </div>
  );
};
