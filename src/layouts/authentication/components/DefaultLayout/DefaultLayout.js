// prop-types is a library for typechecking of props
import PropTypes from "prop-types";
import React from 'react';
// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";

// Soft UI Dashboard React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import PageLayout from "examples/LayoutContainers/PageLayout";

// Authentication layout components
import Footer from "layouts/authentication/components/Footer";
import App_logo from "assets/images/logo.png";

function DefaultLayout({ top, children, extraContent }) {
  return (
    <PageLayout className="background-image-container">
 
      <DefaultNavbar
        action={{
          type: "external",
          route: "https://creative-tim.com/product/soft-ui-dashboard-react",
          label: "free download",
          color: "dark",
        }}
      />

      <Grid
        container
        justifyContent="center"
        sx={{
          height: "100vh",
          minHeight: "100vh !important",
          margin: 0,
        }}
      >
        <Grid item xs={11} sm={11} md={7} xl={7}>
          <SoftBox mt={15}>
            <Grid display={"flex"} justifyContent={"center"}>
         <img src={App_logo} alt="App Logo" style={{ width: "300px", height: "100px" }} />{" "}
            </Grid>
 
            <SoftBox>{children}</SoftBox>
          </SoftBox>
        </Grid>
        <Grid item xs={11} sm={11} md={7} xl={5} sx={{ backgroundColor: "#17C1E8" }}>
          {extraContent}
        </Grid>
        <Footer />
      </Grid>
    </PageLayout>
  );
}

// Setting default values for the props of DefaultLayout
DefaultLayout.defaultProps = {
  header: "",
  title: "",
  description: "",
  color: "info",
  top: 20,
  extraContent: null,
};

// Typechecking props for the DefaultLayout
DefaultLayout.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
    "light",
  ]),
  header: PropTypes.node,
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string.isRequired,
  top: PropTypes.number,
  children: PropTypes.node.isRequired,
  extraContent: PropTypes.node, // Add this line to validate extraContent
};

export default DefaultLayout;
