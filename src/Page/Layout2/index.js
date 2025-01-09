import { ArrowUpOutlined, PlusCircleOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Col,
  Input,
  Progress,
  Row,
  Select,
  Table,
  Typography,
} from "antd";
import React from "react";

import "./Layout2.scss";
import CoinPriceCard from "components/Layout2Components/CoinPriceCard";
import BalanceHistoryChart from "components/Layout2Components/BalanceHistoryChart";

const cardData = [
  {
    title: "Bitcoin Price",
    price: "$9,831",
    percentage: "10%",
    isIncrease: true,
    color: "linear-gradient(90deg, #f12711, #f5af19)",
    chartType: "mountain",
  },
  {
    title: "Ethereum Price",
    price: "$7,831",
    percentage: "0.7%",
    isIncrease: true,
    color: "linear-gradient(90deg, #00c6ff, #0072ff)",
    chartType: "wave",
  },
  {
    title: "Ripple Price",
    price: "$1,239",
    percentage: "0.8%",
    isIncrease: false,
    color: "linear-gradient(90deg, #ff7e5f, #ff1e56)",
    chartType: "mountain",
  },
  {
    title: "Litecoin Price",
    price: "$849",
    percentage: "47%",
    isIncrease: false,
    color: "linear-gradient(90deg, #f7971e, #ffd200)",
    chartType: "line",
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

const Layout2 = () => {
  return (
    <div>
      <Row gutter={[24, 24]} className="mb-3">
        {cardData.map((data, index) => {
          return (
            <Col xl={6} lg={6} md={6} sm={24} xs={24} key={data.id}>
              <div className="p-3 bg-white rounded shadow">
                <CoinPriceCard key={index} {...data} />
              </div>
            </Col>
          );
        })}
      </Row>
      <Row gutter={[24, 24]} className="equal-height-row mb-3">
        <Col xl={12} lg={12} md={12} sm={24} xs={24}>
          <div className="d-flex justify-content-between bg-white p-3 shadow-lg rounded full-height">
            <div className="flex-grow-1 pr-3">
              <Typography.Title level={4}>
                Your Portfolio Balance
              </Typography.Title>
              <Typography.Title level={2} className="mb-0">
                $179,626{" "}
                <Typography.Text type="success" className="fs-5">
                  64% <ArrowUpOutlined />
                </Typography.Text>
              </Typography.Title>
              <Typography.Text type="secondary">
                Overall balance
              </Typography.Text>
              <div className="mt-3 d-flex gap-2">
                <Button type="primary">Deposit</Button>
                <Button className="bg-success text-white">Withdraw</Button>
              </div>
              <div className="mt-3">
                <Typography.Text type="link" className="text-primary">
                  <PlusCircleOutlined /> Add New Wallet
                </Typography.Text>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex-grow-1 border-left pl-3">
              <Typography.Title level={5}>
                Portfolio Distribution
              </Typography.Title>
              <div className="mb-2">
                <Typography.Text>BTC | 8.74</Typography.Text>
                <Progress
                  percent={78}
                  showInfo={false}
                  strokeColor="#1890ff"
                  className="ml-2 flex-grow-1"
                />
                <Typography.Text strong>78%</Typography.Text>
              </div>
              <div className="mb-2">
                <Typography.Text>RPL | 1.23</Typography.Text>
                <Progress
                  percent={48}
                  showInfo={false}
                  strokeColor="#eb2f96"
                  className="ml-2 flex-grow-1"
                />
                <Typography.Text strong>48%</Typography.Text>
              </div>
              <div>
                <Typography.Text>LTE | 0.71</Typography.Text>
                <Progress
                  percent={34}
                  showInfo={false}
                  strokeColor="#fa8c16"
                  className="ml-2 flex-grow-1"
                />
                <Typography.Text strong>34%</Typography.Text>
              </div>
            </div>
          </div>
        </Col>
        <Col xl={12} lg={12} md={12} sm={24} xs={24}>
          <div className="bg-white full-height shadow p-3">
            <BalanceHistoryChart className="chart-scale" />
          </div>
        </Col>
      </Row>
      <Row gutter={[24, 24]} className="equal-height-row mb-3 height">
        <Col xl={8} lg={8} md={8} sm={24} xs={24}>
          <div className="bg-white shadow-lg rounded full-height p-3">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <Typography.Title className="p-0 m-0" level={5}>
                Send Money To
              </Typography.Title>
              <Typography.Text className="text-primary p-0 m-0">
                <PlusCircleOutlined /> Add New Account
              </Typography.Text>
            </div>
            <Table
              dataSource={[
                {
                  key: "1",
                  name: "Jeniffer L.",
                  transfer: "2 hrs. ago",
                  avatar:
                    "https://th.bing.com/th/id/OIP.o_1NSEa321or-RYEqvLEbgHaJN?w=131&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
                },
                {
                  key: "2",
                  name: "Jim Green",
                  transfer: "17 days ago",
                  avatar:
                    "https://th.bing.com/th/id/OIP.o_1NSEa321or-RYEqvLEbgHaJN?w=131&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
                },
                {
                  key: "3",
                  name: "Joe Black",
                  transfer: "1 month ago",
                  avatar:
                    "https://th.bing.com/th/id/OIP.o_1NSEa321or-RYEqvLEbgHaJN?w=131&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
                },
                {
                  key: "4",
                  name: "Mila Alba",
                  transfer: "1 month ago",
                  avatar:
                    "https://th.bing.com/th/id/OIP.o_1NSEa321or-RYEqvLEbgHaJN?w=131&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
                },
              ]}
              columns={[
                {
                  title: "Account Holder Name",
                  dataIndex: "name",
                  key: "name",
                  render: (text, record) => (
                    <div className="d-flex align-items-center">
                      <Avatar src={record.avatar} style={{ marginRight: 8 }} />
                      {text}
                    </div>
                  ),
                },
                {
                  title: "Last Transfer",
                  dataIndex: "transfer",
                },
                {
                  title: "Action",
                  render: () => <Button type="link">Pay</Button>,
                },
              ]}
              pagination={false}
            />
          </div>
        </Col>
        <Col xl={8} lg={8} md={8} sm={24} xs={24}>
          <div
            style={{
              background: "#02283f",
            }}
            className="text-center text-white d-flex flex-column justify-content-between full-height p-3"
          >
            <div className="text-center">
              <img
                width={100}
                src={
                  "https://cdn0.iconfinder.com/data/icons/mobile-interactions-dark-outlines/128/swipe_tab-512.png"
                }
              />
              <Typography.Title level={3} className="text-white">
                Refer and Get Reward
              </Typography.Title>
              <Typography.Text className="text-white">
                Refer us to your friends and earn bonus when they join.
              </Typography.Text>
            </div>
            <div>
              <Button
                type="primary"
                style={{
                  backgroundColor: "#fa8c16",
                  borderColor: "#fa8c16",
                }}
              >
                Invite Friends
              </Button>
            </div>
          </div>
        </Col>
        <Col xl={8} lg={8} md={8} sm={24} xs={24}>
          <div className="bg-white shadow-lg rounded full-height p-3">
              <Typography.Title level={4}>Currency Calculator</Typography.Title>
              <Typography.Text>1.87 BTC equals</Typography.Text>
              <Typography.Title level={2} className="text-primary my-2">
                11466.78 USD
              </Typography.Title>
              <Typography.Text type="secondary">
                @ 1 BTC = 6178.72 USD
              </Typography.Text>
              <div style={{ marginTop: "20px" }}>
                <Row gutter={16}>
                  <Col span={8}>
                    <label>From</label>
                    <Select defaultValue="BTC">
                      <Select.Option value="BTC">BTC</Select.Option>
                      <Select.Option value="ETH">ETH</Select.Option>
                    </Select>
                  </Col>
                  <Col span={8}>
                    <label>To</label>
                    <Select defaultValue="BTC">
                      <Select.Option value="BTC">BTC</Select.Option>
                      <Select.Option value="ETH">ETH</Select.Option>
                    </Select>
                  </Col>
                  <Col span={8}>
                    <label>Amount (BTC):</label>
                    <Input placeholder="0.0" />
                  </Col>
                </Row>
                <Button type="primary" block style={{ marginTop: "20px" }}>
                  Transfer Now
                </Button>
              </div>
            </div>
        </Col>
      </Row>
    </div>
  );
};
export default Layout2;
