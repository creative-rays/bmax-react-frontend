import axiosInstance from "./axiosInstance";

export const login = async (credentials) => {
  const response = await axiosInstance.post("/wp-json/bmaxapi/v1/connect", credentials);
  const { message, status, role } = response.data;

  if (status) {
    const decodeBase64 = atob(message).split(":");
    const id = decodeBase64[0];
    const fullName = decodeBase64[2];
    const user = { id, fullName };

    const jsonString = JSON.stringify(user);

    localStorage.setItem("user", jsonString);

    console.log("user:", user);

    localStorage.setItem("token", message);
    if (role === "administrator") {
      localStorage.setItem("role", "admin");
    } else {
      localStorage.setItem("role", role);
    }
  }

  // Store the token securely

  return response.data;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  // const response = await axiosInstance.post('/auth/logout');
  // return response.data;
};

// Add more auth-related API calls here
