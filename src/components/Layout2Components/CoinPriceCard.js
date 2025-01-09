import { ReloadOutlined } from "@ant-design/icons";
import {  Typography } from "antd";
import React from "react";

const CoinPriceCard = ({
  title,
  price,
  percentage,
  isIncrease,
  color,
  chartType,
}) => {
  return (
    <div className="bg-white">
      <div className="d-flex justify-content-between">
        <div>
          <Typography.Title className="m-0" level={3}>
            {price}
          </Typography.Title>
          <Typography.Text
            strong={true}
            className={`${isIncrease ? "text-success" : "text-danger"}`}
          >
            {percentage} {isIncrease ? <span>▲</span> : <span>▼</span>}
          </Typography.Text>
          <br />
          <Typography.Text type="secondary">{title}</Typography.Text>
        </div>
        <ReloadOutlined className="align-self-start fs-4 text-primary" />
      </div>
      <div
        className="mt-3 position-relative"
        style={{
          height: "50px",
          background: chartType !== "line" ? color : "",
          clipPath:
            chartType === "wave"
              ? "polygon(0% 100%, 20% 60%, 40% 70%, 60% 40%, 80% 70%, 100% 50%, 100% 100%)"
              : chartType === "mountain"
              ? "polygon(0% 100%, 30% 50%, 60% 75%, 90% 25%, 100% 100%)"
              : "none",
        }}
      >
        {chartType === "line" && (
          <svg className="position-absolute top-0 left-0 w-full h-full">
            <polyline
              points="10,40 50,20 90,30 130,10 170,25 190,40 220,5 250,20"
              fill="none"
              stroke="orange"
              strokeWidth="3"
            />
            {[
              "10,40",
              "50,20",
              "90,30",
              "130,10",
              "170,25",
              "190,40",
              "220,5",
              "250,20",
            ].map((point, index) => {
              const [cx, cy] = point.split(",");
              return <circle key={index} cx={cx} cy={cy} r="4" fill="orange" />;
            })}
          </svg>
        )}
      </div>
    </div>
  );
};

export default CoinPriceCard;
