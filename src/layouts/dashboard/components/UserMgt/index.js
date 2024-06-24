import React, { useState } from 'react';
import SoftBox from 'components/SoftBox';
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, Modal, MenuItem, Button, Select, FormControl, InputLabel, FormHelperText } from '@mui/material';
import SoftInput from 'components/SoftInput';
import SoftButton from 'components/SoftButton';
import Box from '@mui/material/Box';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import SoftTypography from 'components/SoftTypography';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Icon from "@mui/material/Icon";
import CloseIcon from '@mui/icons-material/Close';

const UserMgt = () => {
  const initialData = [
    { id: 1, name: 'user1', email: 'user1@gmail.com', role: "admin", address: '1 Norway St, Boston, MA 02115, USA' },
    { id: 2, name: 'user2', email: 'user2@gmail.com', role: "user", address: '1 Norway St, Boston, MA 02115, USA' },
    { id: 3, name: 'user3', email: 'user3@gmail.com', role: "custumer ", address: '1 Norway St, Boston, MA 02115, USA' },
    { id: 4, name: 'user4', email: 'user4@gmail.com', role: "admin", address: '1 Norway St, Boston, MA 02115, USA' },
    { id: 5, name: 'user5', email: 'user5@gmail.com', role: "admin", address: '1 Norway St, Boston, MA 02115, USA' },
  ];

  const [data, setData] = useState(initialData);
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

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox sx={{ display: "flex", gap: "10px" }} >    <SoftButton variant="outlined" color="info" size="small"    onClick={handleOpen}>
      Add user
     </SoftButton>

      </SoftBox>

      <SoftBox
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          margin: 'auto',
          marginTop: '20px',
          backgroundColor: 'white',
          borderRadius: '8px',
          overflowX: 'auto' // Ensures horizontal scroll if content overflows
        }}
      >
        <TableContainer component={Paper} sx={{ width: "100%" }}>
          <Table stickyHeader aria-label="users table">
            <TableRow>
              <TableCell>
                <SoftTypography variant="body2" fontWeight="bold">ID</SoftTypography>
              </TableCell>
              <TableCell>
                <SoftTypography variant="body2" fontWeight="bold">Name</SoftTypography>
              </TableCell>
              <TableCell>
                <SoftTypography variant="body2" fontWeight="bold">Email</SoftTypography>
              </TableCell>
              <TableCell>
                <SoftTypography variant="body2" fontWeight="bold">Role</SoftTypography>
              </TableCell>
              <TableCell>
                <SoftTypography variant="body2" fontWeight="bold">Address</SoftTypography>
              </TableCell>
              <TableCell>
                <SoftTypography variant="body2" fontWeight="bold">Action</SoftTypography>
              </TableCell>
            </TableRow>
            <TableBody>
              {data.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <SoftTypography variant="body2">{user.id}</SoftTypography>
                  </TableCell>
                  <TableCell>
                    <SoftTypography variant="body2">{user.name}</SoftTypography>
                  </TableCell>
                  <TableCell>
                    <SoftTypography variant="body2">{user.email}</SoftTypography>
                  </TableCell>
                  <TableCell>
                    <SoftTypography variant="body2">{user.role}</SoftTypography>
                  </TableCell>
                  <TableCell>
                    <SoftTypography variant="body2">{user.address}</SoftTypography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", gap: "10px" }}>
                      <SoftButton variant="text" color="dark">
                        <Icon>edit</Icon>&nbsp;edit
                      </SoftButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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
              <SoftTypography component="label"  >
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

            <Select
              fullWidth
              margin="normal"
              placeholder="Role"
              name="role"
              value={newUser.role}
              onChange={handleChange}
              select
              MenuProps={{ PaperProps: { sx: { mb: 6 } } }}
            >
              <MenuItem mb={1} value="admin">Admin</MenuItem>
              <MenuItem mb={1} value="user">User</MenuItem>
              <MenuItem mb={1} value="vendor">custumer</MenuItem>
            </Select>
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
            <Button variant="contained" color="primary" onClick={handleAddUser} sx={{ mt: 2 }}>
              Add User
            </Button>
            <Button variant="contained" fontWeight={"bold"} onClick={handleClose} sx={{ mt: 2 }}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </DashboardLayout>
  );
};

export default UserMgt;
