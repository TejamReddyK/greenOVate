import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Auth.css";
import "./MainPage.css";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Signup
  const [formData, setFormData] = useState({
    username: "", // Only required for registration
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isLogin
        ? `${process.env.REACT_APP_API_URL}/api/auth/login`
        : `${process.env.REACT_APP_API_URL}/api/auth/register`;
      const response = await axios.post(endpoint, formData);
      console.log(response.data);
      const token = response.data;
      if (token) {
        localStorage.setItem("token", token); // Save token to localStorage
        navigate("/main"); // Redirect to main page
      }
    } catch (error) {
      console.log(error);
      setError(
        error.response.data || "An error occurred. Please try again."
      );
    }
  };

  return (
    <>
    <h1>GreenOVate</h1>
    <div className="auth-container">
      <h2>{isLogin ? "Login" : "Sign Up"}</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
      </form>
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin
          ? "Don't have an account? Sign Up"
          : "Already have an account? Login"}
      </button>
    </div>
    </>
  );
};

export default Auth;
