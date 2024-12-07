import { Navigate, Outlet } from "react-router";
import { useAdminAuthStore } from "../../stores/adminAuthStore";

const AdminRouteWrapper = () => {
  const { isAdminAuthenticated } = useAdminAuthStore();
  return isAdminAuthenticated ? <Outlet /> : <Navigate to="/admin/signin" />;
};

export default AdminRouteWrapper;
