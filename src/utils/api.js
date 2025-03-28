import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { clearAuthData, getToken } from "./localStorage";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to attach Bearer token
api.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const useAxiosInterceptor = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response) {
          const { status, data } = error.response;

          if (status === 401) {
            const token = getToken();

            if (token) {
              toast.error(
                data.message || "Session expired! Please log in again."
              );
              clearAuthData();
              setTimeout(() => navigate("/login"), 2000);
            }
          } else if (status === 403) {
            toast.error("You are not authorized to access this resource.");
          } else if (status >= 500) {
            toast.error("Server error. Please try again later.");
          } else {
            toast.error(data?.message || "Something went wrong.");
          }
        } else {
          toast.error("Network error. Please check your connection.");
        }

        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(interceptor);
    };
  }, [navigate]);
};

export default api;
