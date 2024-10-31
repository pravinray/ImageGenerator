import React, { useState } from "react";
import { Card, Flex, Image, Input } from "antd";
import { useLoadingContext } from "../LoadingProvider";

const Generator = () => {
  const { Meta } = Card;
  const { Search } = Input;

  const [imgUrl, setImgUrl] = useState("");
  const [error, setError] = useState("");

  const { loading, setLoading } = useLoadingContext();

  const onSearchClick = async (value, _e, info) => {
    if (!value?.length) {
      setError("Please type keywords.");
      return;
    }
    setLoading(true);
    setImgUrl("");
    setError("");

    let responseData;

    await fetch(`${process.env.REACT_APP_API_URL}/generate`, {
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
        responseData = data;
        console.log("responseData :: ", responseData);

        if (responseData && responseData?.status === "COMPLETED") {
          setImgUrl(responseData?.data[0]?.asset_url);
          console.log(imgUrl, "valid data set gariyo");
        } else {
          console.log(error, "error from api data set gariyo");

          setError(responseData.detail);
        }
      })
      .catch((err) => {
        console.log(err.message);
        console.log("error set gariyo");

        setError(responseData?.details || err.message);
      });

    setLoading(false);
  };

  return (
    <Flex
      style={{
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Card
        style={{
          minWidth: "-webkit-fill-available",
          textAlignLast: "center",
          paddingTop: "40px",
          border: "none",
        }}
      >
        <Search
          style={{ width: "65%" }}
          placeholder="Type it in, let the art begin!"
          enterButton="Search"
          size="large"
          onSearch={onSearchClick}
        />
      </Card>
      {loading && (
        <Card style={{ border: "none" }}>
          <Image
            alt="Loading"
            src={require("../assets/images/loading.gif")}
            preview={false}
          />
        </Card>
      )}
      {imgUrl && (
        <Card
          hoverable
          style={{ width: "55%", paddingTop: "inherit" }}
          cover={<Image alt="Generated Image" src={imgUrl} />}
        >
          <Meta style={{ textAlign: "center" }} title="Generated Image" />
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
