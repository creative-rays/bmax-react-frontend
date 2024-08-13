import React, { useState } from "react";
import {
  TextField, Checkbox, FormControlLabel, Button, Typography, Box, Grid, List, ListItem, ListItemText, IconButton, Avatar
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import DefaultLayout from "layouts/authentication/components/DefaultLayout/DefaultLayout";
import SoftButton from "components/SoftButton";
import { useGlobalState } from "globalState/globalState";
import { createOrder, fetchUploadAPI } from './weatherUtils'; // Adjust import as necessary

const Summary = () => {
  const location = useLocation();
  const {
    address,
    dateTimeFields = [],
    combinedTotalArea,
    personName,
    concreteConfig,
    castWithDrop,
    delay,
    steelFiber,
    accelerator,
    uploadingTypeChecked,
    selectedItem,
    weatherData = [],
  } = location.state || {};

  const { state } = useGlobalState(); // Access global state
  const [offerOnCasting, setOfferOnCasting] = useState(false);
  const [offerOnFloorSanding, setOfferOnFloorSanding] = useState(false);
  const [responsibility, setResponsibility] = useState("selfBuilder");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    companyName: "",
    surname: "",
    phoneOnCastingDay: "",
    companyEmail: "",
    organizationNumber: "",
    projectNumber: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validate = () => {
    const newErrors = {};
    if (responsibility === "selfBuilder" && !validateEmail(formData.email)) {
      newErrors.email = "Valid Email is required";
    }
    if (responsibility === "company" && !validateEmail(formData.companyEmail)) {
      newErrors.companyEmail = "Valid Company Email is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleResponsibilityChange = (type) => {
    setResponsibility(type);
    setErrors({});
  };

  const handleSubmit = async () => {
    if (!acceptedTerms) {
      setMessage("Please accept the terms and conditions to proceed.");
      return;
    }

    if (!validate()) {
      setMessage("Please fill in the required fields.");
      return;
    }

    setLoading(true);
    setMessage('');

    const orderData = {
      step1State: {
        selectTimeLater: 0,
        numDeliveryDates: dateTimeFields.length,
        currentLocation: address,
        savedLocation: address,
        savedLat: "60.1938415",  // Example latitude, replace with actual data
        savedLng: "11.0996763",  // Example longitude, replace with actual data
        savedZoom: "15",
        times: dateTimeFields.map((field, index) => ({
          itemId: index + 1,
          time: field.time,
          date: field.date
        })),
        address_1: address,
        country: "Norway", // Replace with actual data if available
        postcode: "2061",  // Replace with actual data if available
        town: "Gardermoen",  // Replace with actual data if available
        vendor_id: "3572",  // Replace with actual data if available
        distance: "36.74",  // Example distance, replace with actual data
        vendor_address: "Trondheimsveien 660, 0964 Oslo", // Replace with actual data
        vendor_email: "gjelleråsen@betongsentrum.no" // Replace with actual data
      },
      step2State: {
        deliveries: [
          {
            deliveryId: 1,
            calculatorAreas: [],
            selectAreaLater: false,
            totalArea: combinedTotalArea.toString(),
            selectVehicleLater: false,
            vehicleType: "40",  // Example vehicle type, replace with actual data
            concreteIsCustom: false,
            customConcreteType: "1",  // Example custom concrete type, replace with actual data
            withDeclineOption: castWithDrop,
            withRetardationOption: delay,
            withSteelfiberOption: steelFiber,
            withAcceleratorOption: accelerator,
            pumpWash: false,
            addSmallVolume: false,
            addHose: false,
            hoseAmount: 0
          }
        ],
        numCustomConcretes: 0,
        customConcretes: []
      },
      step3State: {
        contactType: responsibility === "company" ? "company" : "selfBuilder",
        professionalLabor: true,
        professionalLevel: 0,
        termsAccepted: acceptedTerms,
        privacyAccepted: false,
        otherInformation: "",
        companyName: formData.companyName,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber,
        emailAddress: formData.email,
        vatNumber: formData.organizationNumber,
        projectNumber: formData.projectNumber
      }
    };

    console.log("Order Data:", orderData); // Log data to console

    try {
      const result = await createOrder(orderData);
      console.log("Order created successfully:", result);
      setMessage("Order created successfully");
      // Redirect to the same page to refresh and clear data
      setTimeout(() => navigate("/search-address"), 2000);
    } catch (error) {
      console.error("Error creating order:", error);
      setMessage(`Failed to create order: ${error.message || 'An error occurred'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      // Process each selected file
      Array.from(files).forEach(file => {
        uploadFile(file);
      });
    }
  };

  const uploadFile = async (file) => {
    try {
      // Simulating an upload process; replace with your actual upload logic
      console.log('Uploading file:', file.name);
      // Here, you can call your upload function or perform any necessary processing
      // For example:
      // const result = await fetchUploadAPI(file);
      // console.log('Upload result:', result);

      // Adding the uploaded file to the state for display purposes
      setUploadedFiles(prevFiles => [...prevFiles, file]);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file. Please check console for details.');
    }
  };

  const handleFileRemove = (index) => {
    const updatedFiles = [...uploadedFiles];
    updatedFiles.splice(index, 1);
    setUploadedFiles(updatedFiles);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
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
        marginTop: "180px"
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
                    <Typography variant="body2">Wind Direction: {weatherData[index]?.weather?.wind_direction}°</Typography>
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
          <span style={{ fontWeight: "900", fontSize: "25px" }}>Step 2</span> Delivery configurations
        </Typography>
        <Box
          p={2}
          sx={{
            border: "1px solid #fff",
            width: "100%",
            backgroundColor: "#17C1E8",
            borderRadius: "10px"
          }}
        >
          <Typography color={"#fff"} variant="body2">
            Total Area {`${combinedTotalArea.toFixed(2)} Square Meters`}
          </Typography>
          <Typography color={"#fff"} variant="body2">
            Project Type {personName.join(", ")}
          </Typography>
          {concreteConfig && (
            <>
              <Typography color={"#fff"} variant="body2">Custom Concrete {concreteConfig.concreteType || "N/A"}</Typography>
              <Box ml={2}>
                <Typography color={"#fff"} variant="body2">Quality {concreteConfig.quality}</Typography>
                <Typography color={"#fff"} variant="body2">Stone Type {concreteConfig.stoneType}</Typography>
                <Typography color={"#fff"} variant="body2">Stone Reduction {concreteConfig.stoneReduction}</Typography>
                <Typography color={"#fff"} variant="body2">Consistency: {concreteConfig.consistency}</Typography>
                <Typography color={"#fff"} variant="body2">Additional Choices:</Typography>
                {concreteConfig.additionalChoices && (
                  <>
                    {concreteConfig.additionalChoices.lowCarbon && <Typography color={"#fff"} variant="body2">Low Carbon: Yes</Typography>}
                    {concreteConfig.additionalChoices.soilMoist && <Typography color={"#fff"} variant="body2">Soil Moist: Yes</Typography>}
                    {concreteConfig.additionalChoices.frostproof && <Typography color={"#fff"} variant="body2">Frostproof: Yes</Typography>}
                    {concreteConfig.additionalChoices.livestockFarming && <Typography color={"#fff"} variant="body2">Livestock Farming: Yes</Typography>}
                  </>
                )}
              </Box>
            </>
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
        <Typography color={"#fff"} variant="body2">
          <span style={{ fontWeight: "900", fontSize: "25px" }}>Step 3</span> Summary
        </Typography>
        <Box
          p={2}
          sx={{
            border: "1px solid #fff",
            width: "100%",
            backgroundColor: "#17C1E8",
            borderRadius: "10px"
          }}
        >
          <Typography color={"#fff"} variant="body2">Offer On Casting: {offerOnCasting ? "Yes" : "No"}</Typography>
          <Typography color={"#fff"} variant="body2">Offer On Floor Sanding: {offerOnFloorSanding ? "Yes" : "No"}</Typography>
          <Typography color={"#fff"} variant="body2">Responsibility: {responsibility === "selfBuilder" ? "Self Builder" : "Company"}</Typography>
          <Typography color={"#fff"} variant="body2">Accepted Terms: {acceptedTerms ? "Yes" : "No"}</Typography>
          <Typography color={"#fff"} variant="body2">Uploaded Files:</Typography>
          {uploadedFiles.length > 0 ? (
            <List>
              {uploadedFiles.map((file, index) => (
                <ListItem key={index}>
                  <ListItemText primary={file.name} />
                  <IconButton edge="end" onClick={() => handleFileRemove(index)}>
                    <DeleteIcon sx={{ color: "red" }} />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography color={"#fff"} variant="body2">No files uploaded</Typography>
          )}
        </Box>
      </Grid>
    </Box>
  );

  return (
    <DefaultLayout extraContent={extraContent}>
      <Grid container spacing={2} gap={3} mt={5} mb={10} px={{ xs: 2, md: 20 }}>
        <Grid item xs={12}>
          <Typography variant="h4" color="#000" sx={{ mb: 2, textAlign: "center" }}>
            Other information?
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Describe your project/location."
            multiline
            rows={4}
            sx={{ mb: 2 }}
          />
          <Box
            sx={{
              border: "1px solid black",
              backgroundColor: "#fff",
              borderRadius: "7px",
              mb: 2,
            }}
          >
            <Box display="flex" justifyContent="flex-end" mx={3} my={1}>
              <input type="file" hidden multiple onChange={handleFileChange} />
              <Button variant="contained" component="label" sx={{ color: "#fff", backgroundColor: "#4caf50" }}>
                Choose files to upload
                <input type="file" hidden multiple onChange={handleFileChange} />
              </Button>
            </Box>
            {uploadedFiles.length > 0 && (
              <Box mx={2}>
                <Typography variant="h6">Uploaded Files:</Typography>
                <List>
                  {uploadedFiles.map((file, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={file.name} />
                      <IconButton edge="end" onClick={() => handleFileRemove(index)}>
                        <DeleteIcon sx={{ color: "red" }} />
                      </IconButton>
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}
          </Box>

          <Box display="flex" flexWrap="wrap" gap={2} px={2}>
            <FormControlLabel
              control={
                <Checkbox
                  sx={{
                    border: "1px solid black",
                  }}
                  checked={offerOnCasting}
                  onChange={() => setOfferOnCasting(!offerOnCasting)}
                />
              }
              label="Offer On Casting!"
              sx={{
                color: "#000",
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  sx={{
                    border: "1px solid black",
                  }}
                  checked={offerOnFloorSanding}
                  onChange={() => setOfferOnFloorSanding(!offerOnFloorSanding)}
                />
              }
              label="Offer On Floor Sanding!"
              sx={{
                color: "#000",
              }}
            />
          </Box>
          <Typography variant="h5" color="#000" sx={{ mt: 3, mb: 2 }}>
            WHO is responsible?
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Button
                sx={{
                  color: responsibility === "selfBuilder" ? "#fff" : "#17C1E8",
                  bgcolor: responsibility === "selfBuilder" ? "#17C1E8" : "transparent",
                  "&:hover": {
                    bgcolor:
                      responsibility === "selfBuilder" ? "#17C1E8" : "rgba(23, 193, 232, 0.1)",
                    borderColor: responsibility === "selfBuilder" ? "#17C1E8" : "#17C1E8",
                  },
                  borderColor: responsibility === "selfBuilder" ? "#17C1E8" : "#17C1E8",
                }}
                variant={responsibility === "selfBuilder" ? "contained" : "outlined"}
                fullWidth
                onClick={() => handleResponsibilityChange("selfBuilder")}
              >
                SELF BUILDER
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                sx={{
                  color: responsibility === "company" ? "#fff" : "#17C1E8",
                  bgcolor: responsibility === "company" ? "#17C1E8" : "transparent",
                  "&:hover": {
                    bgcolor: responsibility === "company" ? "#17C1E8" : "rgba(23, 193, 232, 0.1)",
                    borderColor: responsibility === "company" ? "#17C1E8" : "#17C1E8",
                  },
                  borderColor: "#17C1E8",
                }}
                variant={responsibility === "company" ? "contained" : "outlined"}
                fullWidth
                onClick={() => handleResponsibilityChange("company")}
              >
                COMPANY
              </Button>
            </Grid>
          </Grid>

          {responsibility === "selfBuilder" && (
            <Box mt={2}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="First Name"
                    name="firstName"
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Last Name"
                    name="lastName"
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Phone Number"
                    name="phoneNumber"
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Email"
                    name="email"
                    onChange={handleInputChange}
                    error={!!errors.email}
                    helperText={errors.email}
                  />
                </Grid>
              </Grid>
            </Box>
          )}

          {responsibility === "company" && (
            <Box mt={2}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Company Name"
                    name="companyName"
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="First Name"
                    name="firstName"
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Surname"
                    name="surname"
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Phone on Casting Day"
                    name="phoneOnCastingDay"
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Your E-mail Address"
                    name="companyEmail"
                    onChange={handleInputChange}
                    error={!!errors.companyEmail}
                    helperText={errors.companyEmail}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Organization Number"
                    name="organizationNumber"
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Project Number"
                    name="projectNumber"
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>
            </Box>
          )}

          <Typography variant="body1" color="error" sx={{ mt: 2, mb: 2 }}>
            ATTENTION! As a customer, you yourself are responsible for the information entered,
            including the amount of concrete, area of use, and unloading method.
          </Typography>
          <FormControlLabel
            sx={{ marginX: "5px" }}
            control={
              <Checkbox
                sx={{ border: "1px solid black" }}
                checked={acceptedTerms}
                onChange={() => setAcceptedTerms(!acceptedTerms)}
              />
            }
            label="I Accept The Terms And Conditions, As Well As The Privacy Policy."
          />

          <Box gap={5} sx={{ display: "flex", justifyContent: "end", mt: 2 }}>
            <SoftButton variant="outlined" color="info" onClick={() => navigate("/calculate-area")}>
              BACK
            </SoftButton>
            <SoftButton variant="contained" color="info" disabled={loading} onClick={handleSubmit}>
              {loading ? "Processing..." : "ORDER"}
            </SoftButton>
          </Box>

          {message && (
            <Typography variant="body1" display={"flex"} justifyContent={"center"} color={message.startsWith("Order created successfully") ? "green" : "error"} sx={{ mt: 2, mb: 2 }}>
              {message}
            </Typography>
          )}
        </Grid>
      </Grid>
    </DefaultLayout>
  );
};

export default Summary;
