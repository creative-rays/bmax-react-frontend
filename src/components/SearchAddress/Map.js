import React, { useState, useEffect, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { GoogleMap, Marker, useJsApiLoader, DrawingManager } from "@react-google-maps/api";
import { Box, Grid, Typography } from "@mui/material";
import SoftButton from "components/SoftButton";
import { Edit, Refresh, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const containerStyle = {
  width: "800px",
  height: "570px",
  overflow: "hidden",
  boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
};

const libraries = ["places", "geometry", "drawing"];

const Map = ({ address, onAreaChange, onSave }) => {
  const navigate = useNavigate();
  const { isLoaded } = useJsApiLoader(
    useMemo(
      () => ({
        googleMapsApiKey: "AIzaSyC-hVQKjNv0wcLN-e1F1rGrseh7KduRVdU",
        libraries,
      }),
      []
    )
  );
  const [map, setMap] = useState(null);
  const [allPolygons, setAllPolygons] = useState([]);
  const [selectedPolygon, setSelectedPolygon] = useState(null);
  const [marker, setMarker] = useState(null);
  const [totalArea, setTotalArea] = useState(0);
  const [center, setCenter] = useState({ lat: -34.397, lng: 150.644 });

  const onLoad = (mapInstance) => {
    setMap(mapInstance);
  };

  useEffect(() => {
    if (isLoaded && address && map) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address }, (results, status) => {
        if (status === "OK" && results[0]) {
          const location = results[0].geometry.location;
          const latLng = { lat: location.lat(), lng: location.lng() };
          setCenter(latLng);
          map.setCenter(latLng);
          map.setZoom(20);
          if (marker) {
            marker.setMap(null);
          }
          const newMarker = new window.google.maps.Marker({
            position: latLng,
            map: map,
          });
          setMarker(newMarker);
        }
      });
    }
  }, [isLoaded, address, map]);

  const onPolygonComplete = useCallback(
    (polygon) => {
      setAllPolygons((currentPolygons) => [...currentPolygons, polygon]);
      calculateTotalArea([...allPolygons, polygon]);

      polygon.addListener("click", () => {
        if (selectedPolygon) {
          selectedPolygon.setOptions({ fillColor: "#FF0000" });
        }
        setSelectedPolygon(polygon);
        polygon.setOptions({ fillColor: "#00FF00" });
      });
    },
    [allPolygons, selectedPolygon]
  );

  const calculateTotalArea = (polygons) => {
    let area = 0;
    polygons.forEach((polygon) => {
      area += window.google.maps.geometry.spherical.computeArea(polygon.getPath());
    });
    setTotalArea(area);
  };

  const resetMap = () => {
    allPolygons.forEach((polygon) => polygon.setMap(null));
    setAllPolygons([]);
    setTotalArea(0);
    setSelectedPolygon(null);
  };

  const deleteSelectedPolygon = () => {
    if (selectedPolygon) {
      selectedPolygon.setMap(null);
      const remainingPolygons = allPolygons.filter((polygon) => polygon !== selectedPolygon);
      setAllPolygons(remainingPolygons);
      calculateTotalArea(remainingPolygons);
      setSelectedPolygon(null);
    }
  };

  const handleSave = () => {
    onAreaChange(totalArea);
    onSave();
  };

  const handleEdit = () => {
    console.log("Edit button clicked"); // Check if this message appears in the console upon clicking the button
    navigate("/search-address");
  };

  return isLoaded ? (
    <Box>
    <Grid container spacing={2} alignItems="center" sx={{ mb: 2, px: { xs: 1, sm: 2 } }}>
      <Grid item xs={4} sm={2} md={1}>
        <SoftButton variant="contained" color="info" title="Reset" onClick={resetMap} fullWidth>
          <Refresh sx={{ color: "#fff", width: "20px", height: "20px" }} />
        </SoftButton>
      </Grid>
      {allPolygons.length > 0 && (
        <>
          <Grid item xs={4} sm={2} md={1}>
            <SoftButton
              variant="gradient"
              title="Delete"
              onClick={deleteSelectedPolygon}
              fullWidth
              sx={{
                backgroundColor: "red",
                "&:hover": {
                  backgroundColor: "red",
                },
              }}
            >
              <Delete sx={{ color: "#fff", width: "20px", height: "20px" }} />
            </SoftButton>
          </Grid>
          <Grid item xs={false} sm={false} md={8}></Grid>
          <Grid item xs={4} sm={4} md={2} sx={{ display: "flex", justifyContent: { xs: "center", md: "flex-end" } }}>
            <SoftButton
              sx={{ marginLeft: { xs: 0, md: "auto" }, marginRight: { xs: 0, md: "30px" } }}
              variant="outlined"
              color="info"
              title="Edit Address"
              onClick={handleEdit}
            >
              <Edit sx={{ color: "#17C1E8", marginRight: 1, width: "20px", height: "20px" }} />
            </SoftButton>
          </Grid>
        </>
      )}
    </Grid>

    <Box id="map" style={containerStyle}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={20} onLoad={onLoad}>
        {marker && <Marker position={marker.getPosition()} />}
        <DrawingManager
          onPolygonComplete={onPolygonComplete}
          options={{
            drawingControl: true,
            drawingControlOptions: {
              position: window.google.maps.ControlPosition.TOP_CENTER,
              drawingModes: ["polygon"],
            },
            polygonOptions: {
              editable: true,
              draggable: true,
            },
          }}
        />
      </GoogleMap>
    </Box>

    <Grid container spacing={2} p={2} alignItems="center">
      <Grid item xs={12} sm={9} md={9}>
        <Typography id="area">
          Total area of all polygons: {totalArea.toFixed(2)} square meters
        </Typography>
      </Grid>
      <Grid item xs={12} sm={3} md={3}>
        <SoftButton variant="contained" color="info" fullWidth onClick={handleSave}>
          SAVE
        </SoftButton>
      </Grid>
    </Grid>
  </Box>

  ) : (
    <p>Loading...</p>
  );
};

Map.propTypes = {
  address: PropTypes.string.isRequired,
  onAreaChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default Map;
