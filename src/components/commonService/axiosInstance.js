import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api", // یا "/api" در صورت وجود پروکسی Vite/Nginx
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accesstoken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("accesstoken");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default axiosInstance;
