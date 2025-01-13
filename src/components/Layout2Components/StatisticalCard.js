import { DollarCircleOutlined } from "@ant-design/icons";
import { Col, Row, Statistic, Typography } from "antd";
import React from "react";
// { title, value, icon, color }
const Statistical2Card = ({ data }) => {
  const {
    title,
    value,
    precision,
    prefix,
    suffix,
    position,
  } = data;
  return (
    <div>
      {position === "right" ? (
        <Row
          align="middle"
          justify="space-between"
          className="equal-height-row"
        >
          <Col className="full-height">
            <Typography.Title style={{ fontSize: 14, color: "#888" }}>
              {title}
            </Typography.Title>
            <Typography.Title level={2} style={{ margin: "5px 0" }}>
              ${value}
            </Typography.Title>
            <Typography.Text
              style={{
                color: precision > 0 ? "#3f8600" : "#cf1322",
                fontSize: 12,
              }}
            >
              {`${precision > 0 ? "↑" : "↓"}`}
              {suffix}
            </Typography.Text>
          </Col>
          <Col className="full-height d-flex flex-row justify-content-end">
            <div className="d-flex align-items-center justify-content-center">
              {prefix}
            </div>
          </Col>
        </Row>
      ) : (
        <Row
          align="middle"
          justify="space-between"
          className="equal-height-row"
        >
          <Col className="full-height d-flex flex-row justify-content-start">
            <div className="d-flex align-items-center justify-content-center">
              {prefix}
            </div>
          </Col>
          <Col className="full-height">
            <Typography.Title style={{ fontSize: 14, color: "#888" }}>
              {title}
            </Typography.Title>
            <Typography.Title level={2} style={{ margin: "5px 0" }}>
              ${value}
            </Typography.Title>
            <Typography.Text
              style={{
                color: precision > 0 ? "#3f8600" : "#cf1322",
                fontSize: 12,
              }}
            >
              {`${precision > 0 ? "↑" : "↓"}`}
              {suffix}
            </Typography.Text>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default Statistical2Card;
