import { Routes, Route } from "react-router-dom";
import StudentRouter from "./routes/StudentRouter";
import LoginPage from "./pages/Common/LoginPage";
import RegisterPage from "./pages/Common/RegisterPage";
import OnBoardingPage from "./pages/Common/OnBoardingPage";
import NotFoundPage from "./pages/Common/NotFoundPage";
import { useAxiosInterceptor } from "./utils/api";
import UnprotectedRoute from "./routes/UnprotectedRoute";
import EmployeeRouter from "./routes/EmployeeRouter";
import { ToastContainer } from "react-toastify";

function App() {
  useAxiosInterceptor();

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <UnprotectedRoute>
              <OnBoardingPage />
            </UnprotectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <UnprotectedRoute>
              <LoginPage />
            </UnprotectedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <UnprotectedRoute>
              <RegisterPage />
            </UnprotectedRoute>
          }
        />
        <Route path="/student/*" element={<StudentRouter />} />
        <Route path="/employee/*" element={<EmployeeRouter />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
