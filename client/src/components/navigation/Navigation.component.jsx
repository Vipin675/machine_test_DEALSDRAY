import React, { useContext } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

import "./navigation.styles.css";
import { UserContext } from "../../context/UserContext";

const Navigation = () => {
  const { isAuthenticated } = useContext(UserContext);
  const curr_location = useLocation();
  const navigate = useNavigate();
  const { logout } = useContext(UserContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="nav-p-container">
      <span className="nav-header">Logo</span>

      {isAuthenticated && (
        <nav className="nav-container">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/employee-list">Employee List</Link>
            </li>
            <li>
              <span>{localStorage.getItem("currentUser")}</span>
            </li>
            <li>
              <span className="logout" onClick={handleLogout}>
                Logout
              </span>
            </li>
          </ul>
        </nav>
      )}
      <span className="current_path">{curr_location.pathname}</span>
      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes.*/}
      <Outlet />
    </div>
  );
};

export default Navigation;
