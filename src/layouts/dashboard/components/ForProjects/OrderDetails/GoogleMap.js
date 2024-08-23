import React from "react";
import PropTypes from "prop-types";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "12px",
  overflow: "hidden",
  boxShadow:
    "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
};

const libraries = ["places", "geometry", "drawing"];

function MyGoogleMap({ lat, lng }) {
  const center = React.useMemo(() => ({ lat, lng }), [lat, lng]);
  const [map, setMap] = React.useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyC-hVQKjNv0wcLN-e1F1rGrseh7KduRVdU",
    libraries,
  });

  const onLoad = React.useCallback((map) => {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, [center]);

  const onUnmount = React.useCallback(() => {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <Marker position={center} />
    </GoogleMap>
  ) : (
    <></>
  );
}

MyGoogleMap.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
};

export default MyGoogleMap;
