import { Image } from "antd";
import React from "react";

const Logo = () => {
  return (
    <Image
      alt="logo"
      src={require("../assets/images/logo.png")}
      width={100}
      height={"auto"}
      style={{
        position: "sticky",
        top: 0,
        left: 0,
        zIndex: 1000,
        margin: "10px",
      }}
      preview={false}
    />
  );
};

export default Logo;
