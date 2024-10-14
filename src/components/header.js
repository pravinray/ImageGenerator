import { Image } from "antd";
import React from "react";

const Header = () => {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
        position: "sticky",
        top: 0,
        width: "100%",
        backgroundColor: "#fff",
        zIndex: 1000,
      }}
    >
      <Image
        alt="logo"
        src={require("../assets/images/logo.png")}
        width={100}
        height={"auto"}
        preview={false}
      />
      <div
        style={{
          color: "#7160b5",
          marginRight: "20px",
          fontSize: "larger",
          fontWeight: "bold",
        }}
      >
        AI Image Generator
      </div>
    </header>
  );
};

export default Header;
