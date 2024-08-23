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

const libraries = ["places"];

function MyGoogleMap({ lat, lng }) {
  // const center = {
  //     lat: -3.745,
  //     lng: -38.523
  //   };

  const center = React.useMemo(() => ({ lat, lng }), [lat, lng]);
  const [map, setMap] = React.useState(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyC-hVQKjNv0wcLN-e1F1rGrseh7KduRVdU",
    nonce: "map",
    libraries: ["places", "geometry", "drawing"],
  });
  React.useEffect(() => {}, []);

  const onLoad = React.useCallback((map) => {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback((map) => {
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
