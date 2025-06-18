import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { FaUser, FaInfoCircle, FaBars } from "react-icons/fa";
import { useAuthStore } from "../stores/authStore";
import DarkLogo from "../assets/darkLogo.svg";
import LightLogo from "../assets/lightLogo.svg";
import { useProfileQuery } from "../api/queries/userQueries";

const Header = () => {
  const { isAuthenticated } = useAuthStore();
  // const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data } = useProfileQuery();

  // const handleSearchClick = () => {
  //   setIsSearchOpen(!isSearchOpen);
  // };

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className="bg-white dark:bg-gray-800 shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="mr-5">
            <Link to="/home" className="flex items-center">
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
          {/* <motion.div
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
          </motion.div> */}

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

              {isAuthenticated ? (
                <Link
                  to="/profile"
                  className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-500"
                >
                  {data?.user.profileImage == null ? (
                    <div className="flex">
                      <FaUser size={24} className="mr-2 md:mr-4 md:text-2xl" />
                      <span className="hidden md:inline">Profile</span>
                    </div>
                  ) : (
                    <img
                      src={data?.user.profileImage || ""}
                      alt="Profile"
                      className="w-8 h-8 md:w-12 md:h-12 rounded-full object-cover border-2 border-blue-500 dark:border-gray-300"
                    />
                  )}
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
                <FaInfoCircle size={28} className="mr-2" />
                <span>About</span>
              </Link>

              {isAuthenticated ? (
                <Link
                  to="/profile"
                  className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-500"
                >
                  {data?.user.profileImage == null ? (
                    <div className="flex">
                      <FaUser size={24} className="mr-2 md:mr-4 md:text-2xl" />
                      <span className="hidden md:inline">Profile</span>
                    </div>
                  ) : (
                    <div className="flex">
                      <img
                        src={data?.user.profileImage || ""}
                        alt="Profile"
                        className="w-8 h-8 md:w-12 md:h-12 rounded-full object-cover border-2 border-blue-500 dark:border-gray-300"
                      />
                      <span className="ml-2 md:inline">Profile</span>
                    </div>
                  )}
                </Link>
              ) : (
                <Link
                  to="/signin"
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
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <Outlet />
      </div>
    </>
  );
};

export default Header;
