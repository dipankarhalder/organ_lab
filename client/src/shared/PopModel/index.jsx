export const PopModal = ({
  title,
  children,
  onCancel,
  onCancelText = "Cancel",
  onConfirm,
  confirmText = "Yes",
}) => {
  return (
    <div className="app_modal_backdrop">
      <div className="app_modal_container">
        {title && <h2 className="app_modal_title">{title}</h2>}
        <div className="app_modal_content">{children}</div>
        <div className="app_modal_actions">
          {onCancel && (
            <button onClick={onCancel} className="app_btn_confirm">
              {onCancelText}
            </button>
          )}
          {onConfirm && (
            <button onClick={onConfirm} className="app_btn_confirm">
              {confirmText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
