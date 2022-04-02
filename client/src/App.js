import React, {  useState } from "react";
import getWeb3 from "./getWeb3";
// import SimpleStorageContract from "./contracts/SimpleStorage.json";
import ImageLabelContract from "./contracts/ImageLabel.json";
import { useWeb3React } from "@web3-react/core";
import { injected } from "./components/wallet/Connectors";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
  Flex,
  Box,
  Heading,
  Spacer,
  Text,
  Image,
  Link,
} from "@chakra-ui/react";
import Uploader from "./components/uploader/Uploader";
import Labeler from "./components/labeler/Labeler";
import githubLogo from './github-logo.png'
function App() {
  const { active, account, activate, deactivate } =
    useWeb3React();
  const [web3, setWeb3] = useState("");
  const [contract, setContract] = useState("");

  async function connectWeb3() {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = ImageLabelContract.networks[networkId];
      const instance = new web3.eth.Contract(
        ImageLabelContract.abi,
        deployedNetwork && deployedNetwork.address
      );
      console.log(instance);
      console.log(deployedNetwork);

      setWeb3(web3);
      setContract(instance);

    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  }

  async function connect() {
    try {
      await connectWeb3();
      await activate(injected);
    } catch (ex) {
      console.log(ex);
    }
  }

  async function disconnect() {
    try {
      deactivate();
    } catch (ex) {
      console.log(ex);
    }
  }

  return (
    <>
      <Flex bg="teal.500" p="3" mb="3">
        <Box p='2' as={Link} href='https://github.com/CyCTW/ImageLabel-DApp'>
          <Image boxSize='20px' src={githubLogo} />
          </Box>
        <Spacer />
        <Box p="2">
          <Heading size="md">Image Labeling to Earn!</Heading>
        </Box>
        <Spacer />
        <Box>
          {active ? (
            <Button onClick={disconnect}>Disconnect</Button>
          ) : (
            <Button onClick={connect}>Connect</Button>
          )}
        </Box>
      </Flex>

      {active ? (
        <>
          <Flex justify="center">
            <Tabs isFitted varient='enclosed' colorScheme="green">
              <Text m="3">
                Welcome, now connected to <b>{account}</b>
              </Text>

              <TabList>
                <Tab><Text fontSize='lg' as='b'>I am an Image Uploader!</Text></Tab>
                <Tab><Text fontSize='lg' as='b'>I am an Image Labeler!</Text></Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Uploader contract={contract} web3={web3} account={account} />
                </TabPanel>
                <TabPanel>
                  <Labeler contract={contract} web3={web3} account={account} />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Flex>
        </>
      ) : (
        <Flex justify="center">
          <Text fontSize='2xl'>Please collect to wallet in Rospten Network</Text>
        </Flex>
      )}
    </>
  );
}

export default App;
