// @mui material components
import Card from "@mui/material/Card";
import { useState } from "react";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";

//icons
import CloseIcon from '@mui/icons-material/Close';
/* eslint-disable react/prop-types */
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftBadge from "components/SoftBadge";
import { Box, Modal, MenuItem, Button, Select, FormControl, InputLabel, FormHelperText } from '@mui/material';
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Images
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import { NavLink } from "react-router-dom";

function Author({ name, email }) {
  return (
    <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
      <SoftBox display="flex" flexDirection="column">
        <SoftTypography variant="button" fontWeight="medium">
          {name}
        </SoftTypography>
        <SoftTypography variant="caption" color="secondary">
          {email}
        </SoftTypography>
      </SoftBox>
    </SoftBox>
  );
}

function Function({ id }) {
  return (
    <SoftBox display="flex" flexDirection="column">
      <SoftTypography variant="caption" fontWeight="medium" color="text">
        {id}
      </SoftTypography>
    </SoftBox>
  );
}

const UserMgtData = {
  columns: [
    { name: "name", align: "left" },
    { name: "ID", align: "left" },
    { name: "Role", align: "left" },
    { name: "address", align: "left" },
    { name: "action", align: "center" },
  ],

  rows: [
    {
      id: 1,
      name: 'John Michael',
      email: 'example@gmail.com',
      role: 'admin',
      address: '1 Norway St, Boston, MA 02115, USA'
    },
    {
      id: 2,
      name: 'John Michael',
      email: 'example@gmail.com',
      role: 'admin',
      address: '1 Norway St, Boston, MA 02115, USA'
    },
    {
      id: 3,
      name: 'John Michael',
      email: 'example@gmail.com',
      role: 'admin',
      address: '1 Norway St, Boston, MA 02115, USA'
    },
    {
      id: 4,
      name: 'John Michael',
      email: 'example@gmail.com',
      role: 'admin',
      address: '1 Norway St, Boston, MA 02115, USA'
    },
   
  ],
};

function UserMangemntTable() {
  const { columns } = UserMgtData;
  const [data, setData] = useState(UserMgtData.rows);
  const [open, setOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'admin', address: '' });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser(prevState => ({ ...prevState, [name]: value }));
  };

  const handleAddUser = () => {
    const newUserData = { id: data.length + 1, ...newUser };
    setData(prevData => [...prevData, newUserData]);
    handleClose();
  };

  const rows = data.map((user) => ({
    name: <Author name={user.name} email={user.email} />,
    ID: <Function id={user.id} />,
    Role: (
      <SoftTypography variant="caption" color="secondary" fontWeight="medium">
        {user.role}
      </SoftTypography>
    ),
    address: (
      <SoftTypography variant="caption" color="secondary" fontWeight="medium" sx={{ textalign: "left !important" }}>
        {user.address}
      </SoftTypography>
    ),
    action: (
      <SoftBox>
        <Box sx={{ display: "flex", gap: "10px" }}>
          {/* <Box component={NavLink} to={'/projects/order-details'}>
            <SoftButton variant="outlined" color="info" size="small">
              <VisibilityIcon /> <span style={{ padding: "0 6px" }}>view</span>
            </SoftButton>
          </Box> */}
          <SoftButton variant="outlined" color="secondary" size="small">
            <EditIcon />
            <span style={{ padding: "0 6px" }}>Edit</span>
          </SoftButton>
        </Box>
      </SoftBox>
    ),
  }));

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox sx={{ display: "flex", gap: "10px", px: 2, py: 2 }}>
              <SoftButton variant="outlined" color="info" size="small" onClick={handleOpen}>
                Add user
              </SoftButton>
            </SoftBox>
            <SoftBox
              sx={{
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                      `${borderWidth[1]} solid ${borderColor}`,
                  },
                },
              }}
            >
              <Table columns={columns} rows={rows} />
            </SoftBox>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-title"
              aria-describedby="modal-description"
            >
              <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 600,
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
                borderRadius: '8px'
              }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <SoftTypography variant="h5" id="modal-title" mb={4}>Add New User</SoftTypography>
                  <CloseIcon onClick={handleClose} sx={{ cursor: 'pointer' }} />
                </Box>
                <SoftBox mb={2}>
                  <SoftBox mb={1} ml={0.5}>
                    <SoftTypography component="label">
                      Name
                    </SoftTypography>
                  </SoftBox>
                  <SoftInput
                    fullWidth
                    margin="normal"
                    placeholder="Name"
                    name="name"
                    value={newUser.name}
                    onChange={handleChange}
                  />
                </SoftBox>
                <SoftBox mb={2}>
                  <SoftBox mb={1} ml={0.5}>
                    <SoftTypography component="label">
                      Email
                    </SoftTypography>
                  </SoftBox>
                  <SoftInput
                    fullWidth
                    margin="normal"
                    placeholder="Email"
                    name="email"
                    value={newUser.email}
                    onChange={handleChange}
                  />
                </SoftBox>
                <SoftBox mb={2}>
                  <SoftBox mb={1} ml={0.5}>
                    <SoftTypography component="label">
                      Role
                    </SoftTypography>
                  </SoftBox>
                  <FormControl fullWidth variant="outlined">
            
                    <Select
                      name="role"
                      value={newUser.role}
                      onChange={handleChange}
                      label="Role"
                    >
                      <MenuItem value="admin">Admin</MenuItem>
                      <MenuItem value="user">User</MenuItem>
                      <MenuItem value="custumer">Customer</MenuItem>
                    </Select>
                    {/* <FormHelperText>Select the role of the user</FormHelperText> */}
                  </FormControl>
                </SoftBox>
                <SoftBox mb={2}>
                  <SoftBox mb={1} ml={0.5}>
                    <SoftTypography component="label">
                      Address
                    </SoftTypography>
                  </SoftBox>
                  <SoftInput
                    fullWidth
                    margin="normal"
                    placeholder="Address"
                    name="address"
                    value={newUser.address}
                    onChange={handleChange}
                  />
                </SoftBox>
                <Box sx={{ display: "flex", gap: "10px" }}>
                  <SoftButton variant="outlined" color="info"size="small" onClick={handleAddUser} sx={{ mt: 2 }}>
                    Add User
                  </SoftButton>
                  <SoftButton variant="outlined" color="info" size="small" onClick={handleClose} sx={{ mt: 2 }}>
                    Cancel
                  </SoftButton>
                </Box>
              </Box>
            </Modal>
          </Card>
        </SoftBox>
      </SoftBox>
    </DashboardLayout>
  );
}

export default UserMangemntTable;



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
// import Card from "@mui/material/Card";
// import { useState } from "react";


// // Soft UI Dashboard React examples
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Footer from "examples/Footer";
// import Table from "examples/Tables/Table";

// //icons
// import CloseIcon from '@mui/icons-material/Close';
// /* eslint-disable react/prop-types */
// // Soft UI Dashboard React components
// import SoftBox from "components/SoftBox";
// import SoftTypography from "components/SoftTypography";
// import SoftAvatar from "components/SoftAvatar";
// import SoftBadge from "components/SoftBadge";
// import { TableBody, TableCell, TableContainer, TableRow, Paper, Modal, MenuItem, Button, Select, FormControl, InputLabel, FormHelperText } from '@mui/material';
// import SoftInput from "components/SoftInput";
// // Images
// import team2 from "assets/images/team-2.jpg";
// import team3 from "assets/images/team-3.jpg";
// import team4 from "assets/images/team-4.jpg";
// import Box from '@mui/material/Box';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import EditIcon from '@mui/icons-material/Edit';
// import { IconButton } from "@mui/material";

// import ViewIcon from 'examples/Icons/ViewIcon';
// import { NavLink } from "react-router-dom";
// import SoftButton from "components/SoftButton";


// function Author({ image, name, email }) {
//     return (
//         <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
//             {/* <SoftBox mr={2}>
//                 <SoftAvatar src={image} alt={name} size="sm" variant="rounded" />
//             </SoftBox> */}
//             <SoftBox display="flex" flexDirection="column">
//                 <SoftTypography variant="button" fontWeight="medium">
//                     {name}
//                 </SoftTypography>
//                 <SoftTypography variant="caption" color="secondary">
//                     {email}
//                 </SoftTypography>
//             </SoftBox>
//         </SoftBox>
//     );
// }

// function Function({ id, org }) {
//     return (
//         <SoftBox display="flex" flexDirection="column">
//             <SoftTypography variant="caption" fontWeight="medium" color="text">
//                 {id}
//             </SoftTypography>
//             {/* <SoftTypography variant="caption" color="secondary">
//         {org}
//       </SoftTypography> */}
//         </SoftBox>
//     );
// }

// // Data

// const UserMgtData = {
//     columns: [
//         { name: "name", align: "left" },
//         { name: "ID", align: "left" },
//         { name: "Role", align: "left" },
//         // { name: "status", align: "center" },
//         { name: "address", align: "right" },
//         { name: "action", align: "center" },
//     ],

//     rows: [
//         {
//             name: <Author image={team2} name="John Michael" email="example@gmail.com" />,
//             ID: <Function id="#001" org="Organization" />,
//             Role: <SoftTypography variant="caption" color="secondary" fontWeight="medium">
//                 admin
//             </SoftTypography>
//             // status: (
//             //     <SoftBadge variant="gradient" badgeContent="completed" color="success" size="xs" container />
//             // )
//             ,
//             address: (
//                 <SoftTypography variant="caption" color="secondary" fontWeight="medium" sx={{ textalign: "left !important" }}>

//                     1 Norway St, Boston, MA 02115, USA
//                 </SoftTypography>
//             ),
//             action: (
//                 <SoftBox>

//                     <Box sx={{ display: "flex", gap: "10px" }}>
//                         <Box component={NavLink} to={'/projects/order-details'}>
//                             <SoftButton variant="outlined" color="info" size="small">
//                                 <VisibilityIcon /> <span style={{ padding: "0 6px" }}>view</span></SoftButton>
//                         </Box>
//                         <SoftButton variant="outlined" color="secondary" size="small">
//                             <EditIcon />
//                             <span style={{ padding: "0 6px" }}>Edit</span>
//                         </SoftButton>
//                     </Box>


//                 </SoftBox>

//             ),
//         },



//     ],
// };






// function UserMangemntTable() {
//     const { columns, rows } = UserMgtData;

//     const [data, setData] = useState();
//     const [open, setOpen] = useState(false);
//     const [newUser, setNewUser] = useState({ name: '', email: '', role: 'admin', address: '' });

//     const handleOpen = () => setOpen(true);
//     const handleClose = () => setOpen(false);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setNewUser(prevState => ({ ...prevState, [name]: value }));
//     };

//     const handleAddUser = () => {
//         const newUserData = { id: data.length + 1, ...newUser };
//         setData(prevData => [...prevData, newUserData]);
//         handleClose();
//     }

//     return (
//         <DashboardLayout>
//             <DashboardNavbar />
//             <SoftBox py={3}>

//                 <SoftBox mb={3}>
//                     <Card>
//                         <SoftBox sx={{ display: "flex", gap: "10px", px: 2, py: 1 }} >


//                             <SoftButton variant="outlined" color="info" size="small" onClick={handleOpen}

//                             >

//                                 Add user
//                             </SoftButton>
//                         </SoftBox>
//                         {/* <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
//                             <SoftTypography variant="h6">Projects Data</SoftTypography>
//                         </SoftBox> */}

//                         <SoftBox
//                             sx={{
//                                 "& .MuiTableRow-root:not(:last-child)": {
//                                     "& td": {
//                                         borderBottom: ({ borders: { borderWidth, borderColor } }) =>
//                                             `${borderWidth[1]} solid ${borderColor}`,
//                                     },
//                                 },
//                             }}
//                         >
//                             <Table columns={columns} rows={rows} />
//                         </SoftBox>

//                         <Modal
//                             open={open}
//                             onClose={handleClose}
//                             aria-labelledby="modal-title"
//                             aria-describedby="modal-description"
//                         >
//                             <Box sx={{
//                                 position: 'absolute',
//                                 top: '50%',
//                                 left: '50%',
//                                 transform: 'translate(-50%, -50%)',
//                                 width: 600,
//                                 bgcolor: 'background.paper',
//                                 boxShadow: 24,
//                                 p: 4,
//                                 borderRadius: '8px'
//                             }}>
//                                 <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//                                     <SoftTypography variant="h5" id="modal-title" mb={4}>Add New User</SoftTypography>
//                                     <CloseIcon onClick={handleClose} sx={{ cursor: 'pointer' }} />
//                                 </Box>
//                                 <SoftBox mb={2}>
//                                     <SoftBox mb={1} ml={0.5}>
//                                         <SoftTypography component="label">
//                                             Name
//                                         </SoftTypography>
//                                     </SoftBox>
//                                     <SoftInput
//                                         fullWidth
//                                         margin="normal"
//                                         placeholder="Name"
//                                         name="name"
//                                         value={newUser.name}
//                                         onChange={handleChange}
//                                     />
//                                 </SoftBox>
//                                 <SoftBox mb={2}>
//                                     <SoftBox mb={1} ml={0.5}>
//                                         <SoftTypography component="label"  >
//                                             Email
//                                         </SoftTypography>
//                                     </SoftBox>
//                                     <SoftInput
//                                         fullWidth
//                                         margin="normal"
//                                         placeholder="Email"
//                                         name="email"
//                                         value={newUser.email}
//                                         onChange={handleChange}
//                                     />
//                                 </SoftBox>
//                                 <SoftBox mb={2}>
//                                     <SoftBox mb={1} ml={0.5}>
//                                         <SoftTypography component="label">
//                                             Role
//                                         </SoftTypography>
//                                     </SoftBox>

//                                     <Select
//                                         fullWidth
//                                         margin="normal"
//                                         placeholder="Role"
//                                         name="role"
//                                         value={newUser.role}
//                                         onChange={handleChange}
//                                         select
//                                         MenuProps={{ PaperProps: { sx: { mb: 6 } } }}
//                                     >
//                                         <MenuItem mb={1} value="admin">Admin</MenuItem>
//                                         <MenuItem mb={1} value="user">User</MenuItem>
//                                         <MenuItem mb={1} value="vendor">custumer</MenuItem>
//                                     </Select>
//                                 </SoftBox>
//                                 <SoftBox mb={2}>
//                                     <SoftBox mb={1} ml={0.5}>
//                                         <SoftTypography component="label">
//                                             Address
//                                         </SoftTypography>
//                                     </SoftBox>
//                                     <SoftInput
//                                         fullWidth
//                                         margin="normal"
//                                         placeholder="Address"
//                                         name="address"
//                                         value={newUser.address}
//                                         onChange={handleChange}
//                                     />
//                                 </SoftBox>
//                                 <Box sx={{ display: "flex", gap: "10px" }}>
//                                     <Button variant="contained" color="primary" onClick={handleAddUser} sx={{ mt: 2 }}>
//                                         Add User
//                                     </Button>
//                                     <Button variant="contained" fontWeight={"bold"} onClick={handleClose} sx={{ mt: 2 }}>
//                                         Cancel
//                                     </Button>
//                                 </Box>
//                             </Box>
//                         </Modal>
//                     </Card>
//                 </SoftBox>

//             </SoftBox>
//             {/* <Footer /> */}
//         </DashboardLayout>
//     );
// }

// export default UserMangemntTable;

