import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";

const UnprotectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [redirectPath, setRedirectPath] = useState(null);

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    const storedUser = localStorage.getItem("user");

    if (userToken && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser.status === "Student") {
          setRedirectPath("/student/");
        } else if (parsedUser.status === "Employee") {
          setRedirectPath("/employee/dashboard/");
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, [user]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );

  if (redirectPath) {
    return <Navigate to={redirectPath} />;
  }

  return children;
};

export default UnprotectedRoute;
