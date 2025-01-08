import {
  CloseCircleFilled,
  DeleteOutlined,
  FacebookOutlined,
  InstagramOutlined,
  MoneyCollectFilled,
  PhoneOutlined,
  TeamOutlined,
  TwitterOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Checkbox,
  Col,
  Input,
  Progress,
  Row,
  Timeline,
} from "antd";
import React from "react";

import SalesChart from "components/Layout1Components/SalesChart";
import StatisticalCard from "components/Layout1Components/StatisticalCard";
import "./Layout1.scss";

const StatisticalData1 = [
  {
    id: 1,
    title: "Total Sale",
    color: "#3783df",
    value: "95641",
    icon: <CloseCircleFilled />,
  },
  {
    id: 2,
    title: "New Order",
    color: "#d03756",
    value: "95641",
    icon: <MoneyCollectFilled />,
  },
  {
    id: 3,
    title: "New User",
    color: "#5cd083",
    value: "95641",
    icon: <UserOutlined />,
  },
  {
    id: 4,
    title: "Unique Visitor",
    color: "#d0ec5c",
    value: "95641",
    icon: <TeamOutlined />,
  },
];

const CheckBoxList = [
  {
    id: 1,
    title: "Meeting with me",
  },
  {
    id: 2,
    title: "Hangout with friends",
  },
  {
    id: 3,
    title: "Meeting with teams",
  },
  {
    id: 4,
    title: "Daily Report",
  },
  {
    id: 5,
    title: "Self Learning",
  },
];

const Layout1 = () => {
  return (
    <div>
      <Row gutter={[24, 24]} className="mb-3">
        {StatisticalData1.map((data) => {
          return (
            <Col
              xl={6}
              lg={6}
              md={6}
              sm={24}
              xs={24}
              key={data.id}
              className="shadow-lg"
            >
              <StatisticalCard data={data} />
            </Col>
          );
        })}
      </Row>
      <Row gutter={[24, 24]} className="equal-height-row mb-3">
        <Col xl={16} lg={16} md={16} sm={24} xs={24}>
          <div className="bg-white full-height shadow-lg">
            <SalesChart />
          </div>
        </Col>
        <Col xl={8} lg={8} md={8} sm={24} xs={24}>
          <div className="bg-white p-3 full-height shadow-lg">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="fw-bold">Todo</div>
              <div className="fs-5 text-red-500">
                <DeleteOutlined style={{ color: "red" }} />
              </div>
            </div>
            <div className="mb-3 d-flex flex-column gap-2">
              {CheckBoxList.map((data) => {
                return (
                  <div
                    key={data.id}
                    className="d-flex align-items-center gap-2 border-bottom pb-2"
                  >
                    <Checkbox />
                    {data.title}
                  </div>
                );
              })}
            </div>
            <div className="d-flex gap-2 align-items-center">
              <Input placeholder="Add new item" />
              <Button type="primary">Add</Button>
            </div>
          </div>
        </Col>
      </Row>
      <Row gutter={[24, 24]} className="mb-3 equal-height-row">
        <Col xl={8} lg={8} md={8} sm={24} xs={24}>
          <div className="bg-white p-3 shadow-lg full-height">
            <div className="fw-bold fs-5 mb-3">Progress Report</div>
            <div className="d-flex justify-content-around">
              <Row gutter={[24, 24]} className="sm-dflex-between">
                <Col xl={8} lg={8} md={8} sm={8} xs={8}>
                  <div className="d-flex justify-content-center">
                    <Progress
                      className="circle-progress-scale"
                      type="circle"
                      percent={70}
                      strokeColor="#1890ff"
                    />
                  </div>
                </Col>
                <Col xl={8} lg={8} md={8} sm={8} xs={8}>
                  <div className="d-flex justify-content-center">
                    <Progress
                      className="circle-progress-scale"
                      type="circle"
                      percent={30}
                      strokeColor="#f5222d"
                    />
                  </div>
                </Col>
                <Col xl={8} lg={8} md={8} sm={8} xs={8}>
                  <div className="d-flex justify-content-center">
                    <Progress
                      className="circle-progress-scale"
                      type="circle"
                      percent={100}
                      strokeColor="#52c41a"
                    />
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
        <Col xl={8} lg={8} md={8} sm={24} xs={24}>
          <div className="bg-white p-3 shadow-lg full-height">
            <h3>Timeline</h3>
            <Timeline>
              <Timeline.Item>Responded to need 2019-01-01</Timeline.Item>
              <Timeline.Item>Added an interest 2019-02-10</Timeline.Item>
              <Timeline.Item>Joined the group 2019-03-27</Timeline.Item>
              <Timeline.Item>Responded to need 2019-05-09</Timeline.Item>
            </Timeline>
          </div>
        </Col>
        <Col xl={8} lg={8} md={8} sm={24} xs={24}>
          <div className="bg-white p-3 shadow-lg full-height">
            <Card className="w-max" style={{ width: "100%" }}>
              <Card.Meta
                avatar={
                  <Avatar
                    src="https://th.bing.com/th/id/OIP.o_1NSEa321or-RYEqvLEbgHaJN?w=119&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                    className=""
                    style={{ height: "50px", width: "50px" }}
                  />
                }
                title="MR. Bean"
                description={
                  <div>
                    <div>Software Engineer</div>
                    <div className="d-flex gap-2 mt-2 fs-5">
                      <FacebookOutlined />
                      <TwitterOutlined />
                      <PhoneOutlined />
                      <InstagramOutlined />
                    </div>
                  </div>
                }
              />

              <p className="mt-2">
                Computer users and programmers have become so accustomed to
                using Windows.
              </p>
            </Card>
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default Layout1;
