import axiosInstance from "./axiosInstance";

export const login = async (credentials) => {
  const response = await axiosInstance.post("/wp-json/bmaxapi/v1/connect", credentials);
  const { message, status } = response.data;

  if (status) {
    localStorage.setItem("token", message);
  }

  // Store the token securely

  return response.data;
};

export const logout = async () => {
  localStorage.removeItem("token");
  // const response = await axiosInstance.post('/auth/logout');
  // return response.data;
};

// Add more auth-related API calls here
