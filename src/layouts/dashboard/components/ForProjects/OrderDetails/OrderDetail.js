/**
=========================================================
* Soft UI Dashboard React - v4.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Box } from "@mui/material";
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
// Soft UI Dashboard React examples
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import VendorInfoCard from "layouts/dashboard/components/ForProjects/OrderDetails/Cards/VendorInfoCard";
import CancelRequest from "layouts/dashboard/components/ForProjects/OrderDetails/CancelRequest/CancelRequest";

//mui icons
import FireTruckIcon from "@mui/icons-material/FireTruck";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import CloudIcon from "@mui/icons-material/Cloud";
//pictogrammers icons

// Soft UI Dashboard React icons
import Cube from "examples/Icons/Cube";
import Document from "examples/Icons/Document";
import Settings from "examples/Icons/Settings";

// Soft UI Dashboard React base styles
import breakpoints from "assets/theme/base/breakpoints";

// Images
import burceMars from "assets/images/bruce-mars.jpg";
import home from "assets/images/home.jpg";
import homeimage from "assets/images/h2.jpg";
import curved0 from "assets/images/curved-images/curved0.jpg";
import MyGoogleMap from "layouts/dashboard/components/ForProjects/OrderDetails/GoogleMap";
import { object } from "prop-types";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import ProjectAccordion from "layouts/profile/components/ProjectAccordion/ProjectAccordion";
import borders from "assets/theme/base/borders";
import boxShadow from "assets/theme/functions/boxShadow";
import typography from "assets/theme/base/typography";
import SoftButton from "components/SoftButton";
import EditIcon from "@mui/icons-material/Edit";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import CloseIcon from "@mui/icons-material/Close";
import { getOrderById } from "api/apiService";

import { NavLink } from "react-router-dom";
import { useLocation, useParams } from "react-router-dom";

function OrderDetail() {
  const location = useLocation();
  const { orderId } = useParams();
  // const orderId = location.state?.orderId;
  console.log("orderDetail page-----", orderId,);
  const [orderData, setOrderData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { size, fontWeightBold } = typography;
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    /** 
     The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  const handleSetTabValue = (event, newValue) => setTabValue(newValue);

  // const dataSet = { weather_temprature: 4, weather_icon: "url", address: "address" };

  const role = localStorage.getItem("role");

  const fetchOrderDetails = async () => {
    const data = await getOrderById({ order_id: orderId });

    if (data.status) {
      setOrderData(data.data);
      setIsLoading(false);

      console.log("set data", orderData, data.data);
    }

    console.log("fetch order by id: ", data);
  };

  const [openChangeRequest, setOpenChangeRequest] = useState(false);

  const handleChangeRequest = () => {
    console.log("click change request");
    setOpenChangeRequest(!openChangeRequest);
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  return (
    <DashboardLayout>
      <Box>
        <DashboardNavbar dark />

        {!isLoading && (
          <>
            <SoftBox mt={4}>
              <Box sx={{ display: "flex", gap: "10px", justifyContent: "end" }}>
                <Box component={NavLink} to={`/projects/order-details/${orderId}`}>
                  {role === "admin" && (
                    <SoftButton
                      display="flex"
                      flexDirection="row"
                      justifyContent="center"
                      alignItems="center"
                      variant="outlined"
                      color="info"
                      size="small"
                    >
                      <EditIcon fontSize="medium" />
                      <span style={{ padding: "0 6px" }}>Edit</span>
                    </SoftButton>
                  )}
                </Box>
                <Box component={NavLink} to={`/projects/order-details/${orderId}`}>
                  {["admin", "vendor"].includes(role) && (
                    <SoftButton
                      display="flex"
                      flexDirection="row"
                      justifyContent="center"
                      alignItems="center"
                      variant="outlined"
                      color="info"
                      size="small"
                      onClick={handleChangeRequest}
                    >
                      <AutorenewIcon fontSize="medium" />
                      <span style={{ padding: "0 6px" }}>Change Request</span>
                    </SoftButton>
                  )}
                </Box>
                <Box component={NavLink} to={`/projects/order-details/${orderId}`}>
                  {["admin", "vendor", "customer"].includes(role) && (
                    <SoftButton
                      display="flex"
                      flexDirection="row"
                      justifyContent="center"
                      alignItems="center"
                      variant="outlined"
                      color="info"
                      size="small"
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyItems: "center",
                        alignItems: "center",
                      }}
                    >
                      <CloseIcon fontSize="medium" />
                      <span style={{ padding: "0 6px" }}>Cancel Request</span>
                    </SoftButton>
                  )}
                </Box>

                {/* <SoftButton variant="outlined" color="secondary" size="small">
              <EditIcon />
              <span style={{ padding: "0 6px" }}>Edit</span>
            </SoftButton> */}
              </Box>
            </SoftBox>

            <SoftBox position="relative" mt={4}>
              {/* <DashboardNavbar absolute dark /> */}
              <SoftBox
                display="flex"
                alignItems="center"
                position="relative"
                minHeight="18.75rem"
                borderRadius="xl"
                sx={{
                  // backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
                  //   `${linearGradient(
                  //     rgba(gradients.info.main, 0.6),
                  //     rgba(gradients.info.state, 0.6)
                  //   )},

                  //   url(${curved0})`,
                  backgroundSize: "cover",
                  backgroundPosition: "50%",
                  overflow: "hidden",
                  boxShadow:
                    " rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
                }}
              >
                <MyGoogleMap lng={+orderData?.lng} lat={+orderData?.lat} />
              </SoftBox>
              <Card
                sx={{
                  width: "93%",

                  backdropFilter: `saturate(200%) blur(30px)`,
                  backgroundColor: ({ functions: { rgba }, palette: { white } }) =>
                    rgba(white.main, 0.8),
                  boxShadow: ({ boxShadows: { navbarBoxShadow } }) => navbarBoxShadow,
                  position: "relative",
                  mt: -8,
                  mx: "auto",
                  py: 2,
                  px: 2,
                }}
              >
                <Grid container spacing={3} alignItems="center">
                  <Grid item>
                    <SoftAvatar
                      src={homeimage}
                      alt="profile-image"
                      variant="rounded"
                      size="xl"
                      shadow="sm"
                    />
                  </Grid>
                  <Grid item>
                    <SoftBox height="100%" mt={0.5} lineHeight={1}>
                      <SoftTypography variant="h5" fontWeight="medium">
                        Delivery Address
                      </SoftTypography>
                      <SoftTypography variant="button" color="text" fontWeight="medium">
                        {orderData.address}
                      </SoftTypography>
                    </SoftBox>
                  </Grid>
                  <Grid item xs={12} md={6} lg={4.5} sx={{ ml: "auto" }}>
                    <AppBar position="static">
                      <Box sx={{ display: "flex", gap: "20px" }}>
                        <SoftBox
                          sx={{
                            display: "flex",
                            gap: "10px",
                            alignItems: "center",
                            boxShadow: " rgba(0, 0, 0, 0.24) 0px 3px 8px",
                            borderRadius: "5px",
                            p: 1,

                            // minWidth: { xs: "auto", sm: "200px" }, width: {
                            //   xs: "auto", sm: "200px"
                            // }
                          }}
                        >
                          <FireTruckIcon sx={{ color: "info.main", fontSize: "70px" }} />
                          <SoftTypography color="text" fontSize="13px">
                            {orderData?.total_volume} mm Levernce
                          </SoftTypography>
                        </SoftBox>

                        <SoftBox
                          sx={{
                            display: "flex",
                            gap: "12px",
                            alignItems: "center",
                            boxShadow: " rgba(0, 0, 0, 0.24) 0px 3px 8px",
                            borderRadius: "5px",
                            p: 1,

                            // minWidth: { xs: "auto", sm: "200px" }, width: {
                            //   xs: "auto", sm: "200px"
                            // }
                          }}
                        >
                          <LocalShippingIcon sx={{ color: "info.main", fontSize: "70px" }} />
                          <SoftTypography color="text" fontSize="13px">
                            Delivery Date {orderData?.delivery_date[0]?.date}
                          </SoftTypography>
                        </SoftBox>

                        <SoftBox
                          sx={{
                            display: "flex",
                            gap: "12px",
                            alignItems: "center",
                            boxShadow: " rgba(0, 0, 0, 0.24) 0px 3px 8px",
                            borderRadius: "5px",
                            p: 1,
                            // minWidth: { xs: "auto", sm: "130px" }, width: {
                            //   xs: "auto", sm: "130px"
                            // }
                          }}
                        >
                          <CloudIcon sx={{ color: "info.main", fontSize: "70px" }} />
                          <SoftTypography color="text" fontSize="13px">
                            Weather {orderData?.weather_temprature}
                          </SoftTypography>
                        </SoftBox>

                        {/* <Tab disabled sx={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", fontSize: '1rem' }} label={"1300 mm Levernce"} icon={<FireTruckIcon sx={{ color: "info.main", fontSize: "40px" }} />} ></Tab>
                    <Tab disabled sx={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", fontSize: '0.7rem' }} label="Delivery Date 11/2/2024" icon={<LocalShippingIcon sx={{ color: "info.main" }} />} />
                    <Tab disabled sx={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", fontSize: '0.7rem' }} label="Weather 5 C" icon={<CloudIcon sx={{ color: "info.main" ,fontSize: "40px"}} />} />  */}
                      </Box>
                    </AppBar>
                  </Grid>
                </Grid>
              </Card>
            </SoftBox>
            <SoftBox mt={4} mb={3}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={12} xl={4}>
                  <VendorInfoCard
                    title="Creater information"
                    info={{
                      Name: `${orderData?.fullname}`,
                      email: `${orderData?.vendor_email}`,
                      address: `${orderData?.address}`,
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6} xl={4}>
                  <VendorInfoCard
                    title="Prosecutor information"
                    info={{
                      name: `${orderData?.vendor_title}`,
                      // mobile: `${orderData.}`,
                      email: `${orderData?.vendor_email}`,
                      location: `${orderData?.vendor_address}`,
                      distance: `${orderData?.distance}`,
                    }}
                  />
                </Grid>
                <Grid item xs={12} xl={4}>
                  <VendorInfoCard
                    title="Project Details"
                    info={{
                      order_title: `${orderData?.order_title}`,
                      Created_Date: `${orderData?.created_date?.date.split(" ")[0]}`,
                      status: `${orderData?.order_status?.status_text}  ${orderData?.order_status?.status_value}`,
                      description: `${orderData?.order_status?.status_description}`,
                    }}
                  />
                </Grid>
              </Grid>
            </SoftBox>
            {orderData?.deliveries?.length > 0 && <ProjectAccordion data={orderData?.deliveries} />}
          </>
        )}
        <CancelRequest modalVisble={openChangeRequest} setModalVisble={setOpenChangeRequest} />
      </Box>
    </DashboardLayout>
  );
}

export default OrderDetail;
