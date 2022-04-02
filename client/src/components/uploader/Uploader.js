import React, { useState } from "react";
import { Button, Input, Text } from "@chakra-ui/react";
import { create } from "ipfs-http-client";

const client = create("https://ipfs.infura.io:5001/api/v0");

function Uploader({ web3, account, contract }) {
  const [fileUrl, setFileUrl] = useState(``);
  const [price, setPrice] = useState(`0.0005`);
  const [loading, setLoading] = useState(false);

  const submitToContract = async () => {
    setLoading(true);
    await contract.methods
      .uploadRawImage(fileUrl)
      .send({ from: account, value: web3.utils.toWei(price, "ether") });
    const response = await contract.methods.getNum().call();
    console.log("res:", response);
    setFileUrl("");
  };

  const onUpload = async (e) => {
    const file = e.target.files[0];
    try {
      const added = await client.add(file);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setFileUrl(url);
    } catch (err) {
      console.log("upload file err", err);
    }
  };
  const handlePrice = (e) => {
    const price = e.target.value;
    console.log(typeof price);
    setPrice(price);
  };
  return (
    <>
      <Text fontSize="lg" m="3">
        1. Input reward you want to pay to labeler in <b>ETH</b>
      </Text>
      <Input onChange={handlePrice} value={price} />
      <Text fontSize="lg" m="3">
        2. Upload your unlabeled image
      </Text>
      <input type="file" onChange={onUpload} />
      {fileUrl && (
        <>
          <img src={fileUrl} width="700px" alt="none" />
          <Button m="3" onClick={submitToContract} isLoading={loading}>
            Upload
          </Button>
        </>
      )}
    </>
  );
}
export default Uploader;
