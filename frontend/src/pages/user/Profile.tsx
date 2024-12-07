import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useProfileQuery } from "../../api/queries/userQueries";
import { useAuthStore } from "../../stores/authStore";

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { data, error, isLoading } = useProfileQuery();
  const { setAuthenticated } = useAuthStore();

  if (isLoading) return <div>Loading...</div>;
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

  return (
    <div>
      <h1>Profile Page</h1>
      <p>Name: {user?.fullName.firstName}</p>
      <p>Email: {user?.email}</p>

      <button
        onClick={handleLogout}
        className="m-5 p-4 text-white bg-red-500 rounded-md"
      >
        Logout
      </button>
      <Link to="/">Home</Link>
      {/* other user fields... */}
    </div>
  );
};

export default ProfilePage;
