import api from "../utils/api";
import { setToken, setUser, clearAuthData } from "../utils/localStorage";

export const register = async (userData) => {
  try {
    const response = await api.post("/auth/register", userData);
    if (response.data.token) {
      setToken(response.data.token);
      setUser({
        _id: response.data._id,
        fullName: response.data.fullName,
        email: response.data.email,
        mobileNumber: response.data.mobileNumber,
        status: response.data.status,
      });
    }

    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Registration failed";
  }
};

export const login = async (credentials) => {
  try {
    const response = await api.post("/auth/login", credentials);

    if (response.data.token) {
      setToken(response.data.token);
      setUser({
        _id: response.data._id,
        fullName: response.data.fullName,
        email: response.data.email,
        mobileNumber: response.data.mobileNumber,
        status: response.data.status,
      });
    }
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Login failed";
  }
};

export const logout = () => {
  clearAuthData();
};

export const getProfile = async () => {
  try {
    const response = await api.get("/auth/profile");
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to get profile";
  }
};
