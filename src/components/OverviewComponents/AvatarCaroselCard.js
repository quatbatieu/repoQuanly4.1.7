import { Carousel } from "antd";
import React from "react";

const contentStyle = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const AvatarCaroselCard = ({ avatar, name, title }) => {
  return (
    <div>
      <Carousel autoplay>
        <div>
          <h3 style={contentStyle}>1</h3>
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>3</h3>
        </div>
        <div>
          <h3 style={contentStyle}>4</h3>
        </div>
      </Carousel>
      <div className="d-flex justify-content-around">
        <div className="d-flex flex-column align-items-center">
          <div className="fw-bold">24</div>
          <div className="text-secondary">Comments</div>
        </div>
        <div className="d-flex flex-column align-items-center">
          <div className="fw-bold">24</div>
          <div className="text-secondary">Comments</div>
        </div>
        <div className="d-flex flex-column align-items-center">
          <div className="fw-bold">24</div>
          <div className="text-secondary">Comments</div>
        </div>
      </div>
    </div>
  );
};

export default AvatarCaroselCard;
