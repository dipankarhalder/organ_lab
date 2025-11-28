import React from "react";
import "./Alert.css"; // if you want to keep styles modular

const Alert = ({
  title,
  message,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="alert-backdrop">
      <div className="alert-box">
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="alert-actions">
          <button className="btn cancel" onClick={onCancel}>
            {cancelText}
          </button>
          <button className="btn confirm" onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Alert;
