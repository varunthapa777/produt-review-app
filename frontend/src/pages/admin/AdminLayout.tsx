import { Outlet } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar";
import { motion } from "framer-motion";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <motion.div
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="w-20 md:w-64 bg-white dark:bg-gray-800 shadow-lg"
      >
        <AdminSidebar />
      </motion.div>
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
