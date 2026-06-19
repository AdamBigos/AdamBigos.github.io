import React from "react";
import ReactDOM from "react-dom/client";
import { IncidentReport } from "@/components/IncidentReport";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <IncidentReport />
  </React.StrictMode>,
);
