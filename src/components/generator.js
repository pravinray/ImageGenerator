import React, { useEffect, useState } from "react";
import { Card, Flex, Input } from "antd";
import { generateAndFetch } from "../utils/generate-img";

const Generator = () => {
  const { Meta } = Card;
  const { Search } = Input;

  const [updateLoading, setUpdateLoading] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const [error, setError] = useState("");

  const onSearchClick = async (value, _e, info) => {
    console.log(info?.source);
    console.log(value);

    const generatedData = await generateAndFetch(value);
    if (generatedData?.data && generatedData?.status === "COMPLETED") {
      setImgUrl(generatedData.data.asset_url);
    } else {
      setError(generatedData?.details);
    }
  };

  return (
    <Flex
      style={{
        padding: "120px",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div>{!updateLoading ? 99999 : 343434}</div>
      <Search
        style={{ width: "75%" }}
        placeholder="input search text"
        enterButton="Search"
        size="large"
        // loading={updateLoading}
        onSearch={onSearchClick}
      />
      {imgUrl ?? (
        <Card
          hoverable
          style={{ width: "55%", paddingTop: "inherit" }}
          cover={
            <img
              alt="example"
            //   src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              src={imgUrl}
            />
          }
        >
          <Meta title="Generated Image" />
        </Card>
      )}{" "}
      {error ?? (
        <Card style={{ width: 300 }}>
          <p>Card content</p>
          <p>{() => console.log("error :: ", error)}</p>
          <p>{imgUrl}</p>
        </Card>
      )}
    </Flex>
  );
};

export default Generator;
