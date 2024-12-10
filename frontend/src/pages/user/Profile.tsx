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
