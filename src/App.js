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

import React, { useState, useEffect } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
// import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
// import SoftBox from "components/SoftBox";

// Soft UI Dashboard React examples
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// Soft UI Dashboard React themes
import theme from "assets/theme";

// Soft UI Dashboard React routes
import routes from "routes";

// Soft UI Dashboard React contexts
// import { useSoftUIController, setMiniSidenav, setOpenConfigurator } from "context";
import { useSoftUIController, setMiniSidenav } from "context";

// Images
import brand from "assets/images/logo-ct.png";
import OrderDetail from "layouts/dashboard/components/ForProjects/OrderDetails/OrderDetail";
import ProjectsData from "layouts/dashboard/components/ForProjects";
import ProtectedRoute from "proctectedRoute/ProtectedRoute";
import SearchAddress from "components/SearchAddress";
import CalculateArea from "components/SearchAddress/CalculateArea";
import Summary from "components/SearchAddress/Summary";
import LogIn from "layouts/authentication/sign-in";

import "./app.css";

export default function App() {
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, layout, openConfigurator, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { pathname } = useLocation();

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  // const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  // const configsButton = (
  //   <SoftBox
  //     display="flex"
  //     justifyContent="center"
  //     alignItems="center"
  //     width="3.5rem"
  //     height="3.5rem"
  //     bgColor="white"
  //     shadow="sm"
  //     borderRadius="50%"
  //     position="fixed"
  //     right="2rem"
  //     bottom="2rem"
  //     zIndex={99}
  //     color="dark"
  //     sx={{ cursor: "pointer" }}
  //     onClick={handleConfiguratorOpen}
  //   >
  //     <Icon fontSize="default" color="inherit">
  //       settings
  //     </Icon>
  //   </SoftBox>
  // );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {layout === "dashboard" && (
        <>
          <Sidenav
            color={sidenavColor}
            brand={brand}
            brandName="BTONGAPPEN"
            routes={routes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          {/* <Configurator /> */}
          {/* {configsButton} */}
        </>
      )}

      <Routes>
        {getRoutes(routes)}
        <Route path="*" element={<Navigate to="/authentication/log-in" />} />
        <Route path="/authentication/log-in" element={<LogIn />} />
        <Route path="/" element={<Navigate to="/search-address" />} />
        <Route
          path="/projects/order-details/:orderId"
          element={
            <ProtectedRoute
              allowedRoles={["admin", "customer", "vendor"]}
              element={<OrderDetail />}
            />
          }
        />
        <Route
          path="/projects"
          element={
            <ProtectedRoute
              allowedRoles={["admin", "customer", "vendor"]}
              element={<ProjectsData />}
            />
          }
        />
        <Route path="/search-address" element={<SearchAddress />} />
        <Route path="/calculate-area" element={<CalculateArea />} />
        <Route path="/summary" element={<Summary />} />
      </Routes>
    </ThemeProvider>
  );
}
