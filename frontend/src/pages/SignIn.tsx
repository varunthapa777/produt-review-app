import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import lightLogo from "../assets/lightLogo.svg";
import darkLogo from "../assets/darkLogo.svg";
import { motion } from "framer-motion";
import { useState } from "react";
import TextInput from "../components/ui/TextInput";
import { FaUser } from "react-icons/fa";
import PasswordInput from "../components/ui/PasswordInput";
import toast from "react-hot-toast";
import { useColorSchemeStore } from "../stores/colorSchemeStore";
import { useAuthStore } from "../stores/authStore";

interface AxiosErrorResponse {
  error: string;
  errors: { msg: string }[];
}

const SignInPage = () => {
  const auth = useAuthStore();
  const navigate = useNavigate();
  const { isDarkMode } = useColorSchemeStore();
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isEmail = (value: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value);
    };
    let payload = {};
    if (isEmail(usernameOrEmail)) {
      payload = { email: usernameOrEmail, password };
    } else {
      payload = { username: usernameOrEmail, password };
    }

    try {
      const response = await axios.post("/api/users/login", payload);

      toast.success("Sign in successful");
      localStorage.setItem("token", response.data.token);
      auth.setAuthenticated(true);
      navigate("/profile");
      // Handle successful login, e.g., redirect to dashboard
    } catch (error) {
      if (axios.isAxiosError<AxiosErrorResponse>(error)) {
        if (error.response?.status === 401) {
          toast.error(error.response?.data.error);
        } else if (error.response?.status === 400) {
          error.response?.data.errors.forEach((error) => {
            toast.error(error.msg);
          }, []);
        }
        console.error("Sign in failed:", error);
        // Handle login failure, e.g., show error message
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
      <motion.div
        className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md dark:bg-gray-800"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-center">
          {/* Logo */}
          <img
            src={isDarkMode ? darkLogo : lightLogo}
            alt="App Logo"
            className="w-48 h-24"
          />
        </div>
        <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-white">
          Sign In to Your Account
        </h2>
        <form className="mt-8 space-y-4" onSubmit={handleOnSubmit}>
          {/* Username or Email */}
          <div>
            <label
              htmlFor="username-or-email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Username or Email
            </label>
            <TextInput
              type="text"
              id="username-or-email"
              prefixIcon={FaUser}
              placeholder="Username or Email"
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
              required
            />
          </div>
          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <PasswordInput
              id="password"
              placeholder="Password"
              value={password}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {/* Forgot Password Link */}
            <div className="mt-2 text-right">
              <Link
                to="/reset-password"
                className="text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400"
              >
                Forgot Password?
              </Link>
            </div>
          </div>
          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-indigo-400"
            >
              Sign In
            </button>
          </div>
        </form>
        {/* Sign Up Link */}
        <p className="text-sm text-center text-gray-700 dark:text-gray-300">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
          >
            Sign Up
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default SignInPage;
