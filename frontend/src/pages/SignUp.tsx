import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChangeEvent, useState } from "react";
import { FaUser, FaEnvelope } from "react-icons/fa";
import PasswordInput from "../components/ui/PasswordInput";
import TextInput from "../components/ui/TextInput";
import toast from "react-hot-toast";

interface AxiosErrorResponse {
  error: string;
  errors: { msg: string }[];
}
const SignUpPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isEquals, setIsEquals] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { firstName, lastName, userName, email, password } = formData;

    try {
      await axios.post("/api/users/register", {
        fullName: {
          firstName,
          lastName,
        },
        username: userName,
        email,
        password,
      });
      toast.success("Sign up successful");
      navigate("/signin");
    } catch (error) {
      if (axios.isAxiosError<AxiosErrorResponse>(error)) {
        if (error.response?.status === 400) {
          const { errors } = error.response.data;
          errors.forEach((error) => {
            toast.error(error.msg);
          }, []);
        } else if (error.response?.status === 409) {
          toast.error(error.response.data.error);
        } else {
          toast.error("Internal server error");
        }
      } else {
        console.error("Error during registration", error);
      }
      return;
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });

    setIsEquals(formData.password === value);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
      <motion.div
        className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md dark:bg-gray-800"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-white">
          Create your account
        </h2>
        <form onSubmit={handleOnSubmit} className="mt-8 space-y-4">
          {/* Full Name */}
          <div className="flex gap-4">
            {/* First Name */}
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                First Name
              </label>
              <TextInput
                id="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                required
              />
            </div>
            {/* Last Name */}
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Last Name
              </label>
              <TextInput
                id="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
              />
            </div>
          </div>
          {/* Username */}
          <div>
            <label
              htmlFor="userName"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Username
            </label>
            <TextInput
              id="userName"
              type="text"
              value={formData.userName}
              onChange={handleChange}
              prefixIcon={FaUser}
              placeholder="Username"
              required
            />
          </div>
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email Address
            </label>
            <TextInput
              prefixIcon={FaEnvelope}
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
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
              value={formData.password}
              onChange={handleChange}
              className="focus:border-indigo-500 dark:border-gray-600"
              placeholder="Password"
              required
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
          </div>
          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Confirm Password
            </label>
            <PasswordInput
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              required
              className={`${
                isEquals
                  ? "focus:border-green-500 dark:border-gray-600"
                  : "focus:border-red-500"
              }`}
              showPassword={showConfirmPassword}
              setShowPassword={setShowConfirmPassword}
            />
          </div>
          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-indigo-400"
            >
              Sign Up
            </button>
          </div>
        </form>
        {/* Sign In Link */}
        <p className="text-sm text-center text-gray-700 dark:text-gray-300">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
          >
            Sign In
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default SignUpPage;
