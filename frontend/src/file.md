- ### pages/admin

  - AdminDashboard.tsx

```javascript
import { useDashboardData } from "../../api/queries/adminQueries";
import DashboardChart from "../../components/DashboardChart";
import Loading from "../../components/Loading";

const AdminDashboard = () => {
  const { data, isLoading, error } = useDashboardData();

  if (isLoading) return <Loading />;
  if (error)
    return <div className="text-center text-red-500">Error fetching data</div>;
  return (
    <div className="p-8 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
        Admin Dashboard
      </h1>
      {data && <DashboardChart data={data} />}
    </div>
  );
};

export default AdminDashboard;
```

- AdminLayout.tsx

```javascript
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
```

- AdminLogin.tsx

```javascript
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
```

- AdminRouteWrapper.tsx

```javascript
import { Navigate, Outlet } from "react-router";
import { useAdminAuthStore } from "../../stores/adminAuthStore";

const AdminRouteWrapper = () => {
  const { isAdminAuthenticated } = useAdminAuthStore();
  return isAdminAuthenticated ? <Outlet /> : <Navigate to="/admin/signin" />;
};

export default AdminRouteWrapper;
```

- AuditReview.tsx

```javascript
import { useState } from "react";
import { motion } from "framer-motion";
import { Product, useReviewsByStatus } from "../../api/queries/adminQueries";
import { useUpdateReviewStatus } from "../../api/mutations/reviewMutaions";
import { useQueryClient } from "@tanstack/react-query";
import RatingStars from "../../components/ui/RatingStars";
import Loading from "../../components/Loading";
import axios from "axios";
import toast from "react-hot-toast";

const AuditReviewsPage = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const { data, error, isLoading } = useReviewsByStatus();
  const updateReviewStatus = useUpdateReviewStatus();
  const queryClient = useQueryClient();

  const handleChange = (index: number) => {
    setSelectedTab(index);
  };

  if (isLoading) return <Loading />;
  if (error) return <div>Error loading data</div>;

  const handleApprove = (reviewId: string, productId: string) => {
    updateReviewStatus.mutate(
      {
        reviewId,
        status: "approved",
        productId,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["audit_reviews"],
            exact: true,
          });
        },
      }
    );
  };

  const handleReject = (reviewId: string, productId: string) => {
    updateReviewStatus.mutate(
      {
        reviewId,
        status: "rejected",
        productId,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["audit_reviews"],
            exact: true,
          });
        },
      }
    );
  };

  const handleDelete = async (reviewId: string) => {
    try {
      await axios.delete(`/api/admin/reviews/${reviewId}`);
      toast.success("Review deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["audit_reviews"],
        exact: true,
      });
    } catch (error) {
      toast.error("Failed to delete review");
      console.log(error);
    }
  };

  const renderReviews = (products: Product[]) => {
    return products.map((product) => (
      <div key={product._id.productId} className="mb-4">
        <h2 className="text-xl font-semibold dark:text-gray-200">
          {product.productName}
        </h2>
        <div className="flex justify-center my-2 bg-gray-100 p-10 max-w-fit rounded-lg m-auto">
          <img
            src={product.productImage}
            alt={product.productName}
            className="w-32 h-32 object-contain"
          />
        </div>
        <p className="text-gray-500 mb-2 dark:text-gray-400">
          Price: ₹{product.productPrice}
        </p>
        {product.reviews.map((review) => (
          <motion.div
            key={review.reviewId}
            className="p-2 border rounded mb-2 dark:border-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h5 className="dark:text-gray-300 text-2xl font-bold">
              {review.userName}
            </h5>
            <p className="dark:text-gray-300">{review.comment}</p>
            <p className="dark:text-gray-300 flex items-center space-x-4">
              <span>Rating: </span>
              <span className="flex">
                <RatingStars rating={review.rating} />
              </span>
            </p>
            {selectedTab === 0 && (
              <div className="flex space-x-2 mt-2">
                <button
                  className="py-1 px-3 bg-green-500 text-white rounded"
                  onClick={() =>
                    handleApprove(review.reviewId, product._id.productId)
                  }
                >
                  Approve
                </button>
                <button
                  className="py-1 px-3 bg-red-500 text-white rounded"
                  onClick={() =>
                    handleReject(review.reviewId, product._id.productId)
                  }
                >
                  Reject
                </button>
              </div>
            )}
            {selectedTab == 1 && (
              <div className="flex space-x-2 mt-2">
                <button
                  className="py-1 px-3 bg-red-500 text-white rounded"
                  onClick={() =>
                    handleReject(review.reviewId, product._id.productId)
                  }
                >
                  Reject
                </button>
                <button
                  className="py-1 px-3 bg-gray-500 text-white rounded"
                  onClick={() => handleDelete(review.reviewId)}
                >
                  Remove
                </button>
              </div>
            )}
            {selectedTab == 2 && (
              <div className="flex space-x-2 mt-2">
                <button
                  className="py-1 px-3 bg-green-500 text-white rounded"
                  onClick={() =>
                    handleApprove(review.reviewId, product._id.productId)
                  }
                >
                  Approve
                </button>
                <button
                  className="py-1 px-3 bg-gray-500 text-white rounded"
                  onClick={() => handleDelete(review.reviewId)}
                >
                  Remove
                </button>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    ));
  };

  return (
    <div className="p-4 dark:bg-gray-800 dark:text-white">
      <h1 className="text-2xl font-bold mb-4 dark:text-gray-200">Reviews</h1>
      <div className="flex flex-wrap border-b mb-4 dark:border-gray-600">
        <button
          className={`py-2 px-4 ${
            selectedTab === 0
              ? "border-b-2 border-blue-500 dark:border-blue-300"
              : ""
          } dark:text-gray-300`}
          onClick={() => handleChange(0)}
        >
          Pending
        </button>
        <button
          className={`py-2 px-4 ${
            selectedTab === 1
              ? "border-b-2 border-blue-500 dark:border-blue-300"
              : ""
          } dark:text-gray-300`}
          onClick={() => handleChange(1)}
        >
          Approved
        </button>
        <button
          className={`py-2 px-4 ${
            selectedTab === 2
              ? "border-b-2 border-blue-500 dark:border-blue-300"
              : ""
          } dark:text-gray-300`}
          onClick={() => handleChange(2)}
        >
          Rejected
        </button>
      </div>
      {selectedTab === 0 && renderReviews(data?.pending || [])}
      {selectedTab === 1 && renderReviews(data?.approved || [])}
      {selectedTab === 2 && renderReviews(data?.rejected || [])}
    </div>
  );
};

export default AuditReviewsPage;
```

- Moderators.tsx

```javascript
const ModeratorPage = () => {
  return (
    <div>
      <h1>Moderators</h1>
    </div>
  );
};

export default ModeratorPage;
```

- Products.tsx

```javascript
import { useState } from "react";
import ProductModal from "../../components/ProductModal";
import { useProducts } from "../../api/queries/adminQueries";
import Spinner from "../../components/ui/Spinner";
import toast, { ErrorIcon } from "react-hot-toast";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import UpdateProductModal from "../../components/UpdateProductModal";
interface InOperation {
  productId: string;
  operation: boolean;
}
const ProductPage = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [UpdateModalIsOpen, setUpdateModalIsOpen] = useState(false);
  const { data, isLoading, isError } = useProducts();
  const queryClient = useQueryClient();
  const [inOperation, setInOperation] =
    useState <
    InOperation >
    {
      productId: "",
      operation: false,
    };

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const openUpdateModal = () => setUpdateModalIsOpen(true);
  const closeUpdateModal = () => setUpdateModalIsOpen(false);

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner className="w-10 h-10 dark:text-white" />
      </div>
    );

  if (isError) return <ErrorIcon />;

  const handleDelete = async (productId: string) => {
    setInOperation({ productId, operation: true });
    try {
      const response = await axios.delete(`/api/admin/products/${productId}`);
      if (response.status === 200) {
        toast.success("Product deleted successfully");
        queryClient.invalidateQueries({
          queryKey: ["admin-products"],
          exact: true,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete product");
    } finally {
      setInOperation({ productId: "", operation: false });
    }
  };
  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
        Products
      </h1>
      <button
        onClick={openModal}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        Add Product
      </button>

      <ProductModal isOpen={modalIsOpen} onRequestClose={closeModal} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5">
        {data?.map((product) => (
          <div
            key={product._id}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg"
          >
            <div className="p-2 bg-white">
              <img
                src={product.mainImage}
                alt={product.name}
                className="w-20 h-20 rounded-lg mx-auto mb-4 object-contain"
              />
            </div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 text-center">
              {product.name}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-center">
              ₹{product.price}
            </p>
            <div className="flex justify-center">
              <Spinner
                className={`w-5 h-5 ml-2 dark:text-white ${
                  inOperation.operation && inOperation.productId === product._id
                    ? "block"
                    : "hidden"
                }`}
              />
            </div>
            <div className="flex justify-center mt-4">
              <button
                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 mr-2"
                onClick={() => handleDelete(product._id)}
              >
                Delete
              </button>
              <button
                className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600"
                onClick={openUpdateModal}
              >
                Update
              </button>
              <UpdateProductModal
                isOpen={UpdateModalIsOpen}
                onRequestClose={closeUpdateModal}
                productId={product._id}
                data={product}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
```

- Users.tsx

```javascript
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import defaultImage from "../../assets/react.svg";
import Loading from "../../components/Loading";

const fetchUsers = async () => {
  const { data } = await axios.get("/api/admin/users");
  return data;
};

const UsersPage = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  if (isLoading) return <Loading />;
  if (error) return <div className="dark:text-white">Error loading users</div>;

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
        Users
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.map(
          (user: {
            _id: string,
            profileImage?: string,
            username: string,
            fullName: { firstName: string, lastName: string },
          }) => (
            <motion.div
              key={user._id}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src={user.profileImage || defaultImage}
                alt={user.username}
                className="w-16 h-16 rounded-full mx-auto mb-4"
              />
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 text-center">
                {user.fullName.firstName} {user.fullName.lastName}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-center">
                @{user.username}
              </p>
            </motion.div>
          )
        )}
      </div>
    </div>
  );
};

export default UsersPage;
```

- ### pages/user

  - ChangePasswordPage.tsx

```javascript
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

interface ErrorResponse {
  error: string;
  errors: { msg: string }[];
}

const ChangePasswordPage: React.FC = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.state || !location.state.token) {
      navigate("/signin");
    }
  }, [location, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    // Send a request to the server to reset the password
    try {
      const token = location.state.token;
      await axios.patch("/api/users/change-password", { newPassword, token });
      toast.success("Password changed successfully");
      navigate("/signin");
    } catch (error) {
      if (axios.isAxiosError < ErrorResponse > error) {
        if (error.response?.status === 400) {
          error.response?.data.errors.forEach((error) => {
            toast.error(error.msg);
          }, []);
        }
      }
      console.error("Error changing password", error);
      toast.error("Error changing password");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-white">
          Change Password
        </h2>
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label
              htmlFor="new-password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              New Password
            </label>
            <input
              type="password"
              id="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
              placeholder="Enter new password"
              required
            />
          </div>
          <div>
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
              placeholder="Confirm new password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
```

- Profile.tsx

```javascript
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useProfileQuery } from "../../api/queries/userQueries";
import { useAuthStore } from "../../stores/authStore";
import toast from "react-hot-toast";
import { FaArrowLeft, FaCamera, FaEdit } from "react-icons/fa";
import Modal from "../../components/ui/Modal";
import { useQueryClient } from "@tanstack/react-query";
import Spinner from "../../components/ui/Spinner";
import Loading from "../../components/Loading";

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { data, error, isLoading } = useProfileQuery();
  const { setAuthenticated } = useAuthStore();
  const [isProfileImageModalOpen, setIsProfileImageModalOpen] = useState(false);
  const [isProfileInfoModalOpen, setIsProfileInfoModalOpen] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const queryClient = useQueryClient();
  const [modalSpinner, setModalSpinner] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: {
      firstName: "",
      lastName: "",
    },
    username: "",
  });

  if (isLoading) return <Loading />;
  if (error) return <div>Error loading profile</div>;

  const user = data?.user;

  const handleLogout = async () => {
    try {
      await axios.get("/api/users/logout", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      localStorage.removeItem("token");
      setAuthenticated(false);
      toast.success("Logged out successfully");
      navigate("/signin");
    } catch (error) {
      console.error("Error during logout", error);
    }
  };

  const handleProfileImageUpdate = async () => {
    if (!profileImage) {
      toast.error("Please select an image");
      return;
    }
    setModalSpinner(true);
    const formData = new FormData();
    formData.append("profileImage", profileImage as File);
    try {
      const response = await axios.post("/api/files/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      await axios.patch("/api/users/profile", {
        profileImage: response.data.imageUrl,
      });
      setModalSpinner(false);
      toast.success("Profile image updated successfully");
      setIsProfileImageModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ["profile"], exact: true });
    } catch (error) {
      console.error("Error updating profile image", error);
      toast.error("Error updating profile image");
    }
  };

  const removeProfileImage = async () => {
    try {
      await axios.patch("/api/users/profile", {
        profileImage: null,
      });
      toast.success("Profile image removed successfully");
      setIsProfileImageModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ["profile"], exact: true });
    } catch (error) {
      console.error("Error removing profile image", error);
      toast.error("Error removing profile image");
    }
  };

  const handleProfileInfoUpdate = () => {
    if (
      profileData.fullName.firstName.trim() === "" ||
      profileData.fullName.lastName.trim() === "" ||
      profileData.username.trim() === ""
    ) {
      toast.error("Please fill all fields");
      return;
    }
    console.log(profileData);

    axios
      .patch("/api/users/profile", profileData)
      .then(() => {
        queryClient.invalidateQueries({ queryKey: ["profile"], exact: true });
        toast.success("Profile updated successfully");
        setIsProfileInfoModalOpen(false);
      })
      .catch((error) => {
        console.error("Error updating profile", error);
        toast.error("Error updating profile");
      });
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex md:items-center justify-center">
      <div className="w-full max-w-2xl md:bg-white md:dark:bg-gray-800 rounded-lg md:shadow-md p-6">
        <button
          onClick={handleBackToHome}
          className="flex items-center hover:text-blue-500 text-gray-600 dark:text-gray-400 mb-4"
        >
          <FaArrowLeft className="mr-2" /> Back
        </button>
        <div className="flex flex-col items-center">
          <div className="relative">
            {user?.profileImage ? (
              <img
                src={user.profileImage}
                alt="Profile"
                className="w-32 h-32 rounded-full mb-4"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gray-300 dark:bg-gray-600 mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-500 dark:text-gray-300">
                  {user?.fullName.firstName[0]}
                  {user?.fullName.lastName[0]}
                </span>
              </div>
            )}
            <button
              onClick={() => setIsProfileImageModalOpen(true)}
              className="absolute bottom-0 right-0 bg-gray-700 text-white p-2 rounded-full hover:bg-gray-800"
            >
              <FaCamera />
            </button>
            <Modal
              isOpen={isProfileImageModalOpen}
              title="Update Profile Image"
              onClose={() => setIsProfileImageModalOpen(false)}
            >
              <div className="flex flex-col items-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setProfileImage(e.target.files?.[0] || null)}
                  className="mb-4 p-2 border border-gray-300 rounded"
                />
                <div className="flex space-x-4">
                  <button
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 flex items-center"
                    onClick={handleProfileImageUpdate}
                    disabled={modalSpinner}
                  >
                    {modalSpinner && <Spinner className="w-5 h-5 mr-2" />}
                    Update
                  </button>
                  {user?.profileImage && (
                    <button
                      className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                      onClick={removeProfileImage}
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            </Modal>
          </div>
          <h2 className="text-2xl font-bold mb-2">
            {user?.fullName.firstName} {user?.fullName.lastName}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            @{user?.username}
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{user?.email}</p>
          <button
            onClick={() => {
              setIsProfileInfoModalOpen(true);
              setProfileData({
                fullName: {
                  firstName: user?.fullName.firstName || "",
                  lastName: user?.fullName.lastName || "",
                },
                username: user?.username || "",
              });
            }}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mb-4 flex items-center"
          >
            <FaEdit className="mr-2" />
            Edit Profile
          </button>
          <Modal
            isOpen={isProfileInfoModalOpen}
            title="Edit Profile"
            onClose={() => setIsProfileInfoModalOpen(false)}
          >
            <div className="flex flex-col items-center">
              <input
                type="text"
                value={profileData.fullName.firstName}
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    fullName: {
                      firstName: e.target.value,
                      lastName: profileData.fullName.lastName,
                    },
                  })
                }
                placeholder="First Name"
                className="mb-4 p-2 border border-gray-300 rounded dark:text-black"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={profileData.fullName.lastName}
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    fullName: {
                      ...profileData.fullName,
                      lastName: e.target.value,
                    },
                  })
                }
                className="mb-4 p-2 border border-gray-300 rounded dark:text-black"
              />
              <input
                type="text"
                placeholder="Username"
                value={profileData.username}
                onChange={(e) =>
                  setProfileData({ ...profileData, username: e.target.value })
                }
                className="mb-4 p-2 border border-gray-300 rounded dark:text-black"
              />
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                onClick={handleProfileInfoUpdate}
              >
                Update
              </button>
            </div>
          </Modal>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

```

- ProtectedRoute.tsx

```javascript
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated } = useAuthStore();

  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" />;
};

export default ProtectedRoute;
```

- ResetPasswordPage.tsx

```javascript
import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import OtpInput from "../../components/OtpInput";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ResetPasswordPage = () => {
  const [timer, setTimer] = useState({ minutes: 2, seconds: 0 });
  const [resendDisabled, setResendDisabled] = useState(false);
  const [email, setEmail] = useState("");

  const startTimer = () => {
    setResendDisabled(true);
    const countdown = setInterval(() => {
      setTimer((prevTimer) => {
        const { minutes, seconds } = prevTimer;
        if (minutes === 0 && seconds === 0) {
          clearInterval(countdown);
          setResendDisabled(false);
          return { minutes: 2, seconds: 0 };
        } else if (seconds === 0) {
          return { minutes: minutes - 1, seconds: 59 };
        } else {
          return { minutes, seconds: seconds - 1 };
        }
      });
    }, 1000);
  };

  const handleResendOtpClick = () => {
    handleSendOtpClick();
  };
  const navigate = useNavigate();

  const [showOtpInput, setShowOtpInput] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSendOtpClick = async () => {
    setLoading(true);

    try {
      await axios.post("/api/users/reset-password", { email });
      startTimer();
      setLoading(false);
      setShowOtpInput(true);
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };
  const handleOtpSubmit = (otp: string) => {
    if (!email) {
      toast.error("Email is required");
      return;
    }

    const verifyOtp = async () => {
      try {
        const response = await axios.post("/api/users/verify-otp/password", {
          email,
          otp,
        });
        toast.success(response.data.message);
        navigate("/change-password", { state: { token: response.data.token } });
      } catch (error) {
        toast.error("an error occurred");

        console.error("Error verifying OTP:", error);
      }
    };

    verifyOtp();
  };

  return (
    <>
      {!showOtpInput ? (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
          <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-white">
              Reset Your Password
            </h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendOtpClick();
              }}
            >
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email address
              </label>
              <div className="space-y-4">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                />

                {loading ? (
                  <div className="flex justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1 }}
                      className="w-6 h-6 border-4 border-t-4 border-t-transparent border-indigo-600 rounded-full"
                    />
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                  >
                    Send OTP
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
          <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-white">
              Reset Your Password
            </h2>
            <OtpInput inputLength={6} onSubmitOtp={handleOtpSubmit} />
            <div className="text-center">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Didn’t receive the OTP?{" "}
                <button
                  onClick={handleResendOtpClick}
                  className={`font-medium ${
                    resendDisabled
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-indigo-600 hover:underline dark:text-indigo-400"
                  }`}
                  disabled={resendDisabled}
                >
                  Resend OTP
                </button>
              </p>
              {resendDisabled && (
                <p className=" dark:text-white">
                  You can resend OTP in {timer.minutes}:
                  {timer.seconds < 10 ? `0${timer.seconds}` : timer.seconds}.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ResetPasswordPage;
```

- SignIn.tsx

```javascript
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import lightLogo from "../../assets/lightLogo.svg";
import darkLogo from "../../assets/darkLogo.svg";
import { motion } from "framer-motion";
import { useState } from "react";
import TextInput from "../../components/ui/TextInput";
import { FaUser } from "react-icons/fa";
import PasswordInput from "../../components/ui/PasswordInput";
import toast from "react-hot-toast";
import { useColorSchemeStore } from "../../stores/colorSchemeStore";
import { useAuthStore } from "../../stores/authStore";

interface AxiosErrorResponse {
  error: string;
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
    const isEmail: (value: string) => boolean = (value: string) => {
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
      auth.login(response.data.token);
      navigate("/home");
      // Handle successful login, e.g., redirect to dashboard
    } catch (error) {
      if (axios.isAxiosError < AxiosErrorResponse > error) {
        if (error.response?.status === 400) {
          toast.error(error.response?.data.error);
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
```

- SignUp.tsx

```javascript
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChangeEvent, useState } from "react";
import { FaUser, FaEnvelope } from "react-icons/fa";
import PasswordInput from "../../components/ui/PasswordInput";
import TextInput from "../../components/ui/TextInput";
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
      navigate("/verify-email", { state: { email } });
    } catch (error) {
      if (axios.isAxiosError < AxiosErrorResponse > error) {
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
```

- VerifyEmailPage.tsx

```javascript
import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import OtpInput from "../../components/OtpInput";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const VerifyEmailPage = () => {
  const [timer, setTimer] = useState({ minutes: 2, seconds: 0 });
  const [resendDisabled, setResendDisabled] = useState(false);

  const startTimer = () => {
    setResendDisabled(true);
    const countdown = setInterval(() => {
      setTimer((prevTimer) => {
        const { minutes, seconds } = prevTimer;
        if (minutes === 0 && seconds === 0) {
          clearInterval(countdown);
          setResendDisabled(false);
          return { minutes: 2, seconds: 0 };
        } else if (seconds === 0) {
          return { minutes: minutes - 1, seconds: 59 };
        } else {
          return { minutes, seconds: seconds - 1 };
        }
      });
    }, 1000);
  };

  const handleResendOtpClick = () => {
    handleSendOtpClick();
  };
  const navigate = useNavigate();
  const location = useLocation();

  const [showOtpInput, setShowOtpInput] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSendOtpClick = async () => {
    setLoading(true);
    const email = location.state.email;
    if (!email) {
      navigate("/signin");
      return;
    }

    try {
      await axios.post("/api/users/verify-email", { email });
      startTimer();
      setLoading(false);
      setShowOtpInput(true);
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };
  const handleOtpSubmit = (otp: string) => {
    const email = location.state.email;
    if (!email) {
      navigate("/signin");
      return;
    }

    const verifyOtp = async () => {
      try {
        const response = await axios.post("/api/users/verify-otp/email", {
          email,
          otp,
        });
        toast.success(response.data.message);
        navigate("/signin");
      } catch (error) {
        toast.error("an error occurred");

        console.error("Error verifying OTP:", error);
        navigate("/verify-email", { state: { email } });
      }
    };

    verifyOtp();
  };

  return (
    <>
      {!showOtpInput ? (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
          <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-white">
              Verify Your Email
            </h2>
            {loading ? (
              <div className="flex justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="w-6 h-6 border-4 border-t-4 border-t-transparent border-indigo-600 rounded-full"
                />
              </div>
            ) : (
              <button
                onClick={handleSendOtpClick}
                className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Send OTP
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
          <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-white">
              Verify Your Email
            </h2>
            <OtpInput inputLength={6} onSubmitOtp={handleOtpSubmit} />
            <div className="text-center">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Didn’t receive the OTP?{" "}
                <button
                  onClick={handleResendOtpClick}
                  className={`font-medium ${
                    resendDisabled
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-indigo-600 hover:underline dark:text-indigo-400"
                  }`}
                  disabled={resendDisabled}
                >
                  Resend OTP
                </button>
              </p>
              {resendDisabled && (
                <p className=" dark:text-white">
                  You can resend OTP in {timer.minutes}:
                  {timer.seconds < 10 ? `0${timer.seconds}` : timer.seconds}.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VerifyEmailPage;
```
