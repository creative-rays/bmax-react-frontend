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
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";

// Data
import ProTableData from "./ProTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";

import { getOrders } from "api/apiService";
import { useEffect, useState } from "react";

function ProTablesMain() {
  const [orderData, setOrderData] = useState({});

  const showTable = async () => {
    const data = await getOrders({ limit: 5, page_number: 1 });

    if (data.status) {
      const { columns, rows } = ProTableData(data.data);
      setOrderData({ columns, rows });

      // console.log("set data", orderData, data.data);
    }

    console.log("data order fetch: ", data);
  };

  useEffect(() => {
    showTable();
  }, []);

  // const { columns, rows } = ProTableData(orderData);

  const { columns: prCols, rows: prRows } = projectsTableData;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">Projects Data</SoftTypography>
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
              <Table columns={orderData.columns} rows={orderData.rows} />
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default ProTablesMain;
