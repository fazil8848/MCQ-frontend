import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  login as loginService,
  register as registerService,
  logout as logoutService,
} from "../services/authService";

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const { user, loading, error, updateUser, clearUser } = context;

  const login = async (credentials) => {
    try {
      const data = await loginService(credentials);
      updateUser(data);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const data = await registerService(userData);
      updateUser(data);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    logoutService();
    clearUser();
  };

  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };
};
