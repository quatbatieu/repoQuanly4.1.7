import React from "react";
const FeedCard = () => {
  return (
    <div className="d-flex align-items-center gap-3">
      <div
        style={{ width: "50px", height: "50px"  }}
        className="rounded-circle d-flex justify-content-center align-items-center bg-primary overflow-hidden"
      >
        <img
          className="w-100 h-100 object-contain"
          src="https://www.bing.com/th?id=OIP.9_MptOLxjJEGSGukPt9FWQHaHa&w=150&h=150&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"
          alt="image"
        />
      </div>
      <div className="d-flex flex-column">
        <div className="fw-bold">Nguyễn Thanh Nhả</div>
        <div className="text-secondary">TTDK Intern</div>
      </div>
    </div>
  );
};

export default FeedCard;
