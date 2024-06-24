import React from "react";
import PropTypes from "prop-types";
import { Grid, Typography, Button, TextField } from "@mui/material";
import SoftButton from "components/SoftButton";
import { position } from "stylis";
import trackcar from "assets/images/trackcar.jpg";
import './style.css'

const Trackcar = ({ onClose }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h2" align="center">
          16m Track car !
        </Typography>
        <Grid display={"flex"} justifyContent={"center"}>
          <img
            src={trackcar}
            alt="trackcar"
            style={{ maxWidth: "200px", height: "100%" }}
          />
        </Grid>
        
        <Typography variant="h6" align="center" style={{ marginTop: "10px" }}>
          Often used for these projects :
        </Typography>
        <TextField
          variant="outlined"
          display= 'flex unset !important' 
          width="100%"
          value="Garage, System elements, Soles, Walls"
          fullWidth
          readOnly
          InputProps={{
            style: {
              width: "100% !important",
              display: 'unset !important', // Unset the -webkit-box display property
              textAlign: "center !important", // Center text horizontally
            },
          }}
        />


        <Typography variant="body2" mt={1} align="center">
          A concrete truck with a conveyor belt has a reach of up to 16 metres. Newer cars have an
          adjustable length between 12 and 16 metres. At the same time, the band can also be
          brokento achieve the desired angle in a straight line. The belt can be adjusted
          approximately 180 degrees behind the concrete truck and can deliver horizontally or
          upwards at an angle.
        </Typography>
        <Typography variant="body2" my={1} align="center">
          The concrete is fed out evenly from the truck and the speed of the belt and the unloading
          can be finely adjusted. The concrete truck will use support legs, so extra space must be
          calculated for this. There must be no overhanging cable ties etc. in the immediate
          vicinity of the concrete truck.
        </Typography>
        <Typography  variant="body2" mb={1} align="center">
          Conveyor belts are well suited for delivery to system elements, floors, walls and the
          like, and are a flexible unloading method with a wide range of applications.
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
            marginTop: "20px",
          }}
        >
          CLOSE
        </SoftButton>
      </Grid>
    </Grid>
  );
};

Trackcar.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Trackcar;
