import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated } = useAuthStore();

  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" />;
};

export default ProtectedRoute;
