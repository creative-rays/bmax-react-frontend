import React from 'react';
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import Box from '@mui/material/Box';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import { useNavigate } from 'react-router-dom';
const ProjectsData = () => {
    let navigate = useNavigate()
    const data = [
        { orderId: 1, orderDate: "24/5/2024", order: "00003GGR9", status: "quality assurance", total: "NOK 14,204,361.05 (incl. NOK 2,840,872.21 VAT)", Vendor: "something" },
        { orderId: 2, orderDate: "25/5/2024", order: "00003GGR10", status: "in progress", total: "NOK 10,204,361.05 (incl. NOK 2,840,872.21 VAT)", Vendor: "something" },
        { orderId: 3, orderDate: "26/5/2024", order: "00003GGR11", status: "completed", total: "NOK 12,204,361.05 (incl. NOK 2,840,872.21 VAT)", Vendor: "something" },
        { orderId: 4, orderDate: "27/5/2024", order: "00003GGR12", status: "pending", total: "NOK 15,204,361.05 (incl. NOK 2,840,872.21 VAT)", Vendor: "something" },
        { orderId: 5, orderDate: "25/5/2024", order: "00003GGR10", status: "in progress", total: "NOK 10,204,361.05 (incl. NOK 2,840,872.21 VAT)", Vendor: "something" },
        { orderId: 6, orderDate: "26/5/2024", order: "00003GGR11", status: "completed", total: "NOK 12,204,361.05 (incl. NOK 2,840,872.21 VAT)", Vendor: "something" },
        { orderId: 7, orderDate: "27/5/2024", order: "00003GGR12", status: "pending", total: "NOK 15,204,361.05 (incl. NOK 2,840,872.21 VAT)", Vendor: "something" },
    ];

    const handleView = (id) => {
        console.log(`View order with id: ${id}`);
        // Implement view functionality here
        navigate("/projects/order-details")
    };

    const handleEdit = (id) => {
        console.log(`Edit order with id: ${id}`);
        // Implement edit functionality here
    };

    return (
        <DashboardLayout>
            <DashboardNavbar />

            <SoftBox
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    width: '100%',
                    margin: 'auto',
                    marginTop: '20px',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    overflowX: 'auto' // Ensures horizontal scroll if content overflows
                }}
            >
                <SoftTypography variant="h4" mb={2}>Projects Data</SoftTypography>
                <TableContainer component={Paper}>
                    <Table stickyHeader aria-label="projects table">

                        <TableRow>
                            <TableCell ><SoftTypography variant="subtitle" color="secondary" fontWeight="bold">Order</SoftTypography></TableCell>
                            <TableCell ><SoftTypography variant="subtitle" color="secondary" fontWeight="bold">vendor</SoftTypography></TableCell>
                            <TableCell ><SoftTypography variant="subtitle" color="secondary" fontWeight="bold">Order Date</SoftTypography></TableCell>
                            <TableCell ><SoftTypography variant="subtitle" color="secondary" fontWeight="bold">Status</SoftTypography></TableCell>
                            <TableCell sx={{ textAlign: "right" }}><SoftTypography variant="subtitle" color="secondary" fontWeight="bold">Total</SoftTypography></TableCell>
                            <TableCell ><SoftTypography variant="subtitle" color="secondary" fontWeight="bold">Action</SoftTypography></TableCell>
                        </TableRow>

                        <TableBody>
                            {data.map((order) => {
                                const totalLines = order.total.split('incl. ');
                                const totalLine1 = totalLines[0] + 'incl. NOK';
                                const totalLine2 = totalLines[1];

                                return <TableRow key={order.orderId}>
                                    <TableCell><SoftTypography variant="body2" color="secondary" >{order.order}</SoftTypography> </TableCell>
                                    <TableCell><SoftTypography variant="body2" color="secondary" textTransform={"capitalize"} >{order.Vendor}</SoftTypography> </TableCell>
                                    <TableCell><SoftTypography variant="body2" color="secondary" >{order.orderDate}</SoftTypography> </TableCell>

                                    <TableCell><SoftTypography variant="body2" color="secondary" textTransform={"capitalize"} >{order.status}</SoftTypography> </TableCell>

                                    <TableCell sx={{ textAlign: "right" }}><SoftTypography variant="body" color="secondary" >NOK 14,204,361.05 <small>(incl. NOK</small> <br /><small>{totalLine2.trim()}</small></SoftTypography> </TableCell>

                                    <TableCell>
                                        <Box sx={{ display: "flex", gap: "10px" }}>
                                            <IconButton color="info" size="small" onClick={() => handleView(order.orderId)}>
                                                <VisibilityIcon />

                                            </IconButton>
                                            <IconButton color="secondary" size="small" onClick={() => handleEdit(order.orderId)}>
                                                <EditIcon />
                                            </IconButton>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </SoftBox>
        </DashboardLayout>
    );
};

export default ProjectsData;
