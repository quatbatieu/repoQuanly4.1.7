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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SalesChart = () => {
  const data = {
    labels: [
      "Page A",
      "Page B",
      "Page C",
      "Page D",
      "Page E",
      "Page F",
      "Page G",
      "Page H",
    ],
    datasets: [
      {
        label: "PV",
        data: [4000, 3000, 9000, 6000, 7000, 7000, 6000, 8000],
        backgroundColor: "rgba(54, 162, 235, 0.6)", 
      },
      {
        label: "UV",
        data: [2000, 2000, 3000, 2000, 2000, 2000, 2000, 2000],
        backgroundColor: "rgba(75, 192, 192, 0.6)", 
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        font: { weight: "bold" },
        display: true,
        text: "Sales Report",
        align: "start",
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        beginAtZero: true,
      },
    },
  };

  return <Bar  data={data} options={options} />;
};

export default SalesChart;
