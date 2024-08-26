import React from "react";
import PropType from "prop-types";
import { Grid, Box, Avatar, Typography } from "@mui/material";

import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import AirIcon from "@mui/icons-material/Air";
import { GiWindsock } from "react-icons/gi";

function WeatherConditionsCard({ date, time, weatherForDate, index }) {
  return (
    <Box key={index} color="#fff" mt={2} p={2} bgcolor="#333" borderRadius={4}>
      <Typography variant="body2">
        Condition On {date}, {time}
      </Typography>
      <Grid
        container
        direction="row"
        // p={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 3 }}
        // spacing={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 4 }}
        alignItems="center"
      >
        <Grid item xs={2}>
          {weatherForDate.icon && (
            <Avatar
              src={`https://api.met.no/images/weathericons/svg/${weatherForDate.icon}.svg`}
              alt="Weather Icon"
              sx={{ width: 48, height: 48 }}
            />
          )}
        </Grid>
        <Grid item xs={3}>
          <Grid container direction="row" alignItems="center" spacing={1}>
            <Grid item>
              <DeviceThermostatIcon
                sx={{
                  color:  "white",
                  fontSize: {
                    xs: "0.3rem", // Size for extra-small screens
                    sm: "0.5rem", // Size for small screens
                    md: "1rem", // Size for medium screens
                    lg: "1rem", // Size for large screens
                    xl: "1.5rem", // Size for extra-large screens
                  },
                }}
              />
            </Grid>
            <Grid item>
              <Typography
                variant="body2"
                fontWeight="semibold"
                sx={{
                  color:  "white",
                  fontSize: {
                    xs: "0.3rem", // Size for extra-small screens
                    sm: "0.5rem", // Size for small screens
                    md: "1rem", // Size for medium screens
                    lg: "1rem", // Size for large screens
                    xl: "1.5rem", // Size for extra-large screens
                  },
                }}
              >
                {weatherForDate.temperature}°
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        {/* <Grid item>
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
      </Grid> */}
        <Grid item xs={3}>
          <Grid container direction="row" alignItems="center" spacing={1}>
            <Grid item>
              <GiWindsock
                sx={{
                  color: "white",
                  fontSize: {
                    xs: "0.3rem", // Size for extra-small screens
                    sm: "0.5rem", // Size for small screens
                    md: "1rem", // Size for medium screens
                    lg: "1rem", // Size for large screens
                    xl: "1.5rem", // Size for extra-large screens
                  },
                }}
              />
            </Grid>
            <Grid item>
              <Typography
                variant="body2"
                fontWeight="semibold"
                sx={{
                  color: "white",
                  fontSize: {
                    xs: "0.3rem", // Size for extra-small screens
                    sm: "0.5rem", // Size for small screens
                    md: "1rem", // Size for medium screens
                    lg: "1.3rem", // Size for large screens
                    xl: "1.5rem", // Size for extra-large screens
                  },
                }}
              >
                {weatherForDate.wind_direction}°
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        {/* <Grid item>
        <GiWindsock />
        <Typography variant="body2">{weatherForDate.wind_direction}°</Typography>
      </Grid> */}
        <Grid item xs={3}>
          <Grid container direction="row" alignItems="center" spacing={1}>
            <Grid item>
              <AirIcon
                sx={{
                  color: "white",
                  fontSize: {
                    xs: "0.3rem", // Size for extra-small screens
                    sm: "0.5rem", // Size for small screens
                    md: "1rem", // Size for medium screens
                    lg: "1rem", // Size for large screens
                    xl: "1.5rem", // Size for extra-large screens
                  },
                }}
              />
            </Grid>
            <Grid item>
              <Grid container direction="row" alignItems="baseline" spacing={1}>
                <Grid item>
                  <Typography
                    variant="body2"
                    fontWeight="semibold"
                    sx={{
                      color:  "white",
                      fontSize: {
                        xs: "0.3rem", // Size for extra-small screens
                        sm: "0.5rem", // Size for small screens
                        md: "1rem", // Size for medium screens
                        lg: "1rem", // Size for large screens
                        xl: "1.5rem", // Size for extra-large screens
                      },
                    }}
                  >
                    {weatherForDate.wind_speed}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: {
                        xs: "0.3rem", // Size for extra-small screens
                        sm: "0.3rem", // Size for small screens
                        md: "0.5rem", // Size for medium screens
                        lg: "0.7rem", // Size for large screens
                        xl: "0.9rem", // Size for extra-large screens
                      },
                    }}
                  >
                    m/s
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/* <Grid item>
        <AirIcon />
        <Typography variant="body2">{weatherForDate.wind_speed} m/s</Typography>
      </Grid> */}
      </Grid>
    </Box>
  );
}

WeatherConditionsCard.propTypes = {
  index: PropType.number.isRequired,
  date: PropType.string.isRequired,
  time: PropType.string.isRequired,
  weatherForDate: PropType.object.isRequired,
};

export default WeatherConditionsCard;
