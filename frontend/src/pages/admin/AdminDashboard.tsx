import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAdminAuthStore } from "../../stores/adminAuthStore";
import toast from "react-hot-toast";

const AdminDashboard = () => {
  const { adminLogout } = useAdminAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get("/api/admin/logout");
      adminLogout();
      navigate("/admin/login");
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Error logging out");
      console.error("Error logging out", error);
    }
  };

  return (
    <div>
      <h1 className="dark:text-white">Admin Dashboard</h1>
      <button
        onClick={handleLogout}
        className="mt-4 p-2 bg-red-500 text-white rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default AdminDashboard;
