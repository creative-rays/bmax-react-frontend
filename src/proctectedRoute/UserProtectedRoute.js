import React from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

const VendorProtectedRoute = ({ element }) => {
  const vendorRole = localStorage.getItem("vendorRole");

  if (!vendorRole) {
    // If vendorRole doesn't exist, redirect to login page
    return <Navigate to="/login" />;
  }

  // Check if the vendorRole is "vendorRole"
  const isVendor = vendorRole === "vendorRole";

  return isVendor ? element : <Navigate to="/login" />;
};

VendorProtectedRoute.propTypes = {
  element: PropTypes.element.isRequired,
};

export default VendorProtectedRoute;
