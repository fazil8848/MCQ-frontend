import React from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoutes";
import Dashboard from "../pages/Employee/Dashboard";
import Layout from "../components/Layout/Layout";
import NotFoundPage from "../pages/Common/NotFoundPage";
const EmployeeRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default EmployeeRouter;
