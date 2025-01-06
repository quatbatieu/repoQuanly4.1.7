import { Col, Row } from "antd";
import React, { Fragment } from "react";
import StatisticalCard from "components/OverviewComponents/StatisticalCard";
import Icon, {
  BellOutlined,
  HeartOutlined,
  MessageOutlined,
  PhoneOutlined,
  StarOutlined,
} from "@ant-design/icons";

import FeedCard from "components/OverviewComponents/FeedCard";
import AvatarCaroselCard from "components/OverviewComponents/AvatarCaroselCard";
import "./overview.scss";

const StatisticalData1 = [
  {
    id: 1,
    title: "Categories",
    color: "#0e6ba8",
    number: 103,
    icon: <StarOutlined />,
  },
  {
    id: 2,
    title: "Customers",
    color: "#000",
    number: 203,
    icon: <PhoneOutlined />,
  },
  {
    id: 3,
    title: "Notifications",
    color: "#FFC300",
    number: 323,
    icon: <BellOutlined />,
  },
  {
    id: 4,
    title: "Messages",
    color: "#Ff0000",
    number: 870,
    icon: <MessageOutlined />,
  },
];

const StatisticalData2 = [
  {
    id: 1,
    title: "Categories",
    color: "#0e6ba8",
    number: 103,
    icon: <StarOutlined />,
    showIconRight: true,
  },
  {
    id: 2,
    title: "Customers",
    color: "#000",
    number: 203,
    icon: <PhoneOutlined />,
    showIconRight: true,
  },
  {
    id: 3,
    title: "Notifications",
    color: "#FFC300",
    number: 323,
    icon: <BellOutlined />,
    showIconRight: true,
  },
  {
    id: 4,
    title: "Messages",
    color: "#Ff0000",
    number: 870,
    icon: <MessageOutlined />,
    showIconRight: true,
  },
];

const forecastData = [
  {
    day: "Mon",
    direction: "↙",
    temp: "29.15°",
    icon: "https://static.vecteezy.com/system/resources/previews/009/304/897/original/sun-icon-set-clipart-design-illustration-free-png.png",
  },
  {
    day: "Tue",
    direction: "↙",
    temp: "26.69°",
    icon: "https://static.vecteezy.com/system/resources/previews/009/304/897/original/sun-icon-set-clipart-design-illustration-free-png.png",
  },
  {
    day: "Wed",
    direction: "↑",
    temp: "19.22°",
    icon: "https://static.vecteezy.com/system/resources/previews/009/304/897/original/sun-icon-set-clipart-design-illustration-free-png.png",
  },
  {
    day: "Thu",
    direction: "↑",
    temp: "19.18°",
    icon: "https://static.vecteezy.com/system/resources/previews/009/304/897/original/sun-icon-set-clipart-design-illustration-free-png.png",
  },
  {
    day: "Sat",
    direction: "↗",
    temp: "16.75°",
    icon: "https://static.vecteezy.com/system/resources/previews/009/304/897/original/sun-icon-set-clipart-design-illustration-free-png.png",
  },
  {
    day: "Sun",
    direction: "↗",
    temp: "16.25°",
    icon: "https://static.vecteezy.com/system/resources/previews/009/304/897/original/sun-icon-set-clipart-design-illustration-free-png.png",
  },
];

const Overview = () => {
  return (
    <div>
      <Row gutter={[24, 24]} className="mb-3">
        {StatisticalData1.map((data) => {
          return (
            <Col xl={6} lg={6} md={6} sm={24} xs={24} key={data.id}>
              <StatisticalCard data={data} />
            </Col>
          );
        })}
      </Row>
      <Row gutter={[24, 24]} className="mb-3">
        {StatisticalData2.map((data) => {
          return (
            <Col xl={6} lg={6} md={6} sm={24} xs={24} key={data.id}>
              <StatisticalCard data={data} />
            </Col>
          );
        })}
      </Row>
      <Row gutter={[24, 24]} className="mb-3  align-items-stretch">
        <Col
          xl={8}
          lg={8}
          md={8}
          sm={24}
          xs={24}
          className="rounded overflow-hidden shadow-lg bg-white"
        >
          <div className="py-2">
            <div className="d-flex justify-content-between align-items-center ">
              <span className="fw-bold">Feed</span>
              <span className="text-secondary">
                Last updated 24 minutes ago
              </span>
            </div>
            <hr />
            <div className="d-flex flex-column gap-3">
              <FeedCard />
              <FeedCard />
              <FeedCard />
            </div>
          </div>
        </Col>
        <Col xl={8} lg={8} md={8} sm={24} xs={24} className="rounded shadow-lg">
          <div className="bg-white h-100 rounded overflow-hidden">
            <AvatarCaroselCard />
          </div>
        </Col>
        <Col xl={8} lg={8} md={8} sm={24} xs={24} className="rounded shadow-lg">
          <div className="bg-white h-100 rounded overflow-hidden">
            <AvatarCaroselCard />
          </div>
        </Col>
      </Row>
      <Row gutter={[24, 24]}>
        <Col
          xl={12}
          lg={12}
          md={12}
          sm={24}
          xs={24}
          className="rounded bg-white py-2 shadow-lg"
        >
          <div>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h3>VietNam, VN</h3>
                <h4>August 31st 2025</h4>
                <span>Clear sky</span>
              </div>
              <h3>
                30.05<sup>o</sup>
              </h3>
            </div>
            <div className="d-flex justify-content-between">
              <div className="d-flex flex-column gap-3  flex-grow-1 p-2">
                <div className="d-flex justify-content-between">
                  <span>Temp</span>
                  <span>30.05</span>
                </div>
                <div>
                  <div className="d-flex justify-content-between">
                    <span>Temp max</span>
                    <span>30.05</span>
                  </div>
                </div>
                <div>
                  <div className="d-flex justify-content-between">
                    <span>Sea level</span>
                    <span>1011.93</span>
                  </div>
                </div>
                <div>
                  <div className="d-flex justify-content-between">
                    <span>Humidty</span>
                    <span>15</span>
                  </div>
                </div>
              </div>
              <div className="d-flex flex-column gap-3  flex-grow-1 p-2">
                <div className="d-flex justify-content-between">
                  <span>Temp min</span>
                  <span>30.05</span>
                </div>
                <div>
                  <div className="d-flex justify-content-between">
                    <span>Pressure</span>
                    <span>30.05</span>
                  </div>
                </div>
                <div>
                  <div className="d-flex justify-content-between">
                    <span>Grnd level</span>
                    <span>112.9</span>
                  </div>
                </div>
                <div>
                  <div className="d-flex justify-content-between">
                    <span>Temp kf</span>
                    <span>-4.92</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white">
              <h2 className="position-relative bg-white px-2 d-inline-block z-3">
                Forecast
              </h2>
              <div className="row justify-content-center">
                {forecastData.map((item, index) => (
                  <div className="col-6 col-md-2 mb-3 text-center" key={index}>
                    <div className="p-3 rounded shadow-sm">
                      <div className="fw-bold">{item.day}</div>
                      <div className="fs-4">{item.direction}</div>
                      <div>
                        <img width={20} src={item.icon} />
                      </div>
                      <div className="text-muted">{item.temp}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Col>
        <Col
          xl={12}
          lg={12}
          md={12}
          sm={24}
          xs={24}
          className="rounded overflow-hidden shadow-lg"
        >
          <div className="bg-white h-100">
            <div
              className="card"
              style={{
                backgroundImage:
                  "url(https://th.bing.com/th/id/OIP.xnFtAqVC7mDOKSY7qn65NgHaE7?rs=1&pid=ImgDetMain)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "300px",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
              }}
            >
              <h5 className="card-title text-white">
                Shrimp and Chorizo Paella
              </h5>
              <p className="card-subtitle text-light mb-2">Yesterday</p>
            </div>
            <div className="card-body p-2">
              <p className="card-text">
                Phileas Fogg and Aouda went on board, where they found Fix
                already installed. Below deck was a square cabin, of which the
                walls bulged out in the form of cots, above a circular divan; in
                the centre was a table provided with a swinging lamp.
              </p>
            </div>
            <hr />
            <div
              className="d-flex justify-content-around p-2"
              style={{ fontSize: "20px" }}
            >
              <div>
                <HeartOutlined />
              </div>
              <div>
                <HeartOutlined />
              </div>
              <div>
                <HeartOutlined />
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Overview;
