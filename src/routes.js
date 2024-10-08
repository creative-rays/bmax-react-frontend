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

/** 
  All of the routes for the Soft UI Dashboard React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Soft UI Dashboard React layouts
import Dashboard from "layouts/dashboard";
import CustomerDashboard from "layouts/customerDashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import Profile from "layouts/profile";
// import SignIn from "layouts/authentication/sign-in";

// Soft UI Dashboard React icons
import Shop from "examples/Icons/Shop";
import Office from "examples/Icons/Office";
import Settings from "examples/Icons/Settings";
import Document from "examples/Icons/Document";
import SpaceShip from "examples/Icons/SpaceShip";
import CustomerSupport from "examples/Icons/CustomerSupport";
import CreditCard from "examples/Icons/CreditCard";
import Cube from "examples/Icons/Cube";
import AdminProtectedRoute from "proctectedRoute/AdminPotectedRoute";
import LogIn from "layouts/authentication/sign-in";
import ProjectIcon from "examples/Icons/projectIcon";
import ProjectsData from "layouts/dashboard/components/ForProjects";
import OrderDetail from "layouts/dashboard/components/ForProjects/OrderDetails/OrderDetail";
import UserMgt from "layouts/dashboard/components/UserMgt";
import LogOut from "layouts/authentication/Logout/LogOut";
import ProtectedRoute from "proctectedRoute/ProtectedRoute";
import ProTablesMain from "layouts/dashboard/components/ProjectTable";
import UserMangemntTable from "layouts/dashboard/components/UserMgtData";
import SearchAddress from "components/SearchAddress";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <CustomerSupport size="12px" />,
    component: (
      <ProtectedRoute allowedRoles={["admin", "customer", "vendor"]} element={<Dashboard />} />
    ),
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Orders",
    key: "projects",
    route: "/projects",
    icon: <ProjectIcon size="12px" />,
    component: (
      <ProtectedRoute allowedRoles={["admin", "customer", "vendor"]} element={<ProTablesMain />} />
    ),
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "New Order",
    key: "New Order",
    route: "/search-address",
    icon: <CustomerSupport size="12px" />,
    component: <SearchAddress />,
    // component: <AdminProtectedRoute element={<UserMangemntTable />} />,
    noCollapse: true,
  },
  // {
  //   type: "collapse",
  //   name: "User Management",
  //   key: "user mangement",
  //   route: "/user-management",
  //   icon: <CustomerSupport size="12px" />,
  //   component:<AdminProtectedRoute element={<UserMgt/>} /> ,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "User Management table",
  //   key: "user mangement",
  //   route: "/user-management-table",
  //   icon: <CustomerSupport size="12px" />,
  //   component: <AdminProtectedRoute element={<UserMangemntTable />} />,
  //   noCollapse: true,
  // },
  // {
  //   type: "order details",
  //   name: "Order details",

  //   route: "/order-details",

  //   component: <OrderDetail/>,
  //   noCollapse: true,

  // },
  // {
  //   type: "collapse",
  //   name: "Tables",
  //   key: "tables",
  //   route: "/tables",
  //   icon: <Office size="12px" />,
  //   component: <Tables />,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",

  //   key: "billing",
  //   route: "/billing",
  //   icon: <CreditCard size="12px" />,
  //   component: <AdminProtectedRoute element={<Billing />} />,
  //   noCollapse: true,
  // },

  { type: "title", title: "Account Pages", key: "account-pages" },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    route: "/profile",
    icon: <CustomerSupport size="12px" />,
    component: (
      <ProtectedRoute element={<Profile />} allowedRoles={["admin", "vendor", "customer"]} />
    ),
    noCollapse: true,
  },

  // {
  //   type: "collapse",
  //   name: "Log In",
  //   key: "log-in",
  //   route: "/authentication/log-in",
  //   icon: <Document size="12px" />,
  //   component: <LogIn />,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "Sign Up",
  //   key: "sign-up",
  //   route: "/authentication/sign-up",
  //   icon: <SpaceShip size="12px" />,
  //   component: <SignUp />,
  //   noCollapse: true,
  // },
  {
    type: "collapse",
    name: "Log Out",
    key: "log-out",
    route: "/logout",
    icon: <Document size="12px" />,
    component: <LogOut />,
    noCollapse: true,
  },
];

export default routes;
