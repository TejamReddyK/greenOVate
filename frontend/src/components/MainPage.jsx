import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import Summary from "./Summary";
import Results from "./Results";
import axios from "axios";
import './MainPage.css';

const MainPage = () => {
  const navigate = useNavigate();
  const [activeComponent, setActiveComponent] = useState("Dashboard");
 
  const handleLogout = async() => {

    try {
      const token = localStorage.getItem("token"); // Retrieve the token from localStorage
      const endpoint = `${process.env.REACT_APP_API_URL}/api/auth/logout/`;
      
      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`, // Set the Authorization header with the token
        },
      });
      
      console.log(response);
    } catch (error) {
      console.log(error);
      localStorage.removeItem("token"); // Clear token
      navigate("/"); // Redirect to Auth page
    }

    localStorage.removeItem("token"); // Clear token
    navigate("/"); // Redirect to Auth page
  };

  return (
    <div>
      
      <nav className="navigation">
      <h1 className="heading">GreenOVate</h1>
        <ul>
          <li className={activeComponent === "Dashboard" ? "active" : "" } onClick={() => setActiveComponent("Dashboard")}>Dashboard</li>
          <li  className={activeComponent === "Summary" ? "active" : ""} onClick={() => setActiveComponent("Summary")}>Summary</li>
          <li  className={activeComponent === "Results" ? "active" : ""}
          onClick={() => setActiveComponent("Results")}>Results</li>
          <li onClick={handleLogout}>Logout</li>
        </ul>
      </nav>
      <div className="content">
        <Routes>
          <Route
            path="/"
            element={
              activeComponent === "Dashboard" ? (
                <Dashboard />
              ) : activeComponent === "Summary" ? (
                <Summary />
              ) : (
                <Results />
              )
            }
          />
        </Routes>
      </div>
      <div className="content tech">
        <h3>TechStack</h3>
        <ul>
          <li>Frontend: React.js</li>
          <li>Backend: SpringBoot 3.0</li>
          <li>Server: Embedded Tomcat Server</li>
          <li>Security: Spring Security enabled with JWT Authentication</li>
          <li>ORM: Spring Data JPA</li>
          <li>Database: MySQL</li>
        </ul>
      </div>
    </div>
  );
};

export default MainPage;




