import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaTachometerAlt,
  FaUsers,
  FaStar,
  FaBox,
  FaUserShield,
} from "react-icons/fa";

const AdminSidebar = () => {
  const navLinks = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <FaTachometerAlt /> },
    { name: "Users", path: "/admin/users", icon: <FaUsers /> },
    { name: "Reviews", path: "/admin/reviews", icon: <FaStar /> },
    { name: "Products", path: "/admin/products", icon: <FaBox /> },
    { name: "Moderators", path: "/admin/moderators", icon: <FaUserShield /> },
  ];

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
      </ul>
    </nav>
  );
};

export default AdminSidebar;
