import React, { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router";
import { useAdminAuthStore } from "../../stores/adminAuthStore";

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const adminAuth = useAdminAuthStore();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    if (!username || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const response = await axios.post("/api/admin/login", {
        username,
        password,
      });
      adminAuth.adminLogin(response.data.adminToken);
      navigate("/admin/dashboard");
      toast.success("Logged in successfully");
    } catch (error) {
      console.error("Error logging in", error);
      toast.error("Error logging in");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
          Admin Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 dark:text-gray-300"
            >
              Username:
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 dark:text-gray-300"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300 dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            Log In
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
