import React from "react";
import { Input } from "antd";

const voidFunction = () => {};

const BasicSearch = ({
  placeholder = "",
  onchange = voidFunction,
  onsearch = voidFunction,
  onpressenter = voidFunction,
  style = {},
  className = "",
  value = "",
}) => {
  return (
    <Input.Search
      value={value}
      style={style}
      className={className}
      autoFocus
      onPressEnter={onpressenter}
      placeholder={placeholder}
      onChange={onchange}
      onSearch={onsearch}
    />
  );
};

export default BasicSearch;
