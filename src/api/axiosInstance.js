import axios from "axios";
import { getTokenFromStorage } from "../utils/localStorage";

const axiosInstance = axios.create({
  baseURL: "https://swapit.codemelodies.com",
  headers: {
    "Content-Type": "application/json",
  },
});
// "X-Api-Key": "app",
// "X-Api-Sec": "app",

// Add a request interceptor to include the token in every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getTokenFromStorage(); // Get the token from local storage or context
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
