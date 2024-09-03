// const fetch = require("node-fetch");

const generateAndFetch = async (searchKey) => {
  const resp = await fetch(`https://api.limewire.com/api/image/generation`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Api-Version": "v1",
      Accept: "application/json",
      Authorization:
        "Bearer lmwr_sk_nQflQ7DWoT_9E7TfC9DIz2VYskXbQYz18QwR8xsAIi88up7s",
    },
    body: JSON.stringify({
      // prompt: "A cute baby sea otter",
      prompt: searchKey,
      aspect_ratio: "1:1",
    }),
  });

  const data = await resp.json();
  console.log("generate and fetch :: ",data);
  return data;
};

export { generateAndFetch };
