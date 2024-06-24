import React from "react";
import { LoadScript } from "@react-google-maps/api";
import PropTypes from 'prop-types'; // Import PropTypes

const libraries = ["places"];

const LoadGoogleMaps = ({ children }) => {
    
  return (
    <LoadScript
      googleMapsApiKey="AIzaSyC-hVQKjNv0wcLN-e1F1rGrseh7KduRVdU" // Replace with your actual API key
      libraries={libraries}
    >
      {children}
    </LoadScript>
  );
};

// Add PropTypes validation
LoadGoogleMaps.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LoadGoogleMaps;
