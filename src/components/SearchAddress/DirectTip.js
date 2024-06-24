import React from "react";
import PropTypes from "prop-types";
import { Grid, Typography, Button, TextField } from "@mui/material";
import SoftButton from "components/SoftButton";
import directtip from "assets/images/directtip.jpg"

const DirectTip = ({ onClose }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h2" align="center">
          1m Direct tip !
        </Typography>
        <Grid display={"flex"} justifyContent={"center"}>
          <img
              src={directtip}
              alt="directtip"
              style={{ maxWidth: "200px", height: "100%" }}
            />
        </Grid>
        <Typography variant="h6" align="center" style={{ marginTop: "10px" }}>
          Often used for these projects :
        </Typography>
        <TextField
          variant="outlined"
          value="Mailbox stand, foundations, soil moist"
          fullWidth
          readOnly
          style={{ marginBottom: "10px" }}
        />
        <Typography variant="body2" mt={1} align="center">
          A concrete truck without equipment  is best suited for delivery directly in formwork, in a pump or in a tub. The outlet of the chute is approx. 1.50-1.80m above the ground and can be adjusted somewhat, but does not extend further than approx. 1 meter out behind the car.
        </Typography>
        <Typography variant="body2" mt={1} align="center">
          Some cars  have loose extension channels that can be hooked on, but this is not normally used very often and cannot be guaranteed on delivery.
        </Typography>
        <Typography  variant="body2" mt={1} align="center">
          This type of vehicle  is suitable for delivery with &quot;direct tipping&quot; behind a concrete truck on the ground, in a wheelbarrow or similar, or for delivery on a pump or spray rig.
        </Typography>
        <Typography  variant="body2" mt={1} mb={3} align="center">
          When ordering &quot;soil-moist&quot;  concrete, this will normally also be able to deliver by unloading the concrete directly behind the car.
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

DirectTip.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default DirectTip;
