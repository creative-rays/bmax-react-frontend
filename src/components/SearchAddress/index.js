import React, { useState, useCallback, useEffect, useMemo } from "react";
import { GoogleMap, Autocomplete, Marker, useJsApiLoader } from "@react-google-maps/api";
import { FormControlLabel, Checkbox, Grid, Box, Avatar, Typography } from "@mui/material";
import SoftInput from "components/SoftInput";
import DefaultLayout from "layouts/authentication/components/DefaultLayout/DefaultLayout";
import SoftBox from "components/SoftBox";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ClearIcon from "@mui/icons-material/Clear";
import SoftButton from "components/SoftButton";
import { useNavigate } from "react-router-dom";
import TodayIcon from "@mui/icons-material/Today";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import EventIcon from "@mui/icons-material/Event";
import { useGlobalState } from "globalState/globalState";
import { fetchWeatherData } from "./weatherUtils";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import AirIcon from "@mui/icons-material/Air";
import { GiWindsock } from "react-icons/gi";
import WeatherConditionsCard from "./components/WeatherConditionsCard";

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
  const [weatherData, setWeatherData] = useState([]);

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
    console.log("handleDateTimeChange:", index, field, value, [...dateTimeFields]);
    const newDateTimeFields = [...dateTimeFields]; // add old datetimeFields
    newDateTimeFields[index][field] = value; //{date:   time: } push date or time
    setDateTimeFields(newDateTimeFields); // setDateTimeFields

    const getCloseInterval = function (time, intervalArray) {
      let index = 0;

      const hour = +time.split(":")[0];

      console.log("h:", hour);

      //02:23 [0,6,18]                       0<2 && 6>2

      index = intervalArray.find((interval, index, array) => {
        console.log("last:", array.length === index + 1 ? 24 : index + 1);

        if (array.length === index + 1) {
          //last index
          return index;
        }

        return interval <= hour && array[index + 1] > hour;
      });

      return index.toString().padStart(2, "0") + ":00:00Z";
    };

    if (newDateTimeFields[index].date && newDateTimeFields[index].time) {
      try {
        const weatherTimeseries = await fetchWeatherData(center.lat, center.lng);

        const timeInterval = [0, 6, 18];

        const timeFormat = getCloseInterval(newDateTimeFields[index].time, timeInterval);

        const selectedDateTime = `${newDateTimeFields[index].date}T${timeFormat}`;
        const weather = weatherTimeseries.find((item) => item.time === selectedDateTime);

        console.log("find output weather by datetime:", selectedDateTime, weather);

        if (weather) {
          const updatedWeatherData = [...weatherData];
          updatedWeatherData[index] = {
            date: newDateTimeFields[index].date,
            time: newDateTimeFields[index].time,
            weather: {
              temperature: weather.data.instant.details.air_temperature,
              air_pressure: weather.data.instant.details.air_pressure_at_sea_level,
              cloud_area_fraction: weather.data.instant.details.cloud_area_fraction,
              relative_humidity: weather.data.instant.details.relative_humidity,
              wind_direction: weather.data.instant.details.wind_from_direction,
              wind_speed: weather.data.instant.details.wind_speed,
              icon:
                weather.data.next_1_hours?.summary.symbol_code ||
                weather.data.next_6_hours?.summary.symbol_code ||
                weather.data.next_12_hours?.summary.symbol_code ||
                "default_icon",
            },
          };
          console.log("orginal output:---", updatedWeatherData, weather);
          setWeatherData(updatedWeatherData);
        } else {
          console.error("Weather data not available for date:", selectedDateTime);
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

  const handleDateValidation = (e) => {
    const selectedDate = e.target.value;
    console.log("handle blur", selectedDate);
    // Check if the selected date is within the allowed range
    if (selectedDate < currentDate || selectedDate > formattedMaxDate) {
      alert(`Please select a date between ${currentDate} and ${formattedMaxDate}.`);
      e.target.value = currentDate; // Reset the date to a valid value
      // handleDateTimeChange(index, "date", currentDate);
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
          <Typography color="#fff" variant="body2">
            <span style={{ fontWeight: "800" }}>Deliver to</span> {address}
          </Typography>
          {weatherData &&
            dateTimeFields &&
            dateTimeFields.map((field, index) => {
              if (!field.date || !field.time) {
                return null;
              }

              const weatherForDate = weatherData[index]?.weather || {};

              console.log("weatherForDate:", weatherForDate);

              if (!weatherForDate || Object.keys(weatherForDate).length === 0) {
                return (
                  <Typography key={index} color="#fff" variant="body2" mt={2}>
                    Weather data not available for {field.date}, {field.time}
                  </Typography>
                );
              }

              // 2024-08-28

              const customDateFormat = `${field.date.split("-")[2]}/${field.date.split("-")[1]}/${
                field.date.split("-")[0]
              }`;

              return (
                <>
                  <WeatherConditionsCard
                    index={index}
                    date={customDateFormat}
                    time={field.time}
                    weatherForDate={weatherForDate}
                  />

                  {/* <Box key={index} color="#fff" mt={2} p={2} bgcolor="#333" borderRadius={4}>
                    <Typography variant="body2">
                      On {field.date}, {field.time}
                    </Typography>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item>
                        {weatherForDate.icon && (
                          <Avatar
                            src={`https://api.met.no/images/weathericons/svg/${weatherForDate.icon}.svg`}
                            alt="Weather Icon"
                            sx={{ width: 24, height: 24 }}
                          />
                        )}
                      </Grid>
                      <Grid item>
                        <Typography variant="body2">
                          Temperature: {weatherForDate.temperature}°C
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body2">
                          Air Pressure: {weatherForDate.air_pressure} hPa
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body2">
                          Cloud Area Fraction: {weatherForDate.cloud_area_fraction}%
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body2">
                          Relative Humidity: {weatherForDate.relative_humidity}%
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body2">
                          Wind Direction: {weatherForDate.wind_direction}°
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body2">
                          Wind Speed: {weatherForDate.wind_speed} m/s
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box> */}
                </>
              );
            })}
        </Box>
      </Grid>
    </Box>
  );

  // Get the current date
  const currentDate = new Date().toISOString().split("T")[0];

  // Calculate the max date (9 days from the current date)
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 9);
  const formattedMaxDate = maxDate.toISOString().split("T")[0];

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
                      component: !address ? (
                        "search"
                      ) : (
                        <Box sx={{ cursor: "pointer" }}>
                          {address && <ClearIcon onClick={handleClear} />}
                        </Box>
                      ),
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
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
                onLoad={onMapLoad}
              >
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
                  <Typography
                    fontSize="1rem"
                    sx={{ textTransform: "capitalize", color: "#000" }}
                    variant="h5"
                  >
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
                  {dateTimeFields.map((field, index) => {
                    const customDateFormat = `${field.date.split("-")[2]}/${
                      field.date.split("-")[1]
                    }/${field.date.split("-")[0]}`;

                    return (
                      <>
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
                                  onBlur={handleDateValidation}
                                  onClick={() => console.log("on click")}
                                  onChange={(e) =>
                                    handleDateTimeChange(index, "date", e.target.value)
                                  }
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
                                  inputProps={{
                                    min: currentDate,
                                    max: formattedMaxDate,
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
                                  onChange={(e) =>
                                    handleDateTimeChange(index, "time", e.target.value)
                                  }
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
                          {/* {weatherData[index] && (
                          <Grid item xs={12}>
                            <Typography
                              key={index}
                              variant="body2"
                              fontSize={".9rem"}
                              sx={{ display: "flex", alignItems: "center", gap: "10px" }}
                            >
                              {weatherData[index]?.weather?.icon && (
                                <Avatar
                                  src={`https://api.met.no/images/weathericons/svg/${weatherData[index].weather.icon}.svg`}
                                  alt="Weather Icon"
                                  sx={{ width: 24, height: 24 }}
                                />
                              )}
                              <span>Temperature: {weatherData[index].weather.temperature}°C</span>
                              <span style={{ marginLeft: "10px" }}>
                                Air Pressure: {weatherData[index].weather.air_pressure} hPa
                              </span>
                              <span style={{ marginLeft: "10px" }}>
                                Cloud Area Fraction:{" "}
                                {weatherData[index].weather.cloud_area_fraction}%
                              </span>
                              <span style={{ marginLeft: "10px" }}>
                                Relative Humidity: {weatherData[index].weather.relative_humidity}%
                              </span>
                              <span style={{ marginLeft: "10px" }}>
                                Wind Direction: {weatherData[index].weather.wind_direction}°
                              </span>
                              <span style={{ marginLeft: "10px" }}>
                                Wind Speed: {weatherData[index].weather.wind_speed} m/s
                              </span>
                            </Typography>
                          </Grid>
                          //    <WeatherConditionsCard
                          //    index={index}
                          //    date={customDateFormat}
                          //    time={field.selectedDateTime}
                          //    weatherForDate={weatherData[index].weather}
                          //  />
                        )} */}
                        </Grid>
                        {weatherData[index] && (
                          <WeatherConditionsCard
                            key={index}
                            index={index}
                            date={customDateFormat}
                            time={field.time}
                            weatherForDate={weatherData[index].weather}
                          />
                        )}
                      </>
                    );
                  })}
                </Box>
              )}
              <Grid container justifyContent={"flex-end"}>
                <Grid item xs={12} sm={4} md={3} py={4}>
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
