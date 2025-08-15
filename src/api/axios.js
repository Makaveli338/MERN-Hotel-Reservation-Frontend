import axios from "axios";

// Use environment variable for base URL, fallback to localhost for dev
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
