import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [redirectPath, setRedirectPath] = useState(null);

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    const storedUser = localStorage.getItem("user");

    if (!userToken || !storedUser) {
      setRedirectPath("/login");
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser);
      const userRolePath =
        parsedUser.status === "Student" ? "/student" : "/employee";

      if (!location.pathname.startsWith(userRolePath)) {
        setRedirectPath(userRolePath);
      } else {
        setRedirectPath(null);
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
      setRedirectPath("/login");
    }
  }, [location.pathname]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );

  if (redirectPath) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
