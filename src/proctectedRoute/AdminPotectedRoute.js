import React from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({ element }) => {
    const role = localStorage.getItem("role");
    console.log('Role from localStorage:', role);
  
    if (!role) {
      console.log('No role found, redirecting to login');
      return <Navigate to="/authentication/log-in" />;
    }
  
    const isAdmin = role === "admin";
    console.log('Is Admin:', isAdmin);
  
    return isAdmin ? element : <Navigate to="/authentication/log-in" />;
  };
  

AdminProtectedRoute.propTypes = {
  element: PropTypes.element.isRequired,
};

export default AdminProtectedRoute;
