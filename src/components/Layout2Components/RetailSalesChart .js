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
import { Button, Col, Row } from "antd";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RetailSalesChart = () => {
  const data = {
    labels: ["Canada", "US", "Greenland", "Russia", "Brazil", "Sydney", "Norway", "China"],
    datasets: [
      {
        label: "Sales",
        data: [120, 190, 150, 100, 80, 110, 30, 140],
        backgroundColor: "#4C96FF",
      },
    ],
  };

  const options = {
    height: 400,
    responsive: true,
    indexAxis: "y",
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Top Retail Sales Location" },
    },
    scales: {
      x: { grid: { color: "#e5e5e5" } },
      y: { grid: { display: false } },
    },
  };

  const activityData = [
    { location: "Canada", percentage: 8, color: "#4C96FF" },
    { location: "Greenland", percentage: 20, color: "#00C49A" },
    { location: "US", percentage: 14, color: "#FFBB28" },
    { location: "Russia", percentage: 25, color: "#FF8042" },
    { location: "Brazil", percentage: 7, color: "#FF4560" },
    { location: "Sydney", percentage: 10, color: "#0088FE" },
    { location: "Norway", percentage: 2, color: "#BDBDBD" },
    { location: "China", percentage: 14, color: "#8884D8" },
  ];

  return (
    <div className="p-4 bg-white rounded shadow-sm">
      <Row gutter={[16, 16]}>
        {/* Cột Biểu Đồ */}
        <Col xl={16} lg={24} md={24} sm={24} xs={24}>
          <Bar data={data} options={options} />
        </Col>

        {/* Cột Thống Kê */}
        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
          <div className="text-end mb-3">
            <Button className="bg-white text-black">Export Report</Button>
          </div>
          <div className="text-secondary mb-2">ALL USERS STATISTICS</div>
          <div className="fw-bold fs-4 mb-3">1,87,42,102 users</div>
          <div className="fw-bold mb-3">Current Activity</div>
          <ul className="list-unstyled">
            {activityData.map((item) => (
              <li key={item.location} className="d-flex align-items-center mb-2">
                <span
                  className="me-2"
                  style={{
                    width: "10px",
                    height: "10px",
                    backgroundColor: item.color,
                    borderRadius: "50%",
                  }}
                ></span>
                <span className="flex-grow-1">{item.location}</span>
                <span className="fw-bold">{item.percentage}%</span>
              </li>
            ))}
          </ul>
        </Col>
      </Row>
    </div>
  );
};

export default RetailSalesChart;
