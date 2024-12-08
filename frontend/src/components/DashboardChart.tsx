import { Doughnut } from "react-chartjs-2";
import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { DashboardData } from "../api/queries/adminQueries";
import { useColorSchemeStore } from "../stores/colorSchemeStore";

ChartJS.register(CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

interface DashboardChartProps {
  data: DashboardData;
}

const DashboardChart = ({ data }: DashboardChartProps) => {
  console.log(data);
  const { isDarkMode } = useColorSchemeStore();
  // Data for Reviews by Status
  const reviewStatusLabels = data.reviewsByStatus.map((status) => status._id);
  const reviewCounts = data.reviewsByStatus.map((status) => status.count);

  // Chart Data Configurations
  const chartConfigurations = [
    {
      title: "Users",
      data: {
        labels: ["Users"],
        datasets: [
          {
            label: "Users",
            data: [data.totalUsers],
            backgroundColor: ["#00d2ff"],
            hoverBackgroundColor: ["#00a9cc"],
            borderWidth: 0,
          },
        ],
      },
    },
    {
      title: "Products",
      data: {
        labels: ["Not Reviewed", "Reviewed", "Total Products"],
        datasets: [
          {
            label: "Products",
            data: [
              data.productStatus.notReviewedCount,
              data.productStatus.reviewedCount,
              data.productStatus.totalProduct,
            ],
            backgroundColor: ["#ffa400", "#ff4b1f", "#7f00ff"],
            hoverBackgroundColor: ["#cc8400", "#cc3d18", "#6b00cc"],
            borderWidth: 0,
          },
        ],
      },
    },
    {
      title: "Moderators",
      data: {
        labels: ["Moderators"],
        datasets: [
          {
            label: "Moderators",
            data: [data.totalModerators],
            backgroundColor: ["#ff4b1f"],
            hoverBackgroundColor: ["#cc3d18"],
            borderWidth: 0,
          },
        ],
      },
    },
    {
      title: "Reviews by Status",
      data: {
        labels: [...reviewStatusLabels, "Total Reviews"],
        datasets: [
          {
            label: "Reviews",
            data: [...reviewCounts, reviewCounts.reduce((a, b) => a + b, 0)],
            backgroundColor: ["#7f00ff", "#e100ff", "#ff007f", "#00ffff"],
            hoverBackgroundColor: ["#6b00cc", "#c000cc", "#cc0066", "#00cccc"],
            borderWidth: 0,
          },
        ],
      },
    },
  ];

  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    cutout: "75%", // Makes the chart hollow (Doughnut effect)
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          color: isDarkMode ? "white" : "black", // Adapts to Tailwind's dark mode
        },
      },
    },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 dark:bg-gray-900 dark:text-white">
      {chartConfigurations.map((config, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          className="p-4 rounded-lg shadow-md dark:shadow-gray-400 dark:shadow-sm bg-white dark:bg-gray-900"
        >
          <h2 className="text-lg font-semibold mb-4">{config.title}</h2>
          <div className="w-full h-64">
            <Doughnut data={config.data} options={chartOptions} />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default DashboardChart;
