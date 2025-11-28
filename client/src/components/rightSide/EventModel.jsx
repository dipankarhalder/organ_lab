import { useState, useEffect } from "react";
import { Cross } from "../../icons";

export const EventModal = ({ date, onSave, onClose, initialTitle }) => {
  const [title, setTitle] = useState(initialTitle);

  useEffect(() => {
    setTitle(initialTitle);
  }, [initialTitle]);

  const handleSave = () => {
    if (!title.trim()) return;
    onSave(date, title.trim());
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>
          Add/Edit Event for {date}{" "}
          <div className="app_close_btn_pop" onClick={onClose}>
            <Cross />
          </div>
        </h3>
        <div className="model_row">
          <input
            type="text"
            placeholder="Event title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="modal-actions">
            <button onClick={handleSave}>Save</button>
            <button onClick={onClose}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};
