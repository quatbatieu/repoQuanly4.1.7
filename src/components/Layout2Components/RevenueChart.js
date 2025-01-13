import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Đăng ký các thành phần Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const RevenueChart = ({ data }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true, // Hiển thị legend
        position: "top", // Vị trí của legend
        align: "center", // Căn giữa legend
        labels: {
          boxWidth: 20, // Độ rộng của hộp màu
          padding: 20, // Khoảng cách giữa các mục
        },
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default RevenueChart;
