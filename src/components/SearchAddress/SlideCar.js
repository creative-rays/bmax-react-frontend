import React from "react";
import PropTypes from "prop-types";
import { Grid, Typography, Button, TextField } from "@mui/material";
import SoftButton from "components/SoftButton";
import racecar from "assets/images/racecar.jpg"

const SlideCar = ({ onClose }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h2" align="center">
        9m Race car !
        </Typography>
        <Grid display={"flex"} justifyContent={"center"}>
          <img
              src={racecar}
              alt="racecar"
              style={{ maxWidth: "200px", height: "100%" }}
            />
        </Grid>
        <Typography variant="h6" align="center" style={{ marginTop: "10px" }}>
          Often used for these projects :
        </Typography>
        <TextField
          variant="outlined"
          value="Garage slabs, soles, foundations"
          fullWidth
          readOnly
          style={{ marginBottom: "10px" }}
        />
        <Typography variant="body2" mt={1} align="center">
        A concrete truck with a hydraulic chute  has a reach of up to  9 metres.  The telescopic chute can be swung approximately  180 degrees  behind the car, and can therefore deliver approx.  90 degrees  perpendicularly from the car on each side. The chute depends on a good  fall  for the concrete to flow downwards, and the maximum delivery height will be approximately 1.70-1.90m above the ground, depending on ground conditions and installation.
        </Typography>
        <Typography variant="body2" mt={1} align="center">
        The concrete is fed unevenly  from the truck and normally comes flowing in pools, and it is therefore important to take this into account when unloading in e.g. ring walls. The chute will also swing slightly up and down during unloading, depending on how much concrete is in the chute.
        </Typography>
        <Typography variant="body2" mt={1} align="center" mb={2}>
        Hydraulic chute  is well suited for the delivery of garage floors, slabs and in low formwork, but is a flexible tool that can also be used for other tasks.


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

SlideCar.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default SlideCar;
