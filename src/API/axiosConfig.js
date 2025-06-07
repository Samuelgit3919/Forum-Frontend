import axios from "axios";

const axiosConfig = axios.create({
  baseURL: "https://forum-backend-3-w0nb.onrender.com/api",
  // baseURL: "http://localhost:5500/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosConfig;
