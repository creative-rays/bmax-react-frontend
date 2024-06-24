import React, { useState, useCallback, useEffect, useMemo } from "react";
import { GoogleMap, Autocomplete, Marker, useJsApiLoader } from "@react-google-maps/api";
import RemoveIcon from "@mui/icons-material/Remove";
import ClearIcon from "@mui/icons-material/Clear";
import {
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Avatar,
  Typography,
} from "@mui/material";
import SoftInput from "components/SoftInput";
import DefaultLayout from "layouts/authentication/components/DefaultLayout/DefaultLayout";
import SoftBox from "components/SoftBox";
import AddIcon from "@mui/icons-material/Add";
import SoftButton from "components/SoftButton";
import { useNavigate } from "react-router-dom";
import CloudIcon from "@mui/icons-material/Cloud";
import TodayIcon from "@mui/icons-material/Today";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import EventIcon from "@mui/icons-material/Event";
import WbSunnyIcon from "@mui/icons-material/WbSunny"; // Import the sun icon
import NightsStayIcon from "@mui/icons-material/NightsStay";
import { useGlobalState } from "globalState/globalState";
import { fetchWeatherData } from './weatherUtils';

const containerStyle = {
  width: "100%",
  height: "600px",
  borderRadius: "12px",
  overflow: "hidden",
  boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
};

const initialCenter = {
  lat: -3.745,
  lng: -38.523,
};

const SearchAddress = () => {
  const [autocomplete, setAutocomplete] = useState(null);
  const [address, setAddress] = useState("");
  const [center, setCenter] = useState(initialCenter);
  const [markerPosition, setMarkerPosition] = useState(initialCenter);
  const [showMap, setShowMap] = useState(false);
  const [locationSelected, setLocationSelected] = useState(false);
  const [showDateTime, setShowDateTime] = useState(false);
  const [dateTimeFields, setDateTimeFields] = useState([{ date: "", time: "" }]);
  const [weatherData, setWeatherData] = useState([]); // Update type to WeatherDetails[]
  const navigate = useNavigate();
  const { dispatch } = useGlobalState();

  const libraries = useMemo(() => ["places", "geometry", "drawing"], []);

  const loaderOptions = useMemo(
    () => ({
      googleMapsApiKey: "AIzaSyC-hVQKjNv0wcLN-e1F1rGrseh7KduRVdU",
      libraries,
    }),
    [libraries]
  );

  const { isLoaded } = useJsApiLoader(loaderOptions);

  const handleLoad = (autocompleteInstance) => {
    setAutocomplete(autocompleteInstance);
  };

  const handleNextClick = () => {
    dispatch({
      type: "SET_PAGE_VALUES",
      payload: {
        address,
        dateTimeFields,
        weatherData,
      },
    });
    navigate("/calculate-area", { state: { address, dateTimeFields, weatherData } });
  };

  const handlePlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        const location = place.geometry.location;
        setAddress(place.formatted_address);
        setCenter({ lat: location.lat(), lng: location.lng() });
        setMarkerPosition({ lat: location.lat(), lng: location.lng() });
        setShowMap(true);
        setLocationSelected(true);
      }
    }
  };

  const handleClear = () => {
    setAddress("");
    setCenter(initialCenter);
    setMarkerPosition(initialCenter);
    setShowMap(false);
    setLocationSelected(false);
    setShowDateTime(false);
    setDateTimeFields([{ date: "", time: "" }]);
    setWeatherData([]);
  };

  const handleCheckboxChange = (event) => {
    setShowDateTime(event.target.checked);
  };

  const handleAddDateTimeField = () => {
    setDateTimeFields([...dateTimeFields, { date: "", time: "" }]);
  };

  const handleDateTimeChange = async (index, field, value) => {
    const newDateTimeFields = [...dateTimeFields];
    newDateTimeFields[index][field] = value;
    setDateTimeFields(newDateTimeFields);

    if (newDateTimeFields[index].date && newDateTimeFields[index].time) {
      try {
        const weather = await fetchWeatherData(
          center.lat,
          center.lng,
          newDateTimeFields[index].date,
          newDateTimeFields[index].time
        );

        if (weather) {
          const dummyWeather = {
            date: newDateTimeFields[index].date,
            time: newDateTimeFields[index].time,
            weather: weather, // Ensure weather structure matches what you expect
          };

          const updatedWeatherData = [...weatherData];
          updatedWeatherData[index] = dummyWeather;
          setWeatherData(updatedWeatherData);
        } else {
          console.error("Weather data not available");
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    } else {
      const updatedWeatherData = [...weatherData];
      updatedWeatherData[index] = null;
      setWeatherData(updatedWeatherData);
    }
  };
  const handleClearDateTimeField = (index) => {
    const newDateTimeFields = dateTimeFields.filter((_, i) => i !== index);
    setDateTimeFields(newDateTimeFields);

    const newWeatherData = weatherData.filter((_, i) => i !== index);
    setWeatherData(newWeatherData);
  };

  const onMapLoad = useCallback((map) => {
    const bounds = new window.google.maps.LatLngBounds(initialCenter);
    map.fitBounds(bounds);
  }, []);

  useEffect(() => {
    if (autocomplete && address) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: address }, (results, status) => {
        if (status === "OK" && results[0]) {
          const location = results[0].geometry.location;
          setCenter({ lat: location.lat(), lng: location.lng() });
          setMarkerPosition({ lat: location.lat(), lng: location.lng() });
          setShowMap(true);
          setLocationSelected(true);
        }
      });
    }
  }, [autocomplete, address]);

  const handleBoxClick = () => {
    handleCheckboxChange({ target: { name: "addPumpWaste", checked: !showDateTime } });
  };

  const handleCheckboxClick = (event) => {
    event.stopPropagation();
    handleCheckboxChange(event);
  };

  const isDayTime = (time) => {
    const hour = parseInt(time.split(":")[0], 10);
    return hour >= 6 && hour < 18;
  };

  const extraContent = (
    <Box
      sx={{
        height: "100%",
        minHeight: "80vh !important",
        backgroundColor: "#17C1E8",
        padding: "40px",
        marginTop: "160px",
      }}
    >
      <Grid container direction="column" gap={2}>
        <Typography color={"#fff"} variant="body2">
          <span style={{ fontWeight: "900", fontSize: "25px" }}>Step 1</span> Select Address
        </Typography>
        <Box
          p={2}
          sx={{
            border: "1px solid #fff",
            width: "100%",
            backgroundColor: "#17C1E8",
            borderRadius: "10px",
          }}
        >
          <Typography color={"#fff"} variant="body2">
            <span style={{ fontWeight: "800" }}>Deliver to</span> {address}
          </Typography>
          {dateTimeFields &&
            dateTimeFields.map((field, index) =>
              field.date && field.time ? (
                <Typography
                  key={index}
                  color={"#fff"}
                  variant="body2"
                  display={"flex"}
                  alignItems="center"
                  mt={2}
                >
                  On {field.date}{" "}
                  {isDayTime(field.time) ? (
                    <WbSunnyIcon
                      sx={{ color: "yellow", mx: "15px", width: "25px", height: "25px" }}
                    />
                  ) : (
                    <NightsStayIcon
                      sx={{ color: "#F6F1D5", mx: "15px", width: "25px", height: "25px" }}
                    />
                  )}
                  {weatherData && weatherData[index]?.weather}, {field.time}
                </Typography>
              ) : null
            )}
        </Box>
      </Grid>
    </Box>
  );

    return isLoaded ? (
      <DefaultLayout extraContent={extraContent}>
        <Grid container spacing={2} gap={2}>
          <Grid item xs={12} md={10} xl={8} mx="auto" mt={5} mb={10}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: locationSelected ? "flex-start" : "center",
                flexDirection: "column",
                width: "100%",
              }}
              mb={3}
            >
              <Grid container justifyContent="center">
                <Grid item xs={12}>
                  <Autocomplete onLoad={handleLoad} onPlaceChanged={handlePlaceChanged}>
                    <SoftInput
                      placeholder="Search Location.."
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      size="large"
                      icon={{
                        component: !address ? "search" : <Box sx={{ cursor: "pointer" }}>{address && <ClearIcon onClick={handleClear} />}</Box>,
                        direction: "right",
                      }}
                      sx={{ width: "100%" }} // Ensure the input field takes 100% width
                    />
                  </Autocomplete>
                </Grid>
              </Grid>
            </Box>

            {showMap && (
              <Box mt={3}>
                <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10} onLoad={onMapLoad}>
                  <Marker position={markerPosition} />
                </GoogleMap>
                <SoftBox py={2} sx={{ color: "info.main" }}>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: "#fff",
                      border: "1px solid #dee0e2",
                      padding: "8px",
                      borderRadius: "4px",
                      gap: "8px",
                      paddingLeft: 1,
                      "&:hover": {
                        border: "1px solid black",
                      },
                    }}
                    className="calculate_box"
                    onClick={handleBoxClick}
                  >
                    <Avatar sx={{ color: "#fff", bgcolor: "#17c1e8", width: "30px", height: "30px" }}>
                      <EventIcon />
                    </Avatar>
                    <Typography fontSize="1rem" sx={{ textTransform: "capitalize", color: "#000" }} variant="h5">
                      Choose Date & Time
                    </Typography>
                    <FormControlLabel
                      sx={{ marginLeft: "auto" }}
                      control={
                        <Checkbox
                          checked={showDateTime}
                          onChange={handleCheckboxClick}
                          name="addPumpWaste"
                          sx={{
                            "&:hover": {
                              border: "1px solid black",
                            },
                            "&:before": {
                              content: '""',
                              display: "inline-block",
                              width: "16px",
                              height: "16px",
                              border: "1px solid #dee0e2",
                              borderRadius: "4px",
                              backgroundColor: "#fff",
                              marginRight: "8px",
                              WebkitAppearance: "none", // WebKit-specific styling
                              MozAppearance: "none", // Firefox-specific styling
                              appearance: "none", // General styling
                            },
                            "&:checked:before": {
                              borderColor: "#21B4FD",
                            },
                          }}
                        />
                      }
                    />
                  </Box>
                </SoftBox>

                {showDateTime && (
                  <Box>
                {dateTimeFields.map((field, index) => (
                      <Grid container spacing={2} alignItems={"center"} key={index} mb={3}>
                        <Grid item xs={12}>
                          <Grid container spacing={2} alignItems={"center"}>
                            <Grid item xs={12} sm={6} md={6}>
                              <SoftInput
                                id={`date-${index}`}
                                label="Select Date"
                                size="large"
                                type="date"
                                value={field.date}
                                onChange={(e) => handleDateTimeChange(index, "date", e.target.value)}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                icon={{
                                  component: (
                                    <Box sx={{ cursor: "pointer" }}>
                                      <TodayIcon sx={{ color: "info.main" }} />
                                    </Box>
                                  ),
                                  direction: "left",
                                }}
                              />
                            </Grid>
                            <Grid item xs={12} sm={6} md={5}>
                              <SoftInput
                                id={`time-${index}`}
                                label="Select Time"
                                type="time"
                                size="large"
                                value={field.time}
                                onChange={(e) => handleDateTimeChange(index, "time", e.target.value)}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                icon={{
                                  component: (
                                    <Box sx={{ cursor: "pointer" }}>
                                      <AccessTimeFilledIcon sx={{ color: "info.main" }} />
                                    </Box>
                                  ),
                                  direction: "left",
                                }}
                              />
                            </Grid>
                            <Grid
                              item
                              xs={12}
                              sm={12}
                              md={1}
                              sx={{
                                display: "flex",
                                gap: "10px",
                                justifyContent: "center",
                                alignItems: "center",
                                padding: 0,
                                margin: 0,
                              }}
                            >
                              {index === 0 ? (
                                <SoftButton
                                  variant="contained"
                                  size="small"
                                  onClick={handleAddDateTimeField}
                                  color="info"
                                  sx={{
                                    gap: "3px",
                                    minWidth: 50,
                                    padding: "16px",
                                  }}
                                >
                                  <AddIcon fontSize="small" />
                                </SoftButton>
                              ) : (
                                <SoftButton
                                  variant="contained"
                                  size="small"
                                  color="info"
                                  onClick={() => handleClearDateTimeField(index)}
                                  sx={{
                                    gap: "3px",
                                    minWidth: 50,
                                    padding: "16px",
                                  }}
                                >
                                  <RemoveIcon fontSize="small" />
                                </SoftButton>
                              )}
                            </Grid>
                          </Grid>
                        </Grid>
                        {weatherData[index] && (
        <Grid item xs={12}>
          <Typography
            key={index}
            variant="body2"
            fontSize={".9rem"}
            sx={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            <span style={{ fontSize: "23px" }}>
              <CloudIcon sx={{ color: "info.main" }} />
            </span>
            {weatherData[index].weather}, {weatherData[index].date},{" "}
            {weatherData[index].time}
          </Typography>
        </Grid>
                        )}
                      </Grid>
                    ))}
                  </Box>
                )}
                <Grid container justifyContent={"flex-end"}>
                  <Grid item xs={12} sm={4} md={3}>
                    <SoftButton variant="contained" color="info" fullWidth onClick={handleNextClick}>
                      NEXT
                    </SoftButton>
                  </Grid>
                </Grid>
              </Box>
            )}
          </Grid>
        </Grid>
      </DefaultLayout>
    ) : (
      <></>
    );
  };

  export default SearchAddress;
