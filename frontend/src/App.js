import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MainPage from "./components/MainPage";
import Auth from "./components/Auth";
import PrivateRoute from "./components/PrivateRoute";
import "./App.css";

function App() {
  const isAuthenticated = !!localStorage.getItem("token"); // Checks if the user is authenticated
  return (
    <Router>
      <Routes>
        {/* Login Route - Redirect to main if authenticated */}
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/main" /> : <Auth />}
        />

        {/* Main route protected by PrivateRoute */}
        <Route
          path="/main"
          element={
            <PrivateRoute>
              <MainPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
