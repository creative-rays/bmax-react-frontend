import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Grid,
  TextField,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  FormHelperText,
} from "@mui/material";
import SoftButton from "components/SoftButton";

const CustomizedConcrete = ({ onAreaChange, onClose }) => {
  const [concreteType, setConcreteType] = useState("");
  const [quality, setQuality] = useState("");
  const [stoneType, setStoneType] = useState("");
  const [stoneReduction, setStoneReduction] = useState("");
  const [consistency, setConsistency] = useState("");
  const [additionalChoices, setAdditionalChoices] = useState({
    lowCarbon: false,
    soilMoist: false,
    frostproof: false,
    livestockFarming: false,
  });
  const [errors, setErrors] = useState({});

  const handleAdditionalChoiceChange = (event) => {
    setAdditionalChoices({
      ...additionalChoices,
      [event.target.name]: event.target.checked,
    });
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!concreteType) tempErrors.concreteType = "Concrete type is required";
    if (!quality) tempErrors.quality = "Quality is required";
    if (!stoneType) tempErrors.stoneType = "Stone type is required";
    if (!stoneReduction) tempErrors.stoneReduction = "Stone reduction is required";
    if (!consistency) tempErrors.consistency = "Consistency is required";

    setErrors(tempErrors);

    return Object.keys(tempErrors).length === 0;
  };

  const handleSaveClick = () => {
    if (validateForm()) {
      const selectedValues = {
        concreteType,
        quality,
        stoneType,
        stoneReduction,
        consistency,
        additionalChoices,
      };
      onAreaChange(selectedValues);
      onClose();
    }
  };

  return (
    <div style={{
      overflowY: "scroll",
      maxHeight: "100vh",
      padding: "16px",
      scrollbarWidth: "none", /* Firefox */
      msOverflowStyle: "none"  /* IE and Edge */
    }}>
      <style>
        {`
          div::-webkit-scrollbar {
            display: none; /* Safari and Chrome */
          }
        `}
      </style>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography
            variant="h2"
            sx={{
              display: "flex",
              justifyContent: "center",
              color: "#000",
              textAlign: "center",
              marginTop: "16px",
            }}
          >
            <span style={{ color: "#17c1e8" }}>Customized <span style={{color: "#000"}}>concrete</span> !</span>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" sx={{ color: "#000", fontWeight: "bold" }}>
            Concrete type :
          </Typography>
          <TextField
            variant="outlined"
            placeholder="custom concrete"
            fullWidth
            sx={{ marginTop: "8px" }}
            value={concreteType}
            onChange={(e) => setConcreteType(e.target.value)}
            error={!!errors.concreteType}
            helperText={errors.concreteType}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" sx={{ color: "#000", fontWeight: "bold" }}>
            QUALITY :
          </Typography>
          <FormControl variant="outlined" fullWidth error={!!errors.quality}>
            <Select
              value={quality}
              onChange={(e) => setQuality(e.target.value)}
              displayEmpty
            >
              <MenuItem value="" disabled>Select...</MenuItem>
              <MenuItem value="B20 M90">B20 M90</MenuItem>
              <MenuItem value="B30 M60">B30 M60</MenuItem>
              <MenuItem value="B35 M45">B35 M45</MenuItem>
              <MenuItem value="B35 MF45">B35 MF45</MenuItem>
              <MenuItem value="B45 M40">B45 M40</MenuItem>
              <MenuItem value="B45 MF40">B45 MF40</MenuItem>
            </Select>
            {!!errors.quality && <FormHelperText>{errors.quality}</FormHelperText>}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" sx={{ color: "#000", fontWeight: "bold" }}>
            STONE TYPE :
          </Typography>
          <FormControl variant="outlined" fullWidth error={!!errors.stoneType}>
            <Select
              value={stoneType}
              onChange={(e) => setStoneType(e.target.value)}
              displayEmpty
            >
              <MenuItem value="" disabled>Select...</MenuItem>
              <MenuItem value="Dmax 8">Dmax 8</MenuItem>
              <MenuItem value="Dmax 16">Dmax 16</MenuItem>
              <MenuItem value="Dmax 22">Dmax 22</MenuItem>
            </Select>
            {!!errors.stoneType && <FormHelperText>{errors.stoneType}</FormHelperText>}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" sx={{ color: "#000", fontWeight: "bold" }}>
            STONE REDUCTION :
          </Typography>
          <FormControl variant="outlined" fullWidth error={!!errors.stoneReduction}>
            <Select
              value={stoneReduction}
              onChange={(e) => setStoneReduction(e.target.value)}
              displayEmpty
            >
              <MenuItem value="" disabled>Select...</MenuItem>
              <MenuItem value="0%">0%</MenuItem>
              <MenuItem value="25%">25%</MenuItem>
              <MenuItem value="50%">50%</MenuItem>
            </Select>
            {!!errors.stoneReduction && <FormHelperText>{errors.stoneReduction}</FormHelperText>}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" sx={{ color: "#000", fontWeight: "bold" }}>
            CONSISTENCY :
          </Typography>
          <FormControl variant="outlined" fullWidth error={!!errors.consistency}>
            <Select
              value={consistency}
              onChange={(e) => setConsistency(e.target.value)}
              displayEmpty
            >
              <MenuItem value="" disabled>Select...</MenuItem>
              <MenuItem value="80">80</MenuItem>
              <MenuItem value="100">100</MenuItem>
              <MenuItem value="120">120</MenuItem>
              <MenuItem value="140">140</MenuItem>
              <MenuItem value="160">160</MenuItem>
              <MenuItem value="180">180</MenuItem>
              <MenuItem value="200">200</MenuItem>
              <MenuItem value="220">220</MenuItem>
              <MenuItem value="240">240</MenuItem>
            </Select>
            {!!errors.consistency && <FormHelperText>{errors.consistency}</FormHelperText>}
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ color: "#000", fontWeight: "bold" }}>
            Additional choices :
          </Typography>
          <Grid container mx={2}>
            <Grid item xs={6}>
              <FormControlLabel
                control={<Checkbox checked={additionalChoices.lowCarbon} onChange={handleAdditionalChoiceChange} name="lowCarbon" />}
                label="Low Carbon"
              />
              <FormControlLabel
                control={<Checkbox checked={additionalChoices.soilMoist} onChange={handleAdditionalChoiceChange} name="soilMoist" />}
                label="Soil Moist"
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
                control={<Checkbox checked={additionalChoices.frostproof} onChange={handleAdditionalChoiceChange} name="frostproof" />}
                label="Frostproof"
              />
              <FormControlLabel
                control={<Checkbox checked={additionalChoices.livestockFarming} onChange={handleAdditionalChoiceChange} name="livestockFarming" />}
                label="Livestock Farming"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={2} mt={2} mx={1}>
          <Grid item xs={6}>
            <SoftButton
              variant="outlined"
              color="info"
              fullWidth
              sx={{
                height: "45px",
                borderRadius: "7px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={onClose}
            >
              CLOSE
            </SoftButton>
          </Grid>
          <Grid item xs={6}>
            <SoftButton
              variant="contained"
              color="info"
              fullWidth
              sx={{
                height: "45px",
                borderRadius: "7px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={handleSaveClick}
            >
              SAVE
            </SoftButton>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

CustomizedConcrete.propTypes = {
  onAreaChange: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CustomizedConcrete;
