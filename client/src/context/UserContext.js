import React, { createContext, useState, useEffect } from "react";

const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => {},
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  login: async () => {},
  logout: () => {},
});

const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    localStorage.getItem("currentUser") || null
  );
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");

        if (accessToken) {
          const response = await fetch(
            "http://localhost:5000/api/admins/verify",
            {
              method: "GET",
              headers: { Authorization: `Bearer ${accessToken}` },
            }
          );

          const data = await response.json();

          if (data.success) {
            setCurrentUser(data.user);
            setIsAuthenticated(true);
          }
        }
      } catch (err) {
        console.error(err);
      }
    };

    checkLoginStatus();
  }, []);

  const login = async (credentials) => {
    try {
      const response = await fetch("http://localhost:5000/api/admins/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      console.log(data);

      if (data.success) {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("currentUser", data.currentUser);
        localStorage.setItem("isAuthenticated", "true");
        setCurrentUser(data.user);
        setIsAuthenticated(true);
      } else {
        console.error("Login failed:", data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("isAuthenticated");
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    currentUser,
    setCurrentUser,
    isAuthenticated,
    setIsAuthenticated,
    login,
    logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
