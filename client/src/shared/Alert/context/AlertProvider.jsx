import React, { useReducer, useCallback } from "react";
import { AlertContext } from "./AlertContext";
import Alert from "../index"; // assumes your Alert.jsx is one level above context folder

// Action Types
const SHOW_ALERT = "SHOW_ALERT";
const HIDE_ALERT = "HIDE_ALERT";

// Initial State
const initialState = {
  show: false,
  message: "",
  title: "",
  confirmText: "Yes",
  cancelText: "No",
  onConfirm: null,
};

// Reducer
function alertReducer(state, action) {
  switch (action.type) {
    case SHOW_ALERT:
      return {
        show: true,
        ...action.payload,
      };
    case HIDE_ALERT:
      return initialState;
    default:
      return state;
  }
}

export const AlertProvider = ({ children }) => {
  const [state, dispatch] = useReducer(alertReducer, initialState);

  const showAlert = useCallback(
    ({ title, message, confirmText = "Yes", cancelText = "No", onConfirm }) => {
      dispatch({
        type: SHOW_ALERT,
        payload: {
          title,
          message,
          confirmText,
          cancelText,
          onConfirm,
        },
      });
    },
    []
  );

  const hideAlert = () => dispatch({ type: HIDE_ALERT });

  const handleConfirm = () => {
    if (typeof state.onConfirm === "function") {
      state.onConfirm();
    }
    hideAlert();
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {state.show && (
        <Alert
          title={state.title}
          message={state.message}
          confirmText={state.confirmText}
          cancelText={state.cancelText}
          onConfirm={handleConfirm}
          onCancel={hideAlert}
        />
      )}
    </AlertContext.Provider>
  );
};
