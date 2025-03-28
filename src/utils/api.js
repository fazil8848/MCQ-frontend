import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { clearAuthData, getToken } from "./localStorage";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const url = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: url,
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
