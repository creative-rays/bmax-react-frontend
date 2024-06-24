import React from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element, allowedRoles }) => {
  const role = localStorage.getItem("role");

  if (!role) {
    return <Navigate to="/authentication/log-in" />;
  }

  const isAllowed = allowedRoles.includes(role);

  return isAllowed ? element : <Navigate to="/authentication/log-in" />;
};

ProtectedRoute.propTypes = {
  element: PropTypes.element.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ProtectedRoute;
