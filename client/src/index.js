import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { UserProvider } from "./context/UserContext";
import { EmployeeProvider } from "./context/EmployeeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <EmployeeProvider>
        <App />
      </EmployeeProvider>
    </UserProvider>
  </React.StrictMode>
);
