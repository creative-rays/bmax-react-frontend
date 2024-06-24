import React from "react";
import PropTypes from "prop-types";
import { Grid, Typography, Button, TextField } from "@mui/material";
import SoftButton from "components/SoftButton";
import pumpmixer from "assets/images/pumpmixer.jpg"

const PumpMixer = ({ onClose }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h2" align="center">
          24m Pump mixer !
        </Typography>
        <Grid display={"flex"} justifyContent={"center"}>
          <img
              src={pumpmixer}
              alt="pumpmixer"
              style={{ maxWidth: "200px", height: "100%" }}
            />
        </Grid>
        <Typography variant="h6" align="center" style={{ marginTop: "10px" }}>
          Often used for these projects :
        </Typography>
        <TextField
          variant="outlined"
          value="Basement floors, plastering and the like"
          fullWidth
          readOnly
          style={{ marginBottom: "10px" }}
        />
        <Typography variant="body2" mt={1} align="center"> 
          A pump mixer  weighs up to 32 tonnes fully loaded, and can take up to 4-5 cubic meters depending on weight restrictions and consistency.
        </Typography>
        <Typography variant="body2" mt={1} align="center">
          The pump mixer has many applications,  and in combination with the 24 meter tower with the addition of hoses of up to 50m, there are few places such a car cannot get to and get cast. It is particularly important to note that such a car requires a lot of space, both on the side and in height. There must be no cable tension in the immediate vicinity or over the installation space. At the same time, there must be room for folding out support legs in a width of 1-3 meters on each side.
        </Typography>
        <Typography variant="body2" mt={1} align="center">
          Delivery with a pump mixer  often costs a bit more, and the final price depends on the time spent, how many cubic meters are to be pumped and whether a helper is needed to assist with carrying hoses and the like, as well as whether the pump mixer can be cleaned on site or has to be returned to the concrete station for flushing and cleaning.
        </Typography>
       
        <Typography variant="body2" mt={1} align="center">
          When you select &quot;Add pump waste (0.5m³) an extra half cubic meter is added. This as approx. 0.5m³ is always used in pipes, towers, troughs etc.
        </Typography>
        <Typography variant="body2" mt={1} align="center">
          When you select &quot;Wash on mixing plant&quot;,  the pump will, as far as possible, minimize spillage on the construction site and wash the pump on mixing plant.
        </Typography>
        <Typography variant="body2" mt={1} mb={2} align="center">
          When you select &quot;Add hoses&quot;  you can enter the number of meters of hoses needed from the rear edge of the pump mixer/tower to the unloading area. Normally, pump mixers have up to 50m on the car.
        </Typography>
        <SoftButton
          variant="contained"
          color="info"
          fullWidth
          onClick={onClose}
          sx={{
            width: "100%",
            height: "10px",
            borderRadius: "7px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transition: "box-shadow 0.3s ease",
            padding: "26px",
            cursor: "pointer",
          }}
        >
          CLOSE
        </SoftButton>
      </Grid>
    </Grid>
  );
};

PumpMixer.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default PumpMixer;
