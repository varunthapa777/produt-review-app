import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaSearch,
  FaUser,
  FaInfoCircle,
  FaPhone,
  FaBars,
  FaTimes,
  FaStar,
} from "react-icons/fa";
import { useAuthStore } from "../stores/authStore";
import DarkLogo from "../assets/DarkLogo.svg";
import LightLogo from "../assets/LightLogo.svg";

const Header = () => {
  const { isAuthenticated } = useAuthStore();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearchClick = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="mr-5">
          <Link to="/" className="flex items-center">
            <img
              src={LightLogo}
              alt="Logo"
              className="h-8 md:h-12 dark:hidden"
            />
            <img
              src={DarkLogo}
              alt="Logo"
              className="h-8 md:h-12 hidden dark:block"
            />
          </Link>
        </div>
        <motion.div
          className={`relative w-full ${
            isSearchOpen ? "max-w-2xl" : "max-w-xs"
          } md:max-w-lg lg:max-w-2xl`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <input
            type="text"
            placeholder="Search for products, brands and more"
            className={`w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white ${
              isSearchOpen ? "block" : "hidden"
            } md:block`}
          />

          {isSearchOpen ? (
            <FaTimes
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300 cursor-pointer"
              onClick={handleSearchClick}
            />
          ) : (
            <FaSearch
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300 cursor-pointer"
              onClick={handleSearchClick}
            />
          )}
        </motion.div>

        <div className="flex items-center space-x-4">
          <div className="md:hidden ml-5">
            <FaBars
              size={24}
              className="text-gray-700 dark:text-gray-300 cursor-pointer"
              onClick={handleMenuClick}
            />
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/about"
              className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-500"
            >
              <FaInfoCircle size={24} className="mr-2 md:mr-4 md:text-2xl" />
              <span className="hidden md:inline">About</span>
            </Link>
            <Link
              to="/contact"
              className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-500"
            >
              <FaPhone size={24} className="mr-2 md:mr-4 md:text-2xl" />
              <span className="hidden md:inline">Contact</span>
            </Link>
            <Link
              to="/bag"
              className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-500"
            >
              <FaStar size={24} className="mr-2 md:mr-4 md:text-2xl" />
              <span className="hidden md:inline">Favourite</span>
            </Link>
            {isAuthenticated ? (
              <Link
                to="/profile"
                className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-500"
              >
                <FaUser size={24} className="mr-2 md:mr-4 md:text-2xl" />
                <span className="hidden md:inline">Profile</span>
              </Link>
            ) : (
              <Link
                to="/signin"
                className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-500"
              >
                <FaUser size={24} className="mr-2 md:mr-4 md:text-2xl" />
                <span className="hidden md:inline">Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 shadow-md">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link
              to="/about"
              className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-500"
            >
              <FaInfoCircle size={24} className="mr-2" />
              <span>About</span>
            </Link>
            <Link
              to="/contact"
              className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-500"
            >
              <FaPhone size={24} className="mr-2" />
              <span>Contact</span>
            </Link>
            <Link
              to="/bag"
              className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-500"
            >
              <FaStar size={24} className="mr-2" />
              <span>Favourite</span>
            </Link>
            {isAuthenticated ? (
              <Link
                to="/profile"
                className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-500"
              >
                <FaUser size={24} className="mr-2" />
                <span>Profile</span>
              </Link>
            ) : (
              <Link
                to="/login"
                className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-500"
              >
                <FaUser size={24} className="mr-2" />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
