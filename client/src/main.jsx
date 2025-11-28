import "./styles/global.scss";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { ToastProvider } from "./shared/Toast/context/ToastProvider";
import { AlertProvider } from "./shared/Alert/context/AlertProvider";

const core = document.getElementById("root");
createRoot(core).render(
  <StrictMode>
    <ToastProvider>
      <AlertProvider>
        <App />
      </AlertProvider>
    </ToastProvider>
  </StrictMode>
);
