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
            _id: string;
            profileImage?: string;
            username: string;
            fullName: { firstName: string; lastName: string };
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
