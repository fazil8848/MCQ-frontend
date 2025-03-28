import { createContext, useState, useEffect } from "react";
import { getUser, getToken } from "../utils/localStorage";
import { getProfile } from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initAuth = async () => {
      const storedUser = getUser();
      const token = getToken();

      if (token && storedUser) {
        setUser(storedUser);
        try {
          const profile = await getProfile();
          setUser(profile);
        } catch (error) {
          console.error("Failed to validate token:", err);
          setUser(null);
          setError("Session expired. Please login again.");
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const updateuser = (updateUser) => {
    setUser(userData);
  };

  const clearUser = () => {
    setUser(null);
  };

  const value = {
    user,
    loading,
    error,
    updateuser,
    clearUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
