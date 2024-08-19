import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../../api/authApi";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Switch from "@mui/material/Switch";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import curved9 from "assets/images/curved-images/curved-6.jpg";

function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const navigate = useNavigate();

  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const vendorPassword = process.env.REACT_APP_VENDOR_PASSWORD;
  console.log(vendorPassword);
  const handleSignIn = async (event) => {
    event.preventDefault();
    // const adminEmail = process.env.REACT_APP_ADMIN_EMAIL;
    // const adminPassword = process.env.REACT_APP_ADMIN_PASSWORD;
    // const vendorEmail = process.env.REACT_APP_VENDOR_EMAIL;
    // const vendorPassword = process.env.REACT_APP_VENDOR_PASSWORD;
    // console.log(vendorPassword);

    // console.log("credential admin:", adminEmail, email, adminPassword, password);
    console.log("credential admin:", email, password);
    const data = {
      action: "login",
      username: email,
      password: password,
    };

    try {
      const user = await login(data);
      console.log("Logged in user:", user);
      localStorage.setItem("role", "admin");
      navigate("/dashboard");
 
    } catch (err) {
      // setError(err.message);
      console.log("error in login:", err);
      alert("Invalid credentials. Please try again.");
    }

    // if (email === adminEmail && password === adminPassword) {
    // if (email === "admin@gmail.com" && password === "123") {
    //   localStorage.setItem("role", "admin");
    //   navigate("/dashboard");
    //   // } else if (email === vendorEmail && password === vendorPassword) {
    // } else if (email === "vendor@gmail.com" && password === "123") {
    //   localStorage.setItem("role", "vendor");
    //   navigate("/profile");
    // } else {
    //   alert("Invalid credentials. Please try again.");
    // }
  };

  return (
    <CoverLayout
      title="Welcome back"
      description="Enter your email and password to log in"
      image={curved9}
    >
      <SoftBox component="form" role="form" onSubmit={handleSignIn}>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Email
            </SoftTypography>
          </SoftBox>
          <SoftInput
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </SoftBox>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Password
            </SoftTypography>
          </SoftBox>
          <SoftInput
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </SoftBox>
        <SoftBox display="flex" alignItems="center">
          <Switch checked={rememberMe} onChange={handleSetRememberMe} />
          <SoftTypography
            variant="button"
            fontWeight="regular"
            onClick={handleSetRememberMe}
            sx={{ cursor: "pointer", userSelect: "none" }}
          >
            &nbsp;&nbsp;Remember me
          </SoftTypography>
        </SoftBox>
        <SoftBox mt={4} mb={1}>
          <SoftButton variant="gradient" color="info" fullWidth type="submit">
            Log In
          </SoftButton>
        </SoftBox>
        <SoftBox mt={3} textAlign="center">
          <SoftTypography variant="button" color="text" fontWeight="regular">
            Don&apos;t have an account?{" "}
            <SoftTypography
              component={Link}
              to="/authentication/sign-up"
              variant="button"
              color="info"
              fontWeight="medium"
              textGradient
            >
              Sign up
            </SoftTypography>
          </SoftTypography>
        </SoftBox>
      </SoftBox>
    </CoverLayout>
  );
}

export default LogIn;
