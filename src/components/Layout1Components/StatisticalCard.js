import React from "react";

const StatisticalCard = ({ data }) => {
  const { title, color, value, icon } = data;
  return (
    <div style={{ background: color }} className={`text-white p-3 rounded`}>
      <div className="fs-6">{title}</div>
      <div className="d-flex justify-content-between">
        <div className="fw-bold fs-5">{value}</div>
        <div className="fs-5">{icon}</div>
      </div>
    </div>
  );
};
export default StatisticalCard;
