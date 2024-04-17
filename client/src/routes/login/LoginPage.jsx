import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import "./login.styles.css";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("isAuthenticated")) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await login({ f_userName: username, f_Pwd: password });
      navigate("/");
      // Optionally provide feedback for successful login
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 401) {
        setError("Invalid username or password");
      } else {
        setError("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="form-input-container">
          <label htmlFor="username" className="input-label">
            Username
          </label>
          <input
            className="input-box"
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            aria-label="Username"
          />
        </div>
        <div className="form-input-container">
          <label htmlFor="password" className="input-label">
            Password
          </label>
          <input
            className="input-box"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-label="Password"
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button className="login-button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
