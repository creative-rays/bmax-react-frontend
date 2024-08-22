import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';
import {logout} from "api/authApi"

const LogOut = () => {
  const navigate = useNavigate();


  
  useEffect(() => {
    
    logout()

    
    // Redirect to login page
    navigate("/authentication/log-in");
  }, [navigate]);

  return (
    <SoftBox display="flex" alignItems="center" justifyContent="center" height="100vh">
      <SoftTypography variant="h4" fontWeight="medium">
        Logging out...
      </SoftTypography>
    </SoftBox>
  );
}

export default LogOut;
