import React from "react";
import PropTypes from "prop-types";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SoftTypography from "components/SoftTypography";
import { Table, TableBody, TableCell, TableRow, Checkbox, FormControlLabel } from "@mui/material";
import SoftBox from "components/SoftBox";
import typography from "assets/theme/base/typography";
// const data = [
//   {
//     projectname: "Project1",
//     load: "1",
//     Arrival: "26/4/2024",
//     concrete: "6",
//     carType: "16 m track car",
//     concreteQuality: "Basement floor - B30 M60 - Dmax 16 - 50% - 240",
//     total: "244220.09",
//     orderNo: "#000YTHGH",
//     orderDetail: "It really matters and then like it really doesn’t matter. What matters is the people who are sparked by it. And the people who are like offended by it, it doesn’t matter.",
//     location: "Norwany Street 15",
//     mobile: "(44) 123 1234 123",
//     email: "example@gmail.com",
//   },
//   {
//     projectname: "Project2",
//     load: "2",
//     Arrival: "26/4/2024",
//     concrete: "8",
//     carType: "20 m track car",
//     concreteQuality: "Ground floor - B35 M70 - Dmax 20 - 60% - 300",
//     total: "358000.45",
//     orderNo: "#001HTHJK",
//     orderDetail: "Every project is an opportunity to learn, to figure out problems and challenges, to invent and reinvent.",
//     location: "Main Avenue 21",
//     mobile: "(44) 234 5678 890",
//     email: "contact@example.com",
//   },
//   {
//     projectname: "Project2",
//     load: "3",
//     Arrival: "26/4/2024",
//     concrete: "8",
//     carType: "20 m track car",
//     concreteQuality: "Ground floor - B35 M70 - Dmax 20 - 60% - 300",
//     total: "358000.45",
//     orderNo: "#001HTHJK",
//     orderDetail: "Every project is an opportunity to learn, to figure out problems and challenges, to invent and reinvent.",
//     location: "Main Avenue 21",
//     mobile: "(44) 234 5678 890",
//     email: "contact@example.com",
//   },
//   {
//     projectname: "Project2",
//     load: "4",
//     Arrival: "26/4/2024",
//     concrete: "8",
//     carType: "20 m track car",
//     concreteQuality: "Ground floor - B35 M70 - Dmax 20 - 60% - 300",
//     total: "358000.45",
//     orderNo: "#001HTHJK",
//     orderDetail: "Every project is an opportunity to learn, to figure out problems and challenges, to invent and reinvent.",
//     location: "Main Avenue 21",
//     mobile: "(44) 234 5678 890",
//     email: "contact@example.com",
//   },
// ];

// const data = [
//   {
//     projectname: "Project1",
//     load: "1",
//     date: "26/4/2024",
//     display_volume: "6",
//     vehicle_type: "16 m track car",
//     concrete_type: "Basement floor - B30 M60 - Dmax 16 - 50% - 240",
//     total_price: "244220.09",
//   },
// ];

const ProjectAccordion = ({ data }) => {
  console.log("projectAccordion;", data);
  return (
    <SoftBox mt={5}>
      <SoftTypography variant="h2" mb={2} px={1}>
        Delivery Details
      </SoftTypography>
      {data.map((item, index) => (
        <Accordion
          mb={2}
          key={index}
          sx={{
            borderRadius: "16px !important",
            "&::before": {
              content: "none",
            },
            mb: 2,
            py: 4,
            px: 1,
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${item?.projectname?.replace(/\s+/g, "")}-content`}
            // id={`${item.projectname.replace(/\s+/g, '')}-header`}
            sx={{ content: "none" }}
          >
            <SoftTypography variant="h6">Load # {index+1}</SoftTypography>
          </AccordionSummary>
          <AccordionDetails>
            <Table>
              <TableRow>
                <TableCell>
                  <SoftTypography
                    variant="subtitle"
                    fontSize=".7rem"
                    color="secondary"
                    fontWeight="bold"
                    textTransform={"uppercase"}
                  >
                    Arrival
                  </SoftTypography>
                </TableCell>
                <TableCell>
                  <SoftTypography
                    variant="subtitle"
                    fontSize=".7rem"
                    color="secondary"
                    fontWeight="bold"
                    textTransform={"uppercase"}
                  >
                    Concrete
                  </SoftTypography>
                </TableCell>
                <TableCell>
                  <SoftTypography
                    variant="subtitle"
                    fontSize=".7rem"
                    color="secondary"
                    fontWeight="bold"
                    textTransform={"uppercase"}
                  >
                    Car Type
                  </SoftTypography>
                </TableCell>
                <TableCell>
                  <SoftTypography
                    variant="subtitle"
                    fontSize=".7rem"
                    color="secondary"
                    fontWeight="bold"
                    textTransform={"uppercase"}
                  >
                    Concrete Quality
                  </SoftTypography>
                </TableCell>
                <TableCell>
                  <SoftTypography
                    variant="subtitle"
                    fontSize=".7rem"
                    color="secondary"
                    fontWeight="bold"
                    textTransform={"uppercase"}
                  >
                    {" "}
                    Total
                  </SoftTypography>
                </TableCell>
              </TableRow>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <SoftTypography
                      fontSize=".8rem"
                      variant="subtitle"
                      fontWeight="bold"
                      color="secondary"
                    >
                      {`${new Date(item?.date)?.toLocaleDateString()}`}
                    </SoftTypography>
                  </TableCell>
                  <TableCell>
                    <SoftTypography
                      fontSize=".8rem"
                      variant="subtitle"
                      fontWeight="bold"
                      color="secondary"
                    >
                      {item?.display_volume}
                    </SoftTypography>
                  </TableCell>
                  <TableCell>
                    <SoftTypography
                      fontSize=".8rem"
                      variant="subtitle"
                      fontWeight="bold"
                      color="secondary"
                    >
                      {item?.vehicle_type}
                    </SoftTypography>
                  </TableCell>
                  <TableCell>
                    <SoftTypography
                      fontSize=".8rem"
                      variant="subtitle"
                      fontWeight="bold"
                      color="secondary"
                    >
                      {item?.concrete_type}
                    </SoftTypography>
                  </TableCell>
                  <TableCell>
                    <SoftTypography
                      fontSize=".8rem"
                      variant="subtitle"
                      fontWeight="bold"
                      color="secondary"
                    >
                      {item?.total_price}
                    </SoftTypography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={5}>
                    <SoftTypography fontSize=".8rem" variant="subtitle" color="secondary">
                      Modeling Options
                    </SoftTypography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="castWithDrop"
                          checked={item?.decline === "checked" ? true : false}
                        />
                      }
                      label={
                        <SoftTypography
                          fontSize=".8rem"
                          variant="subtitle"
                          sx={{ color: "secondary.main" }}
                        >
                          Cast with drop
                        </SoftTypography>
                      }
                      sx={{ color: "secondary" }}
                    />
                  </TableCell>
                  <TableCell>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="addSteelFiber"
                          checked={item?.steel_fiber === "checked" ? true : false}
                        />
                      }
                      label={
                        <SoftTypography
                          fontSize=".8rem"
                          variant="subtitle"
                          sx={{ color: "secondary.main" }}
                        >
                          Add steel fiber
                        </SoftTypography>
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="delay"
                          checked={item?.retardation === "checked" ? true : false}
                        />
                      }
                      label={
                        <SoftTypography
                          fontSize=".8rem"
                          variant="subtitle"
                          sx={{ color: "secondary.main" }}
                        >
                          Delay
                        </SoftTypography>
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="accelerator"
                          checked={item?.accelerator === "checked" ? true : false}
                        />
                      }
                      label={
                        <SoftTypography
                          fontSize=".8rem"
                          variant="subtitle"
                          color="secondary"
                          sx={{ color: "secondary.main" }}
                        >
                          Accelerator
                        </SoftTypography>
                      }
                    />
                  </TableCell>
                </TableRow>
                <TableRow sx={{ border: "none !important" }}>
                  <TableCell colSpan={5}>
                    <SoftTypography fontSize=".8rem" variant="subtitle" color="secondary">
                      If Pump Mixer
                    </SoftTypography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="addPumpWaste"
                          checked={item?.pump_wash === "checked" ? true : false}
                        />
                      }
                      label={
                        <SoftTypography
                          fontSize=".8rem"
                          variant="subtitle"
                          color="secondary"
                          sx={{ color: "secondary.main" }}
                        >
                          Add Pump waste (0.5m³)
                        </SoftTypography>
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="washOnMixer"
                          checked={item?.extra_volume === "checked" ? true : false}
                        />
                      }
                      label={
                        <SoftTypography
                          fontSize=".8rem"
                          variant="subtitle"
                          color="secondary"
                          sx={{ color: "secondary.main" }}
                        >
                          Wash on mixer
                        </SoftTypography>
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="snakes"
                          checked={item?.add_hose === "checked" ? true : false}
                        />
                      }
                      label={
                        <SoftTypography
                          fontSize=".8rem"
                          variant="subtitle"
                          color="secondary"
                          sx={{ color: "secondary.main" }}
                        >
                          snakes
                        </SoftTypography>
                      }
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            {/* <SoftTypography variant="body2" mt={2} mb={1}><strong>Order No:</strong> {item.orderNo}</SoftTypography>
            {item.mobile && <SoftTypography mb={1} variant="body2"><strong>Mobile:</strong> {item.mobile}</SoftTypography>}
            {item.email && <SoftTypography mb={1} variant="body2"><strong>Email:</strong> {item.email}</SoftTypography>} */}
          </AccordionDetails>
        </Accordion>
      ))}
    </SoftBox>
  );
};

ProjectAccordion.propTypes = {
  data: PropTypes.array.isRequired,
};

export default ProjectAccordion;
