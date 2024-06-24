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
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
// Soft UI Dashboard React examples
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
//mui icons
import FireTruckIcon from '@mui/icons-material/FireTruck';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import CloudIcon from '@mui/icons-material/Cloud';
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
function OrderDetail() {
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

  return (
    <DashboardLayout>
      <Box>
        <DashboardNavbar dark />
        <SoftBox position="relative" mt={2}>
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
              boxShadow: " rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px"
            }}
          >
            <MyGoogleMap />
          </SoftBox>
          <Card
            sx={{
              width: "93%",

              backdropFilter: `saturate(200%) blur(30px)`,
              backgroundColor: ({ functions: { rgba }, palette: { white } }) => rgba(white.main, 0.8),
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
                    1 Norway St, Boston, MA 02115, USA
                  </SoftTypography>
                </SoftBox>
              </Grid>
              <Grid item xs={12} md={6} lg={4.5} sx={{ ml: "auto" }}>
                <AppBar position="static">

                  <Box sx={{ display: "flex", gap: "20px" }}>


                    <SoftBox sx={{ display: "flex", gap: "10px", alignItems: "center", boxShadow: " rgba(0, 0, 0, 0.24) 0px 3px 8px", borderRadius: "5px", p: 1, 
                    
                    
                    // minWidth: { xs: "auto", sm: "200px" }, width: {
                    //   xs: "auto", sm: "200px"
                    // }
                    
                    }}>
                      <FireTruckIcon sx={{ color: "info.main", fontSize: "70px" }} />
                      <SoftTypography color="text" fontSize="13px">1300 mm Levernce</SoftTypography>
                    </SoftBox>

                    <SoftBox sx={{ display: "flex", gap: "12px", alignItems: "center", boxShadow: " rgba(0, 0, 0, 0.24) 0px 3px 8px", borderRadius: "5px", p: 1,
                    
                    
                    // minWidth: { xs: "auto", sm: "200px" }, width: {
                    //   xs: "auto", sm: "200px"
                    // }
                    }}>
                      <LocalShippingIcon sx={{ color: "info.main", fontSize: "70px" }} />
                      <SoftTypography color="text" fontSize="13px">Delivery Date 11/2/2024</SoftTypography>
                    </SoftBox>

                    <SoftBox sx={{
                      display: "flex",
                      gap: "12px",
                      alignItems: "center", boxShadow: " rgba(0, 0, 0, 0.24) 0px 3px 8px",
                      borderRadius: "5px", p: 1,
                      // minWidth: { xs: "auto", sm: "130px" }, width: {
                      //   xs: "auto", sm: "130px"
                      // }
                    }}>
                      <CloudIcon sx={{ color: "info.main", fontSize: "70px" }} />
                      <SoftTypography color="text" fontSize="13px">Weather 5 C</SoftTypography>
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
        <ProjectAccordion />
      </Box>


    </DashboardLayout>
  );
}

export default OrderDetail;



