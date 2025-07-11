// components/PrivateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, roles = [] }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (roles.length > 0 && !roles.includes(userRole)) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default PrivateRoute;
