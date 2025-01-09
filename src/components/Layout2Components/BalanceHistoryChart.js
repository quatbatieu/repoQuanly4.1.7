import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Đăng ký các thành phần cần thiết
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const BalanceHistoryChart = () => {
  const data = {
    labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
    datasets: [
      {
        label: 'Balance',
        data: [200, 400, 300, 500, 700, 600, 400, 500, 600, 800, 700, 900], // Thay bằng dữ liệu của bạn
        fill: true,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Ẩn legend
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Ẩn lưới ngang trên trục X
        },
      },
      y: {
        grid: {
          drawBorder: false, // Ẩn đường viền trục Y
        },
        ticks: {
          beginAtZero: true,
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default BalanceHistoryChart;
