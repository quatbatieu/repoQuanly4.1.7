import {
  CameraOutlined,
  CaretUpOutlined,
  CiCircleOutlined,
  CloseCircleFilled,
  DeleteOutlined,
  DownOutlined,
  FacebookOutlined,
  InfoCircleFilled,
  InstagramOutlined,
  MailOutlined,
  MoneyCollectFilled,
  PhoneOutlined,
  PicRightOutlined,
  SettingOutlined,
  StarOutlined,
  TeamOutlined,
  TwitterOutlined,
  UpOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Carousel,
  Checkbox,
  Col,
  Image,
  Input,
  Progress,
  Row,
  Timeline,
  Typography,
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
          <div className="bg-white p-3 shadow-lg full-height ">
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
      <Row gutter={[24, 24]} className="mb-3">
        <Col xs={24} sm={24} md={12} xl={6} lg={12}>
          <div className="bg-white p-3 shadow-lg rounded">
            <div className="text-center">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <Typography.Title level={4}>Project Widget</Typography.Title>
                <div className="d-flex gap-2">
                  <InfoCircleFilled />
                  <StarOutlined />
                  <DownOutlined />
                </div>
              </div>
              <div className="mb-3 text-center">
                <Avatar
                  size={64}
                  style={{ backgroundColor: "#f56a00" }}
                  src="https://static.vecteezy.com/system/resources/previews/006/404/906/large_2x/eagle-hunt-logo-design-free-free-vector.jpg"
                ></Avatar>
                <Typography.Title level={4}>Eagal Hunt App</Typography.Title>
                <Avatar.Group className="d-flex gap-3 justify-content-center">
                  <Avatar src="path_to_avatar_1.jpg" />
                  <Avatar src="path_to_avatar_2.jpg" />
                  <Avatar src="path_to_avatar_3.jpg" />
                  <Avatar>+</Avatar>
                </Avatar.Group>
              </div>
              <Button type="primary">Go to projects</Button>
            </div>
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} xl={6} lg={12}>
          <div className="bg-white p-3 shadow-lg rounded">
            <div className="text-end">
              <SettingOutlined className="fs-4 text-secondary" />
            </div>
            <div className="">
              <div className="d-flex justify-content-around align-items-center mb-2">
                <PicRightOutlined className="fs-4 text-secondary" />
                <Avatar
                  size={64}
                  src="https://ewrestlingnews.com/wp-content/uploads/2020/03/The-Rock.jpg"
                ></Avatar>
                <PicRightOutlined className="fs-4 text-secondary" />
              </div>
              <div className="text-center d-flex flex-column gap-1">
                <Typography.Text level={4}>Christina Johnson</Typography.Text>
                <Typography.Text className="fw-bold text-secondary">
                  Actor
                </Typography.Text>
              </div>
            </div>
            <div
              className="d-flex flex-column gap-2"
              style={{
                background: "linear-gradient(135deg, #6B73FF 0%, #000DFF 100%)",
                clipPath:
                  "polygon(0% 100%, 20% 60%, 40% 70%, 60% 40%, 80% 70%, 100% 50%, 100% 100%)",
              }}
            >
              <Typography.Text className="fs-5">
                <CaretUpOutlined />
                38%
              </Typography.Text>
              <Typography.Text className="text-secondary">
                Productivity
              </Typography.Text>
            </div>
          </div>
        </Col>

        <Col xs={24} sm={24} md={12} xl={6} lg={12}>
          <div className="bg-white p-3 shadow-lg">
            <div>
              <Typography.Title level={5} className="text-secondary">
                SOCIAL MEDIA
              </Typography.Title>
              <Typography.Title level={4}>
                Digital Media Marketing Online Webinar
              </Typography.Title>
              <div className="d-flex flex-column gap-2 mb-2">
                <Typography.Text className="text-secondary">
                  27th Aug, 09:30 pm EST
                </Typography.Text>
                <Typography.Text className="">
                  Learn from the exports. This webinar explains right...
                </Typography.Text>
                <Typography.Text className="text-primary fw-bold">
                  Are You ready to join?
                </Typography.Text>
              </div>
              <div>
                <Button type="primary">Yes</Button>
                <Button className="text-white" style={{ background: "orange" }}>
                  Maybe
                </Button>
                <Button className="bg-secondary text-white">No</Button>
              </div>
            </div>
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} xl={6} lg={12}>
          <div className="bg-white shadow-lg position-relative rounded">
            <div
              className="bg-center bg-cover"
              style={{
                height: "150px",
                backgroundImage: `url("https://th.bing.com/th/id/OIP.bpLCT3eOL_x50VKz0k5rNQHaFj?w=242&h=181&c=7&r=0&o=5&dpr=1.3&pid=1.7")`,
              }}
            ></div>
            <div className="p-3">
              <Avatar
                size={64}
                shape="square"
                className="small-avatar position-absolute"
                style={{
                  top: "50%",
                  transform: "translate(0, -50%)", // Đặt giữa cả theo chiều ngang và dọc
                  position: "absolute", // Cần đảm bảo đây là thành phần tương đối
                }}
                src="https://th.bing.com/th/id/OIP.Su7MI-yb6beBgpv-AcahfgHaE8?w=272&h=181&c=7&r=0&o=5&dpr=1.3&pid=1.7" // Thay bằng đường dẫn ảnh nhỏ thực tế
              />
              <div className="mt-5">
                <div className="d-flex gap-1 flex-column mb-2">
                  <Typography.Text level={5} className="fw-bold">
                    Welcome to roadmap new
                  </Typography.Text>
                  <Typography.Text type="secondary">
                    Crypto Expert
                  </Typography.Text>
                </div>
                <div className="indicator-container">
                  <span className="circle active"></span>
                  <span className="circle"></span>
                  <span className="circle"></span>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Row gutter={[24, 24]}>
        <Col xl={8} lg={12} xs={24} sm={24} md={24}>
          <div className="bg-white p-3 d-flex flex-column gap-3 shadow-lg rounded">
            <Typography.Title level={5} className="text-primary">
              <MailOutlined /> Newsletter Subscription
            </Typography.Title>
            <Typography.Text className="">
              Don't miss our weekly news and updates
            </Typography.Text>
            <Input placeholder="Username" />
            <div>
              <Button type="primary">Subscribe</Button>
            </div>
          </div>
        </Col>
        <Col xl={8} lg={12} xs={24} sm={24} md={24}>
          <div
            className="text-white p-3 d-flex flex-column gap-2 shadow-lg rounded"
            style={{
              background: "linear-gradient(135deg, #6B73FF 0%, #000DFF 100%)",
            }}
          >
            <CameraOutlined className="fs-3" />
            <Typography.Title level={2} className="text-white">
              38,248 Photos
            </Typography.Title>
            <Typography.Text className="text-white">
              New photos added this week
            </Typography.Text>
            <Typography.Text className="text-white">
              Now kickstart with your next design. Subscribe today and move
              $20/month
            </Typography.Text>
            <div>
              <Button className="text-white" style={{ background: "orange" }}>
                Subscribe
              </Button>
            </div>
          </div>
        </Col>
        <Col xl={8} lg={12} xs={24} sm={24} md={24}>
          <div className="bg-white p-3 shadow-lg d-flex flex-column gap-2 rounded">
            <Card.Meta
              className="mb-4"
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
                </div>
              }
            />
            <Typography.Text>
              Mr. Bean là một nhân vật hài hước huyền thoại do diễn viên người
              Anh Rowan Atkinson thủ vai. Ra mắt lần đầu vào năm 1990 trong loạt
              phim truyền hình cùng tên, Mr. Bean nhanh chóng trở thành biểu
              tượng toàn cầu của thể loại hài tình huống. Với tính cách ngây
              ngô, vụng về nhưng đầy sáng tạo, anh luôn gặp phải những tình
              huống oái oăm và giải quyết chúng theo cách độc đáo, thường dẫn
              đến những tràng cười sảng khoái.
            </Typography.Text>
            <div>
              <Button type="primary">Subscribe</Button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default Layout1;
