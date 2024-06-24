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

// @mui material components
import Grid from "@mui/material/Grid";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

function Footer() {
  return (
    <SoftBox component="footer" mt={5} >
      <Grid container justifyContent="center" >
        <Grid item xs={10} lg={6} xl={12} >
          <SoftBox display="flex" justifyContent="center" flexWrap="wrap" >
            <SoftBox mr={{ xs: 2, lg: 3, xl: 6 }}>
              <SoftTypography component="a" href="#" variant="body1"  color="#000">
                Company
              </SoftTypography>
            </SoftBox>
            <SoftBox mr={{ xs: 2, lg: 3, xl: 6 }}>
             <SoftTypography component="a" href="#" variant="body1" color="#000">
                About Us
              </SoftTypography>
            </SoftBox>
            <SoftBox mr={{ xs: 0, lg: 3, xl: 6 }}>
             <SoftTypography component="a" href="#" variant="body1" color="#000">
                Team
              </SoftTypography>
            </SoftBox>
            <SoftBox mr={{ xs: 2, lg: 3, xl: 6 }}>
             <SoftTypography component="a" href="#" variant="body1" color="#000">
                Product
              </SoftTypography>
            </SoftBox>
            <SoftBox mr={{ xs: 2, lg: 3, xl: 6 }}>
             <SoftTypography component="a" href="#" variant="body1" color="#000">
                Blog
              </SoftTypography>
            </SoftBox>
            <SoftBox>
             <SoftTypography component="a" href="#" variant="body1" color="#000">
                Pricing
              </SoftTypography>
            </SoftBox>
          </SoftBox>
        </Grid>
        <Grid item xs={12} lg={12} xl={12} >
          <SoftBox display="flex" justifyContent="center"  >
            <SoftBox mr={3} color="#000" >
              <FacebookIcon fontSize="small" />
            </SoftBox>
            <SoftBox mr={3} color="#000">
              <TwitterIcon fontSize="small" />
            </SoftBox>
            <SoftBox mr={3} color="#000">
              <InstagramIcon fontSize="small" />
            </SoftBox>
            <SoftBox mr={3} color="#000">
              <PinterestIcon fontSize="small" />
            </SoftBox>
            <SoftBox color="#000">
              <LinkedInIcon fontSize="small" />
            </SoftBox>
          </SoftBox>
        </Grid>
        <Grid item xs={12} lg={6} xl={12} sx={{ textAlign: "center" }}>
          <SoftTypography variant="body2" color="#000">
            Copyright &copy; 2021 Soft by Creative Tim.
          </SoftTypography>
        </Grid>
      </Grid>
    </SoftBox>
  );
}

export default Footer;
