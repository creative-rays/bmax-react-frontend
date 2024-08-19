import React, { useState, useEffect, useRef } from "react";
import {
  FormControlLabel,
  Checkbox,
  Grid,
  TextField,
  Box,
  Badge,
  Popover,
  Avatar,
  Typography,
  FormControl,
  Select,
  MenuItem,
  OutlinedInput,
} from "@mui/material";
import { Backdrop } from "@mui/material";
import SoftTypography from "components/SoftTypography";
import { useNavigate, useLocation } from "react-router-dom";
import DefaultLayout from "layouts/authentication/components/DefaultLayout/DefaultLayout";
import SoftBox from "components/SoftBox";
import { Calculate, Map as MapIcon, Edit } from "@mui/icons-material";
import Calculator from "./Calculator";
import Map from "./Map"; // Import your MapComponent
import SoftButton from "components/SoftButton";
import { useTheme } from "@mui/material/styles";
import CastIcon from "@mui/icons-material/Cast";
import SpeedIcon from "@mui/icons-material/Speed";
import ConstructionIcon from "@mui/icons-material/Construction";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CustomizedConcrete from "./Customizedconcretepopup";
import Trackcar from "./Trackcar";
import DirectTip from "./DirectTip";
import PumpMixer from "./PumpMixer";
import SlideCar from "./SlideCar"; // Import your popup components
import { useGlobalState } from 'globalState/globalState';
import { fetchVehicleTypes, fetchTypeProject } from './weatherUtils'; // Correct import statement

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const nameTranslation = {
  "Garasjegulv": "Garage floor",
  "Kjellergulv": "Basement floor",
  "Systemelementer": "System elements",
  "Veggstøp": "Wall plaster",
  "Terrasseplate": "Terrace board",
  "Trapper": "Stairs",
  "Annen støp ute": "Another cast outside",
  "Annen støp inne": "Other cast inside",
  "Støttemur": "Retaining wall"
};

const names = [
  "Garage floor",
  "Basement floor",
  "System elements",
  "Wall plaster",
  "Terrace board",
  "Stairs",
  "Another cast outside",
  "Other cast inside",
  "Retaining wall",
];

const getStyles = (name, selectedName, theme) => {
  return {
    fontWeight:
      selectedName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
};

// Main component
const CalculateArea = () => {
  const location = useLocation();
  const { address, dateTimeFields = [], weatherData = [] } = location.state || {};
  const [showDateTime, setShowDateTime] = useState(false);
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [showMapPopup, setShowMapPopup] = useState(false);
  const [totalArea, setTotalArea] = useState(0);
  const [calculatorArea, setCalculatorArea] = useState(0);
  const [mapArea, setMapArea] = useState(0);
  const [personName, setPersonName] = useState([]);
  const selectRef = useRef(null);
  const [castWithDrop, setCastWithDrop] = useState(false);
  const [delay, setDelay] = useState(false);
  const [steelFiber, setSteelFiber] = useState(false);
  const [accelerator, setAccelerator] = useState(false);
  const [uploadingTypeChecked, setUploadingTypeChecked] = useState(false);
  const [showProPopup, setShowProPopup] = useState(false);
  const [openPopup, setOpenPopup] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [concreteConfig, setConcreteConfig] = useState(null);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const { dispatch } = useGlobalState();
  const [vehicleTypes, setVehicleTypes] = useState(null);

  useEffect(() => {
    console.log(`Address: ${address}`);
  }, [address]);

  const handleCheckboxChange = (event) => {
    setShowDateTime(event.target.checked);
  };

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleOpenMapPopup = () => {
    setShowMapPopup(true);
  };

  const handleMapAreaChange = (area) => {
    setMapArea(area);
  };

  const handleCalculatorAreaChange = (area) => {
    setCalculatorArea(area);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setShowMapPopup(false);
  };

  const handleOpenSpecificPopup = (popupName) => {
    setOpenPopup(popupName);
  };

  const handleCloseSpecificPopup = () => {
    setOpenPopup(null);
  };

  const combinedTotalArea = parseFloat(calculatorArea) + parseFloat(mapArea);

  const handleBoxClick = () => {
    handleCheckboxChange({ target: { name: "addPumpWaste", checked: !showDateTime } });
  };

  const handleCheckboxClick = (event) => {
    event.stopPropagation();
    handleCheckboxChange(event);
  };

  const handleChange = async (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);

    // Fetch type project when the value changes
    try {
      const typeProject = await fetchTypeProject();
      console.log('Fetched Type Project:', typeProject);
    } catch (error) {
      console.error('Error fetching type project:', error);
    }
  };

  const handleInputClick = () => {
    selectRef.current && selectRef.current.click();
  };

  const handleUploadingTypeCheckboxChange = (event) => {
    setUploadingTypeChecked(event.target.checked);
  };

  const handleProClick = () => {
    setShowProPopup(true);
  };

  const handleCloseProPopup = () => {
    setShowProPopup(false);
  };

  const handleProSave = (data) => {
    console.log(data);
    setConcreteConfig(data);
    setShowProPopup(false);
  };

  const handleItemClick = async (item) => {
    if (selectedItem === item) {
      setSelectedItem(null);
    } else {
      setSelectedItem(item);
      // Fetch vehicle types when an item is selected
      try {
        const vehicleTypes = await fetchVehicleTypes();
        console.log('Fetched Vehicle Types:', vehicleTypes);
      } catch (error) {
        console.error('Error fetching vehicle types:', error);
      }
    }
  };

  useEffect(() => {
    console.log('Vehicle Types State:', vehicleTypes); // Log vehicle types state whenever it changes
  }, [vehicleTypes]);

  const handleInputClick2 = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = () => {
    setOpen(true);
  };
  const handleNextClick = () => {
    const step1Data = {
      address,
      dateTimeFields,
      combinedTotalArea,
      personName,
      concreteConfig,
      castWithDrop,
      delay,
      steelFiber,
      accelerator,
      uploadingTypeChecked,
      selectedItem,
      weatherData, // Add this line
    };
  
    navigate("/summary", { state: step1Data });
  };
  
  const isDayTime = (time) => {
    const hour = parseInt(time.split(":")[0], 10);
    return hour >= 6 && hour < 18;
  };

  const extraContent = (
    <Box
      sx={{
        height: "100%",
        minHeight: "600px !important",
        width: "100%",
        backgroundColor: "#17C1E8",
        borderRadius: "7px",
        padding: "20px",
        marginTop: "170px"
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
            Deliver to {address}
          </Typography>
          {dateTimeFields && dateTimeFields.map((field, index) => (
            field.date && field.time ? (
              <Box key={index} color="#fff" mt={2} p={2} bgcolor="#333" borderRadius={4}>
                <Typography variant="body2">
                  On {field.date}, {field.time}
                </Typography>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    {weatherData[index]?.weather?.icon && (
                      <Avatar src={`https://api.met.no/images/weathericons/svg/${weatherData[index].weather.icon}.svg`} alt="Weather Icon" sx={{ width: 24, height: 24 }} />
                    )}
                  </Grid>
                  <Grid item>
                    <Typography variant="body2">Temperature: {weatherData[index]?.weather?.temperature}°C</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body2">Air Pressure: {weatherData[index]?.weather?.air_pressure} hPa</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body2">Cloud Area Fraction: {weatherData[index]?.weather?.cloud_area_fraction}%</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body2">Relative Humidity: {weatherData[index]?.weather?.relative_humidity}%</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body2">Wind Direction: {weatherData[index]?.weather?.wind_from_direction}°</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body2">Wind Speed: {weatherData[index]?.weather?.wind_speed} m/s</Typography>
                  </Grid>
                </Grid>
              </Box>
            ) : null
          ))}
        </Box>
        <Typography color={"#fff"} variant="body2">
          <span style={{ fontWeight: "900", fontSize: "25px" }}>Step 2</span> Delivery
          configurations
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
            Total Area {`${combinedTotalArea.toFixed(2)} Square Meters`}
          </Typography>
          <Typography color={"#fff"} variant="body2">
            Project Type {personName.join(", ")}
          </Typography>
          <Typography color={"#fff"} variant="body2">
            Custom Concrete {concreteConfig?.concreteType || "N/A"}
          </Typography>
          {concreteConfig && (
            <Box ml={2}>
              <Typography color={"#fff"} variant="body2">
                Quality {concreteConfig.quality}
              </Typography>
              <Typography color={"#fff"} variant="body2">
                Stone Type {concreteConfig.stoneType}
              </Typography>
              <Typography color={"#fff"} variant="body2">
                Stone Reduction {concreteConfig.stoneReduction}
              </Typography>
              <Typography color={"#fff"} variant="body2">
                Consistency: {concreteConfig.consistency}
              </Typography>
              <Typography color={"#fff"} variant="body2">
                Additional Choices:
              </Typography>
              {concreteConfig.additionalChoices && (
                <Box ml={2}>
                  {concreteConfig.additionalChoices.lowCarbon && (
                    <Typography color={"#fff"} variant="body2">
                      Low Carbon: Yes
                    </Typography>
                  )}
                  {concreteConfig.additionalChoices.soilMoist && (
                    <Typography color={"#fff"} variant="body2">
                      Soil Moist: Yes
                    </Typography>
                  )}
                  {concreteConfig.additionalChoices.frostproof && (
                    <Typography color={"#fff"} variant="body2">
                      Frostproof: Yes
                    </Typography>
                  )}
                  {concreteConfig.additionalChoices.livestockFarming && (
                    <Typography color={"#fff"} variant="body2">
                      Livestock Farming: Yes
                    </Typography>
                  )}
                </Box>
              )}
            </Box>
          )}
          {castWithDrop && (
            <Typography color={"#fff"} variant="body2">
              Cast With Drop: Yes
            </Typography>
          )}
          {delay && (
            <Typography color={"#fff"} variant="body2">
              Delay: Yes
            </Typography>
          )}
          {steelFiber && (
            <Typography color={"#fff"} variant="body2">
              Steel Fiber: Yes
            </Typography>
          )}
          {accelerator && (
            <Typography color={"#fff"} variant="body2">
              Accelerator: Yes
            </Typography>
          )}
          <Typography color={"#fff"} variant="body2">
            Select Uploading Type: {uploadingTypeChecked ? "Yes" : "No"}
          </Typography>
          {uploadingTypeChecked && (
            <>
              {selectedItem === "trackcar" && (
                <Typography color={"#fff"} variant="body2">
                  16m Track Car: Yes
                </Typography>
              )}
              {selectedItem === "directTip" && (
                <Typography color={"#fff"} variant="body2">
                  1m Direct Tip: Yes
                </Typography>
              )}
              {selectedItem === "pumpMixer" && (
                <Typography color={"#fff"} variant="body2">
                  24m Pump Mixer: Yes
                </Typography>
              )}
              {selectedItem === "slideCar" && (
                <Typography color={"#fff"} variant="body2">
                  9m Slide Car: Yes
                </Typography>
              )}
            </>
          )}
        </Box>
      </Grid>
    </Box>
  );

  return (
    <DefaultLayout extraContent={extraContent}>
      <Grid container spacing={2} gap={3} px={{ xs: 2, md: 20 }} mt={5} mb={10}>
        <Grid item xs={12}>
          <SoftBox p={1} sx={{ color: "info.main" }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <SoftTypography
                  variant="h4"
                  color="black"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  {address || ""}
                  {address && (
                    <Edit
                      sx={{ color: "black", marginLeft: 3, cursor: "pointer" }}
                      onClick={() => navigate("/search-address")}
                    />
                  )}
                </SoftTypography>
              </Grid>
              <Grid item xs={12} md={6}>
                <SoftBox sx={{ padding: "0px" }}>
                  <Box
                    sx={{
                      width: "100%",
                      cursor: "pointer",
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
                    <Avatar
                      sx={{ color: "#fff", bgcolor: "#17c1e8", width: "30px", height: "30px" }}
                    >
                      <Calculate />
                    </Avatar>
                    <Typography
                      fontSize="1rem"
                      sx={{ textTransform: "capitalize", color: "black" }}
                      variant="h5"
                    >
                      Calculate Area
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
                              WebkitAppearance: "none",
                              MozAppearance: "none",
                              appearance: "none",
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
              </Grid>
            </Grid>

            {showDateTime && (
              <>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={12} sm={10} md={8}>
                    <TextField
                      variant="outlined"
                      placeholder="Area in M3"
                      value={`${combinedTotalArea.toFixed(2)} Square Meters`}
                      readOnly
                      fullWidth
                      InputProps={{
                        sx: {
                          height: "47px !important",
                        },
                      }}
                      className="customInput"
                    />
                  </Grid>

                  <Grid item xs={6} sm={1} md={2}>
                    <SoftButton
                      variant="contained"
                      color="info"
                      fullWidth
                      onClick={handleOpenPopup}
                      title="Calculator"
                      sx={{
                        width: "100%",
                        height: "45px",
                        borderRadius: "7px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        transition: "box-shadow 0.3s ease",
                        cursor: "pointer",
                      }}
                    >
                      <Badge
                        sx={{ color: "#fff" }}
                        badgeContent={<Calculate sx={{ width: "30px", height: "30px" }} />}
                      />
                    </SoftButton>
                  </Grid>

                  <Grid item xs={6} sm={1} md={2}>
                    <SoftButton
                      variant="contained"
                      color="info"
                      fullWidth
                      title="Map"
                      onClick={handleOpenMapPopup}
                      sx={{
                        width: "100%",
                        height: "45px",
                        borderRadius: "7px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        transition: "box-shadow 0.3s ease",
                        cursor: "pointer",
                      }}
                    >
                      <Badge
                        sx={{ color: "#fff" }}
                        badgeContent={<MapIcon sx={{ width: "30px", height: "30px" }} />}
                      />
                    </SoftButton>
                  </Grid>
                </Grid>
              </>
            )}
          </SoftBox>

          {/* Calculator Popup */}
          <Popover
            open={showPopup}
            onClose={handleClosePopup}
            anchorEl={document.body}
            anchorOrigin={{ vertical: "center", horizontal: "center" }}
            transformOrigin={{ vertical: "center", horizontal: "center" }}
            PaperProps={{
              sx: {
                backgroundColor: "#ffffff",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
                border: "none",
                outline: "none",
                width: {
                  xs: "100%", // full width on mobile
                  md: "650px", // fixed width on medium and larger
                },
                height: {
                  xs: "100vh", // full height on mobile
                  md: "auto", // auto height on medium and larger
                },
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflowY: "auto",
              },
            }}
            BackdropProps={{
              sx: {
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              },
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                overflowY: "auto",
              }}
            >
              <Calculator onAreaChange={handleCalculatorAreaChange} onClose={handleClosePopup} />
            </Box>
          </Popover>

          {/* Map Popup */}
          <Popover
            open={showMapPopup}
            onClose={handleClosePopup}
            anchorEl={null}
            anchorOrigin={{
              vertical: "center",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "center",
              horizontal: "center",
            }}
            PaperProps={{
              sx: {
                backgroundColor: "#ffffff",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
                border: "none",
                outline: "none",
                width: "800px",
                height: "730px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                overflow: "hidden",
              },
            }}
            BackdropProps={{
              sx: {
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              },
            }}
          >
            <Map address={address} onAreaChange={handleMapAreaChange} onSave={handleClosePopup} />
          </Popover>

          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              sx={{ m: 1, display: "flex", justifyItems: "start" }}
            >
              <Typography
                variant="h4"
                sx={{ display: "flex", justifyContent: "center", color: "black" }}
              >
                <span style={{ color: "#17c1e8", marginRight: "5px" }}>WHAT</span> are you going to
                cast <span style={{ color: "#17c1e8", marginLeft: "12px" }}>?</span>
              </Typography>
            </Grid>
            <Grid item xs={9} md={10}>
              <FormControl sx={{ m: 1, width: "100%" }}>
                <Select
                  displayEmpty
                  value={personName}
                  onChange={handleChange}
                  input={<OutlinedInput onClick={handleInputClick2} />}
                  sx={{
                    height: "45px !important",
                    cursor: "pointer",
                  }}
                  renderValue={(selected) => {
                    if (selected.length === 0) {
                      return <em>Select Type Project</em>;
                    }
                    return selected.join(", ");
                  }}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 48 * 4.5 + 8,
                        width: 250,
                      },
                    },
                  }}
                  inputProps={{ "aria-label": "Without label" }}
                  ref={selectRef}
                  open={open}
                  onClose={handleClose}
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpen(!open);
                  }}
                >
                  <MenuItem disabled value="">
                    <em>Select Type Project</em>
                  </MenuItem>
                  {names.map((name) => (
                    <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={3} md={2} mt={1}>
              <SoftButton
                variant="contained"
                color="info"
                fullWidth
                sx={{
                  width: "100%",
                  height: "43px !important",
                  borderRadius: "7px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={handleProClick}
              >
                Pro
              </SoftButton>
            </Grid>
            <Backdrop
              open={showProPopup}
              sx={{
                zIndex: (theme) => theme.zIndex.drawer + 1,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              }}
            />
            <Popover
              open={showProPopup}
              onClose={handleCloseProPopup}
              anchorEl={null}
              anchorOrigin={{
                vertical: "center",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "center",
                horizontal: "center",
              }}
              PaperProps={{
                sx: {
                  backgroundColor: "#ffffff",
                  padding: "20px",
                  borderRadius: "10px",
                  boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
                  border: "none",
                  outline: "none",
                  width: {
                    xs: "100%", // full width on mobile
                    md: "800px", // fixed width on medium and larger
                  },
                  height: {
                    xs: "100vh", // full height on mobile
                    md: "600px", // fixed height on medium and larger
                  },
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                },
              }}
            >
              <CustomizedConcrete onAreaChange={handleProSave} onClose={handleCloseProPopup} />
            </Popover>

            <Grid container spacing={2} m={1}>
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    width: "100%",
                    cursor: "pointer",
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
                  onClick={() => setCastWithDrop(!castWithDrop)}
                >
                  <Avatar sx={{ color: "#fff", bgcolor: "#17c1e8", width: "30px", height: "30px" }}>
                    <CastIcon />
                  </Avatar>
                  <Typography
                    fontSize="1rem"
                    sx={{ textTransform: "capitalize", color: "#000", marginLeft: 1 }}
                    variant="h5"
                  >
                    Cast With Drop
                  </Typography>
                  <FormControlLabel
                    sx={{ marginLeft: "auto" }}
                    control={
                      <Checkbox
                        checked={castWithDrop}
                        onChange={() => setCastWithDrop(!castWithDrop)}
                      />
                    }
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    cursor: "pointer",
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
                  onClick={() => setDelay(!delay)}
                >
                  <Avatar sx={{ color: "#fff", bgcolor: "#17c1e8", width: "30px", height: "30px" }}>
                    <AccessTimeIcon />
                  </Avatar>
                  <Typography
                    fontSize="1rem"
                    sx={{ textTransform: "capitalize", color: "#000", marginLeft: 1 }}
                    variant="h5"
                  >
                    Delay
                  </Typography>
                  <FormControlLabel
                    sx={{ marginLeft: "auto" }}
                    control={<Checkbox checked={delay} onChange={() => setDelay(!delay)} />}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    cursor: "pointer",
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
                  onClick={() => setSteelFiber(!steelFiber)}
                >
                  <Avatar sx={{ color: "#fff", bgcolor: "#17c1e8", width: "30px", height: "30px" }}>
                    <ConstructionIcon />
                  </Avatar>
                  <Typography
                    fontSize="1rem"
                    sx={{ textTransform: "capitalize", color: "#000", marginLeft: 1 }}
                    variant="h5"
                  >
                    Steel Fiber
                  </Typography>
                  <FormControlLabel
                    sx={{ marginLeft: "auto" }}
                    control={
                      <Checkbox checked={steelFiber} onChange={() => setSteelFiber(!steelFiber)} />
                    }
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    cursor: "pointer",
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
                  onClick={() => setAccelerator(!accelerator)}
                >
                  <Avatar sx={{ color: "#fff", bgcolor: "#17c1e8", width: "30px", height: "30px" }}>
                    <SpeedIcon />
                  </Avatar>
                  <Typography
                    fontSize="1rem"
                    sx={{ textTransform: "capitalize", color: "#000", marginLeft: 1 }}
                    variant="h5"
                  >
                    Accelerator
                  </Typography>
                  <FormControlLabel
                    sx={{ marginLeft: "auto" }}
                    control={
                      <Checkbox checked={accelerator} onChange={() => setAccelerator(!accelerator)} />
                    }
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sx={{ m: 1, display: "flex", justifyItems: "start" }}>
              <SoftTypography
                variant="h4"
                sx={{ display: "flex", justifyContent: "center", color: "#000" }}
              >
                <span style={{ color: "#17c1e8", marginRight: "12px" }}>HOW</span> can we deliver{" "}
                <span style={{ color: "#17c1e8", marginLeft: "12px" }}>?</span>
              </SoftTypography>
            </Grid>
            <Grid item xs={12} md={6} mx={1}>
              <Box
                sx={{
                  cursor: "pointer",
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
                onClick={() => setUploadingTypeChecked(!uploadingTypeChecked)}
              >
                <Avatar sx={{ color: "#fff", bgcolor: "#17c1e8", width: "30px", height: "30px" }}>
                  <CloudUploadIcon />
                </Avatar>
                <Typography
                  fontSize="1rem"
                  sx={{ textTransform: "capitalize", color: "#000" }}
                  variant="h5"
                >
                  Select track Type
                </Typography>
                <FormControlLabel
                  sx={{ marginLeft: "auto" }}
                  control={
                    <Checkbox
                      checked={uploadingTypeChecked}
                      onChange={() => setUploadingTypeChecked(!uploadingTypeChecked)}
                      name="uploadingType"
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
                          WebkitAppearance: "none",
                          MozAppearance: "none",
                          appearance: "none",
                        },
                        "&:checked:before": {
                          borderColor: "#21B4FD",
                        },
                      }}
                    />
                  }
                />
              </Box>
            </Grid>
            {uploadingTypeChecked && (
              <>
                <Grid container spacing={2} m={1}>
                  <Grid item xs={12} md={6} display={"flex"} alignItems={"center"} gap={2}>
                    <Box
                      sx={{
                        cursor: "pointer",
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
                      onClick={() => handleItemClick("trackcar")}
                    >
                      <Typography
                        fontSize="1rem"
                        sx={{
                          textTransform: "capitalize",
                          color: "#000",
                          marginLeft: 1,
                          "&:hover": { cursor: "hand !important" },
                        }}
                        variant="h5"
                      >
                        16m Track car
                      </Typography>
                      <FormControlLabel
                        sx={{ marginLeft: "auto" }}
                        control={
                          <Checkbox
                            checked={selectedItem === "trackcar"}
                            onChange={() => handleItemClick("trackcar")}
                          />
                        }
                      />
                    </Box>
                    <Typography
                      sx={{ cursor: "pointer" }}
                      fontSize={"20px"}
                      fontWeight={800}
                      onClick={() => handleOpenSpecificPopup("trackcar")}
                    >
                      ?
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6} display={"flex"} alignItems={"center"} gap={2}>
                    <Box
                      sx={{
                        cursor: "pointer",
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
                      onClick={() => handleItemClick("directTip")}
                    >
                      <Typography
                        fontSize="1rem"
                        sx={{ textTransform: "capitalize", color: "#000", marginLeft: 1 }}
                        variant="h5"
                      >
                        1m Direct tip
                      </Typography>
                      <FormControlLabel
                        sx={{ marginLeft: "auto" }}
                        control={
                          <Checkbox
                            checked={selectedItem === "directTip"}
                            onChange={() => handleItemClick("directTip")}
                          />
                        }
                      />
                    </Box>
                    <Typography
                      sx={{ cursor: "pointer" }}
                      fontSize={"20px"}
                      fontWeight={800}
                      onClick={() => handleOpenSpecificPopup("directTip")}
                    >
                      ?
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6} display={"flex"} alignItems={"center"} gap={2}>
                    <Box
                      sx={{
                        cursor: "pointer",
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
                      onClick={() => handleItemClick("pumpMixer")}
                    >
                      <Typography
                        fontSize="1rem"
                        sx={{ textTransform: "capitalize", color: "#000", marginLeft: 1 }}
                        variant="h5"
                      >
                        24m Pump mixer
                      </Typography>
                      <FormControlLabel
                        sx={{ marginLeft: "auto" }}
                        control={
                          <Checkbox
                            checked={selectedItem === "pumpMixer"}
                            onChange={() => handleItemClick("pumpMixer")}
                          />
                        }
                      />
                    </Box>
                    <Typography
                      sx={{ cursor: "pointer" }}
                      fontSize={"20px"}
                      fontWeight={800}
                      onClick={() => handleOpenSpecificPopup("pumpMixer")}
                    >
                      ?
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6} display={"flex"} alignItems={"center"} gap={2}>
                    <Box
                      sx={{
                        cursor: "pointer",
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
                      onClick={() => handleItemClick("slideCar")}
                    >
                      <Typography
                        fontSize="1rem"
                        sx={{ textTransform: "capitalize", color: "#000", marginLeft: 1 }}
                        variant="h5"
                      >
                        9m Slide car
                      </Typography>
                      <FormControlLabel
                        sx={{ marginLeft: "auto" }}
                        control={
                          <Checkbox
                            checked={selectedItem === "slideCar"}
                            onChange={() => handleItemClick("slideCar")}
                          />
                        }
                      />
                    </Box>
                    <Typography
                      sx={{ cursor: "pointer" }}
                      fontSize={"20px"}
                      fontWeight={800}
                      onClick={() => handleOpenSpecificPopup("slideCar")}
                    >
                      ?
                    </Typography>
                  </Grid>
                </Grid>

                <Backdrop
                  open={Boolean(openPopup)}
                  sx={{
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                  }}
                />
                <Popover
                  open={openPopup === "trackcar"}
                  onClose={handleCloseSpecificPopup}
                  anchorEl={null}
                  anchorOrigin={{
                    vertical: "center",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "center",
                    horizontal: "center",
                  }}
                  PaperProps={{
                    sx: {
                      backgroundColor: "#ffffff",
                      padding: "20px",
                      paddingTop: "0px",
                      borderRadius: "10px",
                      boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
                      border: "none",
                      outline: "none",
                      width: "700px",
                      height: "730px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    },
                  }}
                >
                  <Trackcar onClose={handleCloseSpecificPopup} />
                </Popover>
                <Popover
                  open={openPopup === "directTip"}
                  onClose={handleCloseSpecificPopup}
                  anchorEl={null}
                  anchorOrigin={{
                    vertical: "center",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "center",
                    horizontal: "center",
                  }}
                  PaperProps={{
                    sx: {
                      backgroundColor: "#ffffff",
                      padding: "20px",
                      borderRadius: "10px",
                      boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
                      border: "none",
                      outline: "none",
                      width: "700px",
                      height: "680px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    },
                  }}
                >
                  <DirectTip onClose={handleCloseSpecificPopup} />
                </Popover>
                <Popover
                  open={openPopup === "pumpMixer"}
                  onClose={handleCloseSpecificPopup}
                  anchorEl={null}
                  anchorOrigin={{
                    vertical: "center",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "center",
                    horizontal: "center",
                  }}
                  PaperProps={{
                    sx: {
                      backgroundColor: "#ffffff",
                      padding: "20px",
                      borderRadius: "10px",
                      boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
                      border: "none",
                      outline: "none",
                      width: "700px",
                      height: "100% !important",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    },
                  }}
                >
                  <PumpMixer onClose={handleCloseSpecificPopup} />
                </Popover>
                <Popover
                  open={openPopup === "slideCar"}
                  onClose={handleCloseSpecificPopup}
                  anchorEl={null}
                  anchorOrigin={{
                    vertical: "center",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "center",
                    horizontal: "center",
                  }}
                  PaperProps={{
                    sx: {
                      backgroundColor: "#ffffff",
                      padding: "20px",
                      borderRadius: "10px",
                      boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
                      border: "none",
                      outline: "none",
                      width: "700px",
                      height: "750x",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    },
                  }}
                >
                  <SlideCar onClose={handleCloseSpecificPopup} />
                </Popover>
              </>
            )}
          </Grid>
          <Grid container spacing={2} sx={{ mt: 8, justifyContent: "flex-end" }}>
            <Box gap={5} sx={{ display: "flex", justifyContent: "end", mt: 2 }}>
              <Grid item xs={6} md={6}>
                <SoftButton
                  variant="outlined"
                  color="info"
                  sx={{
                    height: "45px !important",
                    borderRadius: "7px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onClick={() => navigate("/search-address")}
                >
                  Back
                </SoftButton>
              </Grid>
              <Grid item xs={6} md={6}>
                <SoftButton
                  variant="contained"
                  color="info"
                  sx={{
                    height: "45px !important",
                    borderRadius: "7px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onClick={handleNextClick}
                >
                  Next
                </SoftButton>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </DefaultLayout>
  );
};

export default CalculateArea;
