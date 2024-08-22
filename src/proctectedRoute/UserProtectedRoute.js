import React from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

const VendorProtectedRoute = ({ element }) => {
  const vendorRole = localStorage.getItem("role");

  if (!vendorRole) {
    // If vendorRole doesn't exist, redirect to login page
    return <Navigate  to="/authentication/log-in" />;
  }

  // Check if the vendorRole is "vendorRole"
  const isVendor = vendorRole === "vendor";

  return isVendor ? element : <Navigate to="/authentication/log-in" />;
};

VendorProtectedRoute.propTypes = {
  element: PropTypes.element.isRequired,
};

export default VendorProtectedRoute;
