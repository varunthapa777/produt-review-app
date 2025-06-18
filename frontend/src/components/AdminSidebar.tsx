import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaTachometerAlt,
  FaUsers,
  FaStar,
  FaBox,
  // FaUserShield,
} from "react-icons/fa";
import { useAdminAuthStore } from "../stores/adminAuthStore";
import axios from "axios";
import toast from "react-hot-toast";
import { AiOutlineLogout } from "react-icons/ai";

const AdminSidebar = () => {
  const navLinks = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <FaTachometerAlt /> },
    { name: "Users", path: "/admin/users", icon: <FaUsers /> },
    { name: "Reviews", path: "/admin/reviews", icon: <FaStar /> },
    { name: "Products", path: "/admin/products", icon: <FaBox /> },
    // { name: "Moderators", path: "/admin/moderators", icon: <FaUserShield /> },
  ];
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
    <nav className="p-4">
      <ul className="space-y-4">
        {navLinks.map((link) => (
          <motion.li
            key={link.name}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                `flex items-center justify-center md:justify-start px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 ${
                  isActive ? "bg-gray-300 dark:bg-gray-600" : ""
                }`
              }
            >
              <span className="mr-0 md:mr-2">{link.icon}</span>
              <span className="hidden md:inline">{link.name}</span>
            </NavLink>
          </motion.li>
        ))}
        <motion.li
          key={"Logout"}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div
            onClick={handleLogout}
            className={`flex items-center justify-center md:justify-start px-4 py-2 rounded-lg text-red-700 dark:text-red-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-red-500 dark:hover:text-red-400 cursor-pointer`}
          >
            <span className="mr-0 md:mr-2">{<AiOutlineLogout />}</span>
            <span className="hidden md:inline">{"Logout"}</span>
          </div>
        </motion.li>
      </ul>
    </nav>
  );
};

export default AdminSidebar;
