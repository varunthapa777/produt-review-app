import { useDashboardData } from "../../api/queries/adminQueries";
import DashboardChart from "../../components/DashboardChart";

const AdminDashboard = () => {
  const { data, isLoading, error } = useDashboardData();

  if (isLoading)
    return <div className="text-center text-gray-500">Loading...</div>;
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
