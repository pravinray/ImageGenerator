import React, { useEffect, useState } from "react";
import { Card, Flex, Input } from "antd";

const Generator = () => {
  const { Meta } = Card;
  const { Search } = Input;

  const [updateLoading, setUpdateLoading] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const [error, setError] = useState("");

  const onSearchClick = async (value, _e, info) => {
    if (!value?.length) {
      setError("Please type keywords.");
      return;
    }
    setImgUrl("");
    setError("");
    console.log(info?.source);
    console.log(value?.length);
    let responseData;

    // fetch("http://localhost:3000/generate", {
    fetch("https://pravin-img-generator-api.onrender.com/generate", {
      method: "POST",
      body: JSON.stringify({
        keyword: value,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("aayo response :: ", data);
        responseData = data?.data;
        if (data?.data && data?.status === "COMPLETED") {
          console.log(imgUrl, "valid data set gariyo");
          setImgUrl(data?.data[0]?.asset_url);
        } else {
          console.log(error, "error from api data set gariyo");

          setError(data?.data?.detail);
        }
      })
      .catch((err) => {
        console.log(err.message);
        console.log("error set gariyo");

        setError(responseData?.details || err.message);
      });
  };

  return (
    <Flex
      style={{
        padding: "120px",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Search
        style={{ width: "65%" }}
        placeholder="input search text"
        enterButton="Search"
        size="large"
        // loading={updateLoading}
        onSearch={onSearchClick}
      />
      {imgUrl && (
        <Card
          hoverable
          style={{ width: "55%", paddingTop: "inherit" }}
          cover={
            <img
              alt="Generated Image"
              //   src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              src={imgUrl}
            />
          }
        >
          <Meta title="Generated Image" />
        </Card>
      )}{" "}
      {error && (
        <Card>
          <h2 style={{ color: "red" }}>{error}</h2>
        </Card>
      )}
    </Flex>
  );
};

export default Generator;
