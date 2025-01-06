import Icon from "@ant-design/icons";
import React from "react";

const StatisticalCard = ({ data }) => {
  const { title, number, icon, color, showIconRight } = data;
  return (
    <div
      style={
        showIconRight
          ? { background: color, color: "white" }
          : { background: "white" }
      }
      className={`border d-flex align-items-center gap-4 p-2 rounded shadow-lg ${
        showIconRight ? "justify-content-between" : ""
      } `}
    >
      {showIconRight ? (
        ""
      ) : (
        <div
          className={`p-3 rounded-circle d-flex justify-center align-items-center text-white`}
          style={{
            width: "50px",
            height: "50px",
            background: color,
            fontSize: "20px",
          }}
        >
          {icon}
        </div>
      )}

      <div>
        <div className="fw-bold">{number}</div>
        <div>{title}</div>
      </div>
      {showIconRight && <div style={{ fontSize: "20px" }}>{icon}</div>}
    </div>
  );
};

export default StatisticalCard;
