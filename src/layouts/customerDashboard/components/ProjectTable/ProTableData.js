/* eslint-disable react/prop-types */
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftBadge from "components/SoftBadge";

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import Box from '@mui/material/Box';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from "@mui/material";

import ViewIcon from 'examples/Icons/ViewIcon';
import { NavLink } from "react-router-dom";
import SoftButton from "components/SoftButton";


function Author({ image, name, orderId }) {
  return (
    <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
      <SoftBox mr={2}>
        <SoftAvatar src={image} alt={name} size="sm" variant="rounded" />
      </SoftBox>
      <SoftBox display="flex" flexDirection="column">
        <SoftTypography variant="button" fontWeight="medium">
          {name}
        </SoftTypography>
        <SoftTypography variant="caption" color="secondary">
          {orderId}
        </SoftTypography>
      </SoftBox>
    </SoftBox>
  );
}

function Function({ job, org }) {
  return (
    <SoftBox display="flex" flexDirection="column">
      <SoftTypography variant="caption" fontWeight="medium" color="text">
        {job}
      </SoftTypography>
      {/* <SoftTypography variant="caption" color="secondary">
        {org}
      </SoftTypography> */}
    </SoftBox>
  );
}

const ProTableData = {
  columns: [
    { name: "order", align: "left" },
    { name: "vendor", align: "left" },
    { name: "orderdate", align: "left" },
    { name: "status", align: "center" },
    { name: "total", align: "right" },
    { name: "action", align: "center" },
  ],

  rows: [
    {
      order: <Author image={team2} name="John Michael" orderId="#004GH0045TDD"  />,
      vendor: <Function job="Manager" org="Organization" />,
      orderdate: <SoftTypography variant="caption" color="secondary" fontWeight="medium">
        23/04/18
      </SoftTypography>,
      status: (
        <SoftBadge variant="gradient" badgeContent="completed" color="success" size="xs" container />
      ),
      total: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium" sx={{ textalign: "left !important" }}>

          NOK 14,204,361.05 <small>(incl. NOK</small> <br /><small> 2,840,872.21 VAT)</small>
        </SoftTypography>
      ),
      action: (
        <SoftBox>

        <Box sx={{ display: "flex", gap: "10px" }}>
          <Box component={NavLink} to={'/projects/order-details'}>
            <SoftButton variant="outlined" color="info" size="small">
              <VisibilityIcon /> <span style={{padding:"0 6px"}}>view</span></SoftButton>
          </Box>
          <SoftButton variant="outlined" color="secondary" size="small">
            <EditIcon />
            <span style={{padding:"0 6px"}}>Edit</span>
          </SoftButton>
        </Box>


      </SoftBox>

      ),
    },
    {
      order: <Author image={team2} name="John Michael" orderId="#004GH0045TDD" />,
      vendor: <Function job="Manager" org="Organization" />,
      orderdate: <SoftTypography variant="caption" color="secondary" fontWeight="medium">
        23/04/18
      </SoftTypography>,
      status: (
        <SoftBadge variant="gradient" badgeContent="pending..." color="secondary" size="xs" container />
      ),
      total: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium" sx={{ textalign: "left !important" }}>

          NOK 14,204,361.05 <small>(incl. NOK</small> <br /><small> 2,840,872.21 VAT)</small>
        </SoftTypography>
      ),
      action: (
        <SoftBox>

        <Box sx={{ display: "flex", gap: "10px" }}>
          <Box component={NavLink} to={'/projects/order-details'}>
            <SoftButton variant="outlined" color="info" size="small">
              <VisibilityIcon /> <span style={{padding:"0 6px"}}>view</span></SoftButton>
          </Box>
          <SoftButton variant="outlined" color="secondary" size="small">
            <EditIcon />
            <span style={{padding:"0 6px"}}>Edit</span>
            
          </SoftButton>
        </Box>


      </SoftBox>

      ),
    },
    {
      order: <Author image={team2} name="John Michael" orderId="#004GH0045TDD"  />,
      vendor: <Function job="Manager" org="Organization" />,
      orderdate: <SoftTypography variant="caption" color="secondary" fontWeight="medium">
        23/04/18
      </SoftTypography>,
      status: (
        <SoftBadge variant="gradient" badgeContent="pending..." color="secondary" size="xs" container />
      ),
      total: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium" sx={{ textalign: "left !important" }}>

          NOK 14,204,361.05 <small>(incl. NOK</small> <br /><small> 2,840,872.21 VAT)</small>
        </SoftTypography>
      ),
      action: (
        <SoftBox>

          <Box sx={{ display: "flex", gap: "10px" }}>
            <Box component={NavLink} to={'/projects/order-details'}>
              <SoftButton variant="outlined" color="info" size="small">
                <VisibilityIcon /> <span style={{padding:"0 6px"}}>view</span></SoftButton>
            </Box>
            <SoftButton variant="outlined" color="secondary" size="small">
              <EditIcon />
              <span style={{padding:"0 6px"}}>Edit</span>
            </SoftButton>
          </Box>


        </SoftBox>

      ),
    },
    {
      order: <Author image={team2} name="John Michael" orderId="#004GH0045TDD"  />,
      vendor: <Function job="Manager" org="Organization" />,
      orderdate: <SoftTypography variant="caption" color="secondary" fontWeight="medium">
        23/04/18
      </SoftTypography>,
      status: (
        <SoftBadge variant="gradient" badgeContent="completed" color="success" size="xs" container />
      ),
      total: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium" sx={{ textalign: "left !important" }}>

          NOK 14,204,361.05 <small>(incl. NOK</small> <br /><small> 2,840,872.21 VAT)</small>
        </SoftTypography>
      ),
      action: (
        <SoftBox>

        <Box sx={{ display: "flex", gap: "10px" }}>
          <Box component={NavLink} to={'/projects/order-details'}>
            <SoftButton variant="outlined" color="info" size="small">
              <VisibilityIcon /> <span style={{padding:"0 6px"}}>view</span></SoftButton>
          </Box>
          <SoftButton variant="outlined" color="secondary" size="small">
            <EditIcon />
            <span style={{padding:"0 6px"}}>Edit</span>
          </SoftButton>
        </Box>


      </SoftBox>

      ),
    },
    {
      order: <Author image={team2} name="John Michael" orderId="#004GH0045TDD" />,
      vendor: <Function job="Manager" org="Organization" />,
      orderdate: <SoftTypography variant="caption" color="secondary" fontWeight="medium">
        23/04/18
      </SoftTypography>,
      status: (
        <SoftBadge variant="gradient" badgeContent="pending..." color="secondary" size="xs" container />
      ),
      total: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium" sx={{ textalign: "left !important" }}>

          NOK 14,204,361.05 <small>(incl. NOK</small> <br /><small> 2,840,872.21 VAT)</small>
        </SoftTypography>
      ),
      action: (
        <SoftBox>

          <Box sx={{ display: "flex", gap: "10px" }}>
            <Box component={NavLink} to={'/projects/order-details'}>
              <SoftButton variant="outlined" color="info" size="small">
                <VisibilityIcon />
                <span style={{padding:"0 6px"}}>view</span>
                 </SoftButton>
            </Box>
            <SoftButton variant="outlined" color="secondary" size="small">
              <EditIcon />
              <span style={{padding:"0 6px"}}>Edit</span>
            </SoftButton>
          </Box>


        </SoftBox>

      ),
    },
    {
      order: <Author image={team2} name="John Michael" orderId="#004GH0045TDD"  />,
      vendor: <Function job="Manager" org="Organization" />,
      orderdate: <SoftTypography variant="caption" color="secondary" fontWeight="medium">
        23/04/18
      </SoftTypography>,
      status: (
        <SoftBadge variant="gradient" badgeContent="completed" color="success" size="xs" container />
      ),
      total: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium" sx={{ textalign: "left !important" }}>

          NOK 14,204,361.05 <small>(incl. NOK</small> <br /><small> 2,840,872.21 VAT)</small>
        </SoftTypography>
      ),
      action: (
        <SoftBox>

        <Box sx={{ display: "flex", gap: "10px" }}>
          <Box component={NavLink} to={'/projects/order-details'}>
            <SoftButton variant="outlined" color="info" size="small">
              <VisibilityIcon /> <span style={{padding:"0 6px"}}>view</span></SoftButton>
          </Box>
          <SoftButton variant="outlined" color="secondary" size="small">
            <EditIcon />
            <span style={{padding:"0 6px"}}>Edit</span>
          </SoftButton>
        </Box>


      </SoftBox>

      ),
    },
    {
      order: <Author image={team2} name="John Michael" orderId="#004GH0045TDD"  />,
      vendor: <Function job="Manager" org="Organization" />,
      orderdate: <SoftTypography variant="caption" color="secondary" fontWeight="medium">
        23/04/18
      </SoftTypography>,
      status: (
        <SoftBadge variant="gradient" badgeContent="completed" color="success" size="xs" container />
      ),
      total: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium" sx={{ textalign: "left !important" }}>

          NOK 14,204,361.05 <small>(incl. NOK</small> <br /><small> 2,840,872.21 VAT)</small>
        </SoftTypography>
      ),
      action: (
        <SoftBox>

        <Box sx={{ display: "flex", gap: "10px" }}>
          <Box component={NavLink} to={'/projects/order-details'}>
            <SoftButton variant="outlined" color="info" size="small">
              <VisibilityIcon /> <span style={{padding:"0 6px"}}>view</span></SoftButton>
          </Box>
          <SoftButton variant="outlined" color="secondary" size="small">
            <EditIcon />
            <span style={{padding:"0 6px"}}>Edit</span>
          </SoftButton>
        </Box>


      </SoftBox>

      ),
    },


  ],
};

export default ProTableData;


