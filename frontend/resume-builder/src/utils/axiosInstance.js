import axios from "axios";
import { BASE_URL } from "./apiPaths";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Add a request interceptor to include the token in headers if available
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // handle common errors globally
    if (error.response) {
      if (error.response.status === 401) {
        // Handle unauthorized access, e.g., redirect to login
        console.error("Unauthorized access - redirecting to login");
        window.location.href = "/"; // Adjust the path as needed
      } else if (error.response.status === 500) {
        // Handle server errors
        console.error("Server error occurred");
      }
    } else if (error.code === 'ECONNABORTED') {
      // Handle timeout errors
      console.error("Request timed out");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;