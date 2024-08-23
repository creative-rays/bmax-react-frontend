import React from "react";

/* eslint-disable react/prop-types */
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
// import SoftAvatar from "components/SoftAvatar";
import SoftBadge from "components/SoftBadge";

// Images

import Box from "@mui/material/Box";
// import VisibilityIcon from "@mui/icons-material/Visibility";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
// import { IconButton } from "@mui/material";

// import ViewIcon from "examples/Icons/ViewIcon";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SoftButton from "components/SoftButton";

// import getAdminOrders from "api/apiService";

// mui menu for actions
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

function BasicMenu({ role, orderId }) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  console.log("current role:", role, role === "admin", "orderId:", orderId);

  const handleView = () => {
    console.log("orderId:", orderId);

    navigate(`/projects/order-details/${orderId}`);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreHorizIcon fontSize="large" />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {/* <MenuItem onClick={handleClose}>
          <Box component={NavLink} to={"/projects/order-details"}>
            <SoftButton variant="outlined" color="info" size="small">
              <VisibilityIcon /> <span style={{ padding: "0 6px" }}>view</span>
            </SoftButton>
          </Box>
        </MenuItem> */}
        {["admin", "vendor", "customer"].includes(role) && (
          <MenuItem onClick={handleView}>View</MenuItem>
        )}
        {role === "admin" && <MenuItem onClick={handleClose}>Edit</MenuItem>}
        {["admin", "vendor"].includes(role) && (
          <MenuItem onClick={handleClose}>Change Request</MenuItem>
        )}
        {["admin", "vendor", "customer"].includes(role) && (
          <MenuItem onClick={handleClose}>Cancel Request</MenuItem>
        )}
      </Menu>
    </div>
  );
}

// function OrderId({ order_id }) {
//   return (
//     <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
//       <SoftBox mr={2}>
//         <SoftAvatar src={image} alt={name} size="sm" variant="rounded" />
//       </SoftBox>
//       <SoftBox display="flex" flexDirection="column">
//         <SoftTypography variant="button" fontWeight="medium">
//           {name}
//         </SoftTypography>
//         <SoftTypography variant="caption" color="secondary">
//           {orderId}
//         </SoftTypography>
//       </SoftBox>
//     </SoftBox>
//   );
// }

// function Function({ job, org }) {
//   return (
//     <SoftBox display="flex" flexDirection="column">
//       <SoftTypography variant="caption" fontWeight="medium" color="text">
//         {job}
//       </SoftTypography>
//       {/* <SoftTypography variant="caption" color="secondary">
//         {org}
//       </SoftTypography> */}
//     </SoftBox>
//   );
// }

const ProTableData = (data) => {
  //set role to show options
  const role = localStorage.getItem("role");

  console.log("in table data:", data, role);
  const rows = data.map((item, index) => {
    return {
      orderId: (
        <SoftTypography variant="caption" color="secondary">
          {item.order_id}
        </SoftTypography>
      ),
      orderDate: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          {item.date}
        </SoftTypography>
      ),
      status: (
        <SoftBadge
          variant="gradient"
          badgeContent={`${item.status}`}
          color="success"
          size="xs"
          container
        />
      ),
      total: (
        <SoftTypography
          variant="caption"
          color="secondary"
          fontWeight="medium"
          sx={{ textalign: "left !important" }}
        >
          {item.currency} {item.total}
        </SoftTypography>
      ),
      totalItems: (
        <SoftTypography
          variant="caption"
          color="secondary"
          fontWeight="medium"
          sx={{ textalign: "left !important" }}
        >
          {item.number_of_items}
        </SoftTypography>
      ),
      " ": (
        <SoftBox>
          <Box sx={{ display: "flex", gap: "10px" }}>
            <Box
              component={NavLink}
              to={`/projects/order-details/${item.order_id}`}
            >
              <SoftButton variant="outlined" color="info" size="small">
                View
              </SoftButton>
            </Box>
            {/* <Box component={NavLink} to={"/projects/order-details"}> */}
            {/* <SoftButton variant="outlined" color="info" size="small"> */}
            <BasicMenu role={role} orderId={item.order_id} />
            {/* </SoftButton> */}
            {/* </Box> */}
            {/* <SoftButton variant="outlined" color="secondary" size="small">
              <EditIcon />
              <span style={{ padding: "0 6px" }}>Edit</span>
              <BasicMenu role={role} />
            </SoftButton> */}
          </Box>
        </SoftBox>
      ),
    };
  });

  const columns = [
    { name: "orderId", align: "center" },
    { name: "orderDate", align: "left" },
    { name: "status", align: "center" },
    { name: "total", align: "right" },
    { name: "totalItems", align: "right" },
    { name: " ", align: "center" },
  ];

  const output = { columns, rows };

  return output;
};

export default ProTableData;
