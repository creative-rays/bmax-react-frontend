import React, { useState } from "react";
import PropTypes from 'prop-types'; // Import PropTypes
import { Grid, TextField, Typography } from "@mui/material";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import Screenshot1 from "assets/images/Screenshot1.png";
import Screenshot2 from "assets/images/Screenshot2.png";
import Screenshot3 from "assets/images/Screenshot3.png";

const Calculator = ({ onAreaChange, onClose }) => {
  const [selectedShape, setSelectedShape] = useState("SQUARE");
  const [addedItems, setAddedItems] = useState([]);
  const [inputValues, setInputValues] = useState({ A: "", B: "", C: "", D: "" });
  const [areaName, setAreaName] = useState("");

  const handleAdd = () => {
    const { A, B, C, D } = inputValues;
    let volume = 0;
    let dimensions = "";

    if (selectedShape === "SQUARE") {
      volume = parseFloat(A) * parseFloat(B) * parseFloat(C) || 0;
      dimensions = `${A}m x ${B}m x ${C}m`;
    } else if (selectedShape === "SLOPED_WALL") {
      volume = parseFloat(A) * parseFloat(B) * parseFloat(C) * parseFloat(D) || 0;
      dimensions = `${A}m x ${B}m x ${C}m x ${D}m`;
    } else if (selectedShape === "CYLINDER") {
      volume = Math.PI * Math.pow(parseFloat(A), 2) * parseFloat(B) || 0;
      dimensions = `${A}m x ${B}m x ${C}m`;
    }

    const newItem = {
      id: addedItems.length + 1,
      shape: selectedShape,
      dimensions: dimensions,
      volume: volume.toFixed(2),
      name: areaName || `Area ${addedItems.length + 1}`,
    };

    setAddedItems([...addedItems, newItem]);
    setInputValues({ A: "", B: "", C: "", D: "" });
    setAreaName("");
  };

  const handleDelete = (id) => {
    const newItems = addedItems.filter((item) => item.id !== id);
    setAddedItems(newItems);
    onAreaChange(calculateTotalVolume(newItems));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleAreaNameChange = (e) => {
    setAreaName(e.target.value);
  };

  const calculateTotalVolume = (items) => {
    return items.reduce((total, item) => total + parseFloat(item.volume), 0).toFixed(2);
  };

  const handleSaveClick = () => {
    const totalVolume = calculateTotalVolume(addedItems);
    onAreaChange(totalVolume); // Pass the total volume to the parent component
    onClose(); // Close the popup
  };
  return (
<Grid container spacing={2}>
  <Grid item xs={12}>
    <SoftTypography
      variant="h2"
      sx={{ display: "flex", justifyContent: "center", color: "#000", textAlign: "center" }}
    >
      <span style={{ color: "#17c1e8", marginRight: "12px" }}>Cubic</span> Calculator{" "}
      <span style={{ color: "#17c1e8", marginLeft: "12px" }}>!</span>
    </SoftTypography>
  </Grid>
  <Grid container item spacing={2} alignItems="center" justifyContent="center">
    <Grid item xs={12} sm={4}>
      <SoftButton
        variant={selectedShape === "SQUARE" ? "contained" : "outlined"}
        size="small"
        color="info"
        sx={{
          gap: "3px",
          width: "100%",
          padding: "13px",
          fontSize: "18px",
        }}
        onClick={() => setSelectedShape("SQUARE")}
      >
        SQUARE
      </SoftButton>
    </Grid>
    <Grid item xs={12} sm={4}>
      <SoftButton
        variant={selectedShape === "SLOPED_WALL" ? "contained" : "outlined"}
        size="medium"
        color="info"
        sx={{
          gap: "3px",
          width: "100%",
          fontSize: "18px",
        }}
        onClick={() => setSelectedShape("SLOPED_WALL")}
      >
        SLOPED WALL
      </SoftButton>
    </Grid>
    <Grid item xs={12} sm={4}>
      <SoftButton
        variant={selectedShape === "CYLINDER" ? "contained" : "outlined"}
        size="medium"
        color="info"
        sx={{
          gap: "3px",
          width: "100%",
          fontSize: "18px",
        }}
        onClick={() => setSelectedShape("CYLINDER")}
      >
        CYLINDER
      </SoftButton>
    </Grid>
  </Grid>

  <Grid item xs={12} mt={1}>
    <Grid sx={{ display: "flex", justifyContent: "center" }}>
      {selectedShape === "SQUARE" && (
        <img
          src={Screenshot1}
          alt="SQUARE"
          style={{ maxWidth: "200px", height: "100px" }}
        />
      )}
      {selectedShape === "SLOPED_WALL" && (
        <img
          src={Screenshot2}
          alt="SLOPED WALL"
          style={{ maxWidth: "200px", height: "100px" }}
        />
      )}
      {selectedShape === "CYLINDER" && (
        <img
          src={Screenshot3}
          alt="CYLINDER"
          style={{ maxWidth: "200px", height: "100px" }}
        />
      )}
    </Grid>
  </Grid>

  {selectedShape === "SQUARE" && (
    <>
      <Grid item xs={12} mt={1}>
        <SoftTypography variant="h3" sx={{ color: "#000", textAlign: "center" }}>
          Your goals:
        </SoftTypography>
      </Grid>
      <Grid container spacing={2} mt={2} alignItems="center" justifyContent="center">
        <Grid item xs={4} sm={2}>
          <TextField
            variant="outlined"
            placeholder="A"
            name="A"
            value={inputValues.A}
            onChange={handleInputChange}
            fullWidth
            InputProps={{
              sx: {
                height: "50px !important",
              },
            }}
          />
          <Typography variant="caption" display="block" align="center" mt={1}>
            METERS
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography variant="h4" align="center" mb={3}>
            ×
          </Typography>
        </Grid>
        <Grid item xs={4} sm={2}>
          <TextField
            variant="outlined"
            placeholder="B"
            name="B"
            value={inputValues.B}
            onChange={handleInputChange}
            fullWidth
            InputProps={{
              sx: {
                height: "50px !important",
              },
            }}
          />
          <Typography variant="caption" display="block" align="center" mt={1}>
            METERS
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography variant="h4" align="center" mb={3}>
            ×
          </Typography>
        </Grid>
        <Grid item xs={4} sm={2}>
          <TextField
            variant="outlined"
            placeholder="C"
            name="C"
            value={inputValues.C}
            onChange={handleInputChange}
            fullWidth
            InputProps={{
              sx: {
                height: "50px !important",
              },
            }}
          />
          <Typography variant="caption" display="block" align="center" mt={1}>
            M
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography variant="h4" align="start" mb={3}>
            =
          </Typography>
        </Grid>
        <Grid item xs={4} sm={2}>
          <TextField
            variant="outlined"
            placeholder="M³"
            value={(parseFloat(inputValues.A) * parseFloat(inputValues.B) * parseFloat(inputValues.C) || 0).toFixed(2)}
            fullWidth
            InputProps={{
              sx: {
                height: "50px !important",
              },
              readOnly: true,
            }}
          />
          <Typography variant="caption" display="block" align="center" mt={1}>
            CUBIC
          </Typography>
        </Grid>
      </Grid>
    </>
  )}

  {selectedShape === "SLOPED_WALL" && (
    <>
      <Grid item xs={12}>
        <SoftTypography variant="h3" sx={{ color: "#000", textAlign: "center" }}>
          Your goals:
        </SoftTypography>
      </Grid>
      <Grid container spacing={2} mt={1} alignItems="center" justifyContent="center">
        <Grid item xs={4} sm={2}>
          <TextField
            variant="outlined"
            placeholder="A"
            name="A"
            value={inputValues.A}
            onChange={handleInputChange}
            fullWidth
            InputProps={{
              sx: {
                height: "50px !important",
              },
            }}
          />
          <Typography variant="caption" display="block" align="center" mt={1}>
            METERS
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography variant="h4" align="center" mb={3}>
            ×
          </Typography>
        </Grid>
        <Grid item xs={4} sm={2}>
          <TextField
            variant="outlined"
            placeholder="B"
            name="B"
            value={inputValues.B}
            onChange={handleInputChange}
            fullWidth
            InputProps={{
              sx: {
                height: "50px !important",
              },
            }}
          />
          <Typography variant="caption" display="block" align="center" mt={1}>
            METERS
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography variant="h4" align="center" mb={3}>
            ×
          </Typography>
        </Grid>
        <Grid item xs={4} sm={2}>
          <TextField
            variant="outlined"
            placeholder="C"
            name="C"
            value={inputValues.C}
            onChange={handleInputChange}
            fullWidth
            InputProps={{
              sx: {
                height: "50px !important",
              },
            }}
          />
          <Typography variant="caption" display="block" align="center" mt={1}>
            METERS
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography variant="h4" align="start" mb={3}>
            ×
          </Typography>
        </Grid>
        <Grid item xs={4} sm={2}>
          <TextField
            variant="outlined"
            placeholder="D"
            name="D"
            value={inputValues.D}
            onChange={handleInputChange}
            fullWidth
            InputProps={{
              sx: {
                height: "50px !important",
              },
            }}
          />
          <Typography variant="caption" display="block" align="center" mt={1}>
            METERS
          </Typography>
        </Grid>
        <Grid item xs={12} sm={8}>
          <TextField
            variant="outlined"
            placeholder="M³"
            value={(parseFloat(inputValues.A) * parseFloat(inputValues.B) * parseFloat(inputValues.C) * parseFloat(inputValues.D) || 0).toFixed(2)}
            fullWidth
            InputProps={{
              sx: {
                height: "50px !important",
              },
              readOnly: true,
            }}
          />
          <Typography variant="caption" display="block" align="center" mt={1}>
            CUBIC
          </Typography>
        </Grid>
      </Grid>
    </>
  )}

  {selectedShape === "CYLINDER" && (
    <>
      <Grid item xs={12} mt={1}>
        <SoftTypography variant="h3" sx={{ color: "#000", textAlign: "center" }}>
          Your goals:
        </SoftTypography>
      </Grid>
      <Grid container spacing={2} mt={2} alignItems="center" justifyContent="center">
        <Grid item xs={4} sm={2}>
          <TextField
            variant="outlined"
            placeholder="A"
            name="A"
            value={inputValues.A}
            onChange={handleInputChange}
            fullWidth
            InputProps={{
              sx: {
                height: "50px !important",
              },
            }}
          />
          <Typography variant="caption" display="block" align="center" mt={1}>
            M
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography variant="h4" align="center" mb={3}>
            ×
          </Typography>
        </Grid>
        <Grid item xs={4} sm={2}>
          <TextField
            variant="outlined"
            placeholder="B"
            name="B"
            value={inputValues.B}
            onChange={handleInputChange}
            fullWidth
            InputProps={{
              sx: {
                height: "50px !important",
              },
            }}
          />
          <Typography variant="caption" display="block" align="center" mt={1}>
            M
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography variant="h4" align="center" mb={3}>
            ×
          </Typography>
        </Grid>
        <Grid item xs={4} sm={2}>
          <TextField
            variant="outlined"
            placeholder="C"
            name="C"
            value={inputValues.C}
            onChange={handleInputChange}
            fullWidth
            InputProps={{
              sx: {
                height: "50px !important",
              },
            }}
          />
          <Typography variant="caption" display="block" align="center" mt={1}>
            AMOUNT
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography variant="h4" align="start" mb={3}>
            =
          </Typography>
        </Grid>
        <Grid item xs={4} sm={2}>
          <TextField
            variant="outlined"
            placeholder="M³"
            value={(Math.PI * Math.pow(parseFloat(inputValues.A), 2) * parseFloat(inputValues.C) || 0).toFixed(2)}
            fullWidth
            InputProps={{
              sx: {
                height: "50px !important",
              },
              readOnly: true,
            }}
          />
          <Typography variant="caption" display="block" align="center" mt={1}>
            CUBIC
          </Typography>
        </Grid>
      </Grid>
    </>
  )}

  <Grid container spacing={2} p={2}>
    <Grid item xs={12}>
      <SoftTypography variant="h4" sx={{ color: "#000", textAlign: "center" }}>
        <span style={{ color: "#17c1e8", marginRight: "12px" }}>Name of the area: </span>
      </SoftTypography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={9}>
          <TextField
            variant="outlined"
            placeholder="Area Name"
            value={areaName}
            onChange={handleAreaNameChange}
            fullWidth
            InputProps={{
              sx: {
                height: "50px !important",
              },
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <SoftButton
            variant="contained"
            size="small"
            color="info"
            sx={{
              gap: "3px",
              width: "100%",
              padding: "16px",
            }}
            onClick={handleAdd}
          >
            ADD
          </SoftButton>
        </Grid>
      </Grid>
    </Grid>
  </Grid>

  <Grid container spacing={2} mt={1} mx={2}>
    <Grid item xs={12}>
      <SoftTypography
        variant="h3"
        sx={{
          display: "flex",
          justifyContent: "center",
          color: "#000",
          position: "relative",
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "30%",
            height: "2px",
            backgroundColor: "#000",
          },
          paddingBottom: "4px",
        }}
      >
        Saved calculations:
      </SoftTypography>
      {addedItems.map((item) => (
        <Grid container key={item.id} justifyContent="space-between" alignItems="center">
          <Grid item my={1}>
            <Typography
              variant="h5"
              sx={{ color: "#2189FF", display: "inline-block", marginRight: "8px" }}
            >
              {item.id}.
            </Typography>
            <Typography
              variant="h5"
              sx={{ color: "#000", display: "inline-block", marginRight: "8px" }}
            >
              {item.name} | {item.shape}
            </Typography>
            <Typography variant="body1" sx={{ color: "#000" }}>
              {item.dimensions} = {item.volume}m³
            </Typography>
          </Grid>
          <Grid item>
            <SoftButton
              variant="contained"
              size="small"
              onClick={() => handleDelete(item.id)}
              sx={{
                gap: "3px",
                width: "150px",
                padding: "16px",
                backgroundColor: "red",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "darkred",
                },
              }}
            >
              Delete
            </SoftButton>
          </Grid>
        </Grid>
      ))}
      <SoftTypography
        variant="h2"
        sx={{ display: "flex", justifyContent: "center", color: "#17c1e8", gap: "20px" }}
      >
        Total: <span style={{ color: "#000" }}>{calculateTotalVolume(addedItems)} m³</span>
      </SoftTypography>
    </Grid>
  </Grid>
  <Grid container spacing={2} mt={1} p={2}>
    <Grid item xs={6}>
      <SoftButton
        variant="outlined"
        size="small"
        color="info"
        sx={{
          gap: "3px",
          width: "100%",
          padding: "16px",
        }}
        onClick={onClose}
      >
        CLOSE
      </SoftButton>
    </Grid>
    <Grid item xs={6}>
      <SoftButton
        variant="contained"
        size="small"
        color="info"
        sx={{
          gap: "3px",
          width: "100%",
          padding: "16px",
        }}
        onClick={handleSaveClick}
      >
        SAVE
      </SoftButton>
    </Grid>
  </Grid>
</Grid>



  );
};

Calculator.propTypes = {
  onAreaChange: PropTypes.func.isRequired, // Specify that onAreaChange is a required function
  onClose: PropTypes.func.isRequired, // Specify that onClose is a required function
};


export default Calculator;
