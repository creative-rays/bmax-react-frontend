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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Soft UI Dashboard React base styles
import colors from "assets/theme/base/colors";

function ViewIcon({ color, size }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 4.5C7.305 4.5 3.066 7.263 1.5 12C3.066 16.737 7.305 19.5 12 19.5C16.695 19.5 20.934 16.737 22.5 12C20.934 7.263 16.695 4.5 12 4.5ZM12 17.25C8.835 17.25 6.1875 14.6025 6.1875 11.4375C6.1875 8.2725 8.835 5.625 12 5.625C15.165 5.625 17.8125 8.2725 17.8125 11.4375C17.8125 14.6025 15.165 17.25 12 17.25ZM12 7.125C9.9675 7.125 8.25 8.8425 8.25 10.875C8.25 12.9075 9.9675 14.625 12 14.625C14.0325 14.625 15.75 12.9075 15.75 10.875C15.75 8.8425 14.0325 7.125 12 7.125ZM12 12.75C11.175 12.75 10.5 12.075 10.5 11.25C10.5 10.425 11.175 9.75 12 9.75C12.825 9.75 13.5 10.425 13.5 11.25C13.5 12.075 12.825 12.75 12 12.75Z"
        fill={colors[color] ? colors[color].main : colors.dark.main}
      />
    </svg>
  );
}

// Setting default values for the props of ViewIcon
ViewIcon.defaultProps = {
  color: "dark",
  size: "16px",
};

// Typechecking props for the ViewIcon
ViewIcon.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
    "light",
    "white",
  ]),
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default ViewIcon;
