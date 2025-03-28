import React from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoutes";
import Layout from "../components/Layout/Layout";
import TestPage from "../pages/Student/TestPage";
import ResultsPage from "../pages/Student/ResultsPage";
import NotFoundPage from "../pages/Common/NotFoundPage";

const StudentRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <ProtectedRoute>
              <TestPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="results"
          element={
            <ProtectedRoute>
              <ResultsPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default StudentRouter;
