

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";

import "../styles/Login.scss";

import Header from "../components/Layout/Header";
// import Alert from '@mui/material/Alert';
// import Stack from '@mui/material/Stack';


const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Hardcoded credentials
    if (formData.email === "test@gmail.com" && formData.password === "123456") {
      localStorage.setItem("token", "dummyToken"); // Fake token storage
      // alert("Login Successful!");
      
      navigate("/register"); // Redirect to FormComponent
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <>
      <Header />
      <div className="login-container">
        <h2>Login to Your Account</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email/ID</label>
            <div className="input-field">
              <FaUser className="icon" />
              <input
                type="email"
                name="email"
                placeholder="Enter Registered Email"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label>Password</label>
            <div className="input-field">
              <FaLock className="icon" />
              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button type="submit" className="login-btn">Login</button>
        </form>
      </div>
    </>
  );
};

export default Login;

