import { Button, Input, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ImageDialog from "./ImageDialog";
import RewardDialog from "./RewardDialog";

function Labeler({ web3, account, contract }) {
  const [fileUrl, setFileUrl] = useState("");
  const [imgClass, setImgClass] = useState("");
  const [reward, setReward] = useState(0);
  const [loading, setLoading] = useState(false);

  // const { isOpen, onOpen, onClose } = useDisclosure()
  const [rewardDialogOpen, setRewardDialogOpen] = useState(false);
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);

  useEffect(() => {
    async function getReward() {
      if (fileUrl !== "") {
        let res = await contract.methods.getImageReward(fileUrl).call();
        res = web3.utils.fromWei(res, "ether");
        console.log("reward: ", res);
        setReward(res);
      }
    }
    getReward();
  }, [fileUrl, web3, contract]);

  const handleGetImage = async () => {
    try {
      const url = await contract.methods.getRandomImage().call();
      console.log("url: ", url);
      setFileUrl(url);
    } catch (err) {
      console.log(err);
      // onOpen();
      setAlertDialogOpen(true);
    }
  };

  const handleChange = async (e) => {
    const imgcls = e.target.value;
    setImgClass(imgcls);
  };

  const submitToContract = async () => {
    setLoading(true);
    try {
      await contract.methods
        .uploadLabeledImage(fileUrl, imgClass)
        .send({ from: account });
      console.log("success");
      setFileUrl("");
      setImgClass("");
      setLoading(false);
      setRewardDialogOpen(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Text fontSize="lg" m="3">
        1. Click 'Get image'
      </Text>
      <Button onClick={handleGetImage}>Get image</Button>
      {fileUrl && <img src={fileUrl} width="500px" alt="none" />}
      <Text fontSize="lg" m="3">
        2. Answer the Class of image to earn money!
      </Text>
      <Input onChange={handleChange} value={imgClass} />
      <Text as="i">Earn Reward: {reward} ether</Text>
      <br />
      <Button
        m="3"
        onClick={submitToContract}
        disabled={!fileUrl}
        isLoading={loading}
      >
        Submit
      </Button>
      <ImageDialog
        alertDialogOpen={alertDialogOpen}
        setAlertDialogOpen={setAlertDialogOpen}
      />
      <RewardDialog
        rewardDialogOpen={rewardDialogOpen}
        setRewardDialogOpen={setRewardDialogOpen}
        reward={reward}
        setReward={setReward}
      />
    </>
  );
}
export default Labeler;
