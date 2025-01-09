
import {
  ArrowUpOutlined,
  PlusCircleOutlined,
  SearchOutlined,
  TagOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Col,
  Image,
  Input,
  List,
  Progress,
  Row,
  Select,
  Table,
  Tag,
  Typography,
} from "antd";
import React, { useState } from "react";

import "./Layout2.scss";
import CoinPriceCard from "components/Layout2Components/CoinPriceCard";
import BalanceHistoryChart from "components/Layout2Components/BalanceHistoryChart";
import IMAGE_STORES from "../../assets/icons/gamestore.png"

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

const newsData = [
  {
    title: "10 things you must know before trading in cryptocurrency",
    tags: ["BTC", "Crypto", "Trading", "Tips", "Cryptocurrency"],
    image:
      "https://th.bing.com/th/id/OIP.woMHlD1B10-b0FQINwjlWQHaE8?rs=1&pid=ImgDetMain",
    description:
      "Khám phá 10 điều quan trọng bạn cần biết trước khi bắt đầu giao dịch tiền điện tử. Từ việc hiểu rủi ro đến cách chọn sàn giao dịch, bài viết này sẽ giúp bạn trang bị kiến thức cần thiết để bắt đầu hành trình giao dịch an toàn và hiệu quả.",
  },
  {
    title: "Getting started with cryptocurrency - what is blockchain",
    tags: ["BTC", "Crypto", "Trading", "Tips", "Cryptocurrency"],
    image:
      "https://th.bing.com/th/id/OIP.woMHlD1B10-b0FQINwjlWQHaE8?rs=1&pid=ImgDetMain",
    description:
      "Bắt đầu với tiền điện tử có thể là một thách thức, nhưng với kiến thức đúng đắn về blockchain – công nghệ nền tảng của các loại tiền số, bạn sẽ nắm bắt được cách hoạt động và tiềm năng của thị trường này. Tìm hiểu tất cả trong bài viết này",
  },
  {
    title: "Is cryptocurrency investment a trap or opportunity?",
    tags: ["BTC", "Crypto", "Trading", "Tips", "Cryptocurrency"],
    image:
      "https://th.bing.com/th/id/OIP.SgsFZrww5zr3j_TxECspfgHaEK?rs=1&pid=ImgDetMain",
    description:
      "Đầu tư vào tiền điện tử luôn là chủ đề tranh luận. Trong bài viết này, chúng tôi phân tích các cơ hội và rủi ro tiềm ẩn, giúp bạn đưa ra quyết định thông minh hơn về việc liệu đầu tư vào tiền điện tử là cơ hội vàng hay một cái bẫy nguy hiểm.",
  },
];

const orderData = [
  {
    key: "1",
    currency: "0.24 BTC",
    rate: "1 BTC = $740",
    date: "08.10.17",
    fee: "-$2.33",
  },
  {
    key: "2",
    currency: "0.34 RPL",
    rate: "1 RPL = $80.2",
    date: "08.03.17",
    fee: "-$1.23",
  },
  // Add more data as needed
];

const columns = [
  {
    title: "Currency",
    dataIndex: "currency",
    key: "currency",
  },
  {
    title: "Rate (USD)",
    dataIndex: "rate",
    key: "rate",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Fee",
    dataIndex: "fee",
    key: "fee",
  },
];

const Layout2 = () => {
  const [currentCryptoTab, setCurrentCryptoTab] = useState("All");
  return (
    <div>
      <Row gutter={[24, 24]} className="mb-3">
        {cardData.map((data, index) => {
          return (
            <Col xl={6} lg={12} md={12} sm={24} xs={24} key={data.id}>
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
        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
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
        <Col xl={8} lg={12} md={12} sm={24} xs={24}>
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
        <Col xl={8} lg={12} md={12} sm={24} xs={24}>
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
      <Row gutter={[24, 24]} className="equal-height-row mb-3 height">
        <Col xl={16} lg={24} md={24} sm={24} xs={24}>
          <div className="bg-white shadow-lg rounded full-height p-3">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <Typography.Text>Crypto News</Typography.Text>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                {["All", "BTC", "ETH", "XRP"].map((tab, index) => {
                  return (
                    <div>
                      <Button
                        type="link"
                        key={index}
                        className={
                          currentCryptoTab == tab
                            ? "bg-primary text-white"
                            : "text-primary"
                        }
                        onClick={() => setCurrentCryptoTab(tab)}
                      >
                        {tab}
                      </Button>
                    </div>
                  );
                })}
              </div>
              <div>
                <SearchOutlined className="fs-5 text-primary" />
              </div>
            </div>
            <List
              itemLayout="vertical"
              dataSource={newsData}
              renderItem={(item) => (
                <List.Item>
                  <div className="d-flex flex-wrap gap-3">
                    <Image
                      className="rounded"
                      alt={item.title}
                      src={item.image}
                      style={{ maxWidth: "100px", height: "auto" }}
                    />
                    <div style={{ flex: 1 }}>
                      <Typography.Title level={5}>
                        {item.title}
                      </Typography.Title>
                      <div className="mb-3">{item.description}</div>
                      <div className="d-flex justify-content-between align-items-center flex-wrap">
                        <div className="d-flex gap-2 flex-wrap text-secondary align-items-center">
                          <TagOutlined />
                          {item.tags.reduce((acc, current) => {
                            return acc + "" + current + ", ";
                          }, "")}
                        </div>
                        <Button type="link">Read Full Story</Button>
                      </div>
                    </div>
                  </div>
                </List.Item>
              )}
            />
          </div>
        </Col>
        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
          <div
            className="d-flex justify-content-between shadow-lg rounded p-3"
            style={{
              background:
                "linear-gradient(90deg,rgb(154, 30, 226),rgb(54, 43, 218))",
            }}
          >
            <div className="d-flex flex-column gap-3">
              <Typography.Text className="text-white" level={4}>
                Download Mobile Apps
              </Typography.Text>
              <Typography.Text strong className="text-white" level={3}>
                Now, your account is on your finger
              </Typography.Text>
            </div>
            <div>
              <img
                style={{ width: "100px" }}
                src={IMAGE_STORES}
              />
            </div>
          </div>
          <div className="bg-white shadow-lg rounded full-height p-3">
            <div className="d-flex justify-content-between align-items-center">
              <h2>Order History</h2>
              <Button type="link">Detailed History</Button>
            </div>
            <Table
              dataSource={orderData}
              columns={columns}
              pagination={false}
            />
          </div>
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
