import React, { useEffect, useState } from 'react';
import getWeb3 from "./getWeb3";
// import SimpleStorageContract from "./contracts/SimpleStorage.json";
import ImageLabelContract from "./contracts/ImageLabel.json";
import { useWeb3React } from "@web3-react/core"
import { injected } from "./components/wallet/Connectors"
import { Tabs, TabList, TabPanels, Tab, TabPanel, Button, Flex, Box, Heading, Spacer, Text } from '@chakra-ui/react'
import Uploader from './components/uploader/Uploader';
import Labeler from './components/labeler/Labeler';


function App() {
  const { active, account, library, connector, activate, deactivate } = useWeb3React()

  async function connect() {
    try {
      await activate(injected)
    } catch (ex) {
      console.log(ex)
    }
  }

  async function disconnect() {
    try {
      deactivate()
    } catch (ex) {
      console.log(ex)
    }
  }


  const [accounts, setAccounts] = useState([]); // state variable to set account.
  const [storageValue, setStorageValue] = useState(0);
  const [web3, setWeb3] = useState("");
  const [contract, setContract] = useState("");

  // storageValue: 0, web3: null, accounts: null, contract: null
  useEffect(async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      // const accounts = await web3.eth.getAccounts();
      // console.log(web3)
      // console.log(accounts)
      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = ImageLabelContract.networks[networkId];
      const instance = new web3.eth.Contract(
        ImageLabelContract.abi,
        deployedNetwork && deployedNetwork.address,
      );
      console.log(instance)
      console.log(deployedNetwork)

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      // this.setState({ web3, accounts, contract: instance }, this.runExample);
      setWeb3(web3);
      // setAccounts(accounts);
      setContract(instance);
      // await instance.methods.set(5).send({ from: accounts[0] });
      // const response = await contract.methods.get().call();
      // setStorageValue(response);

    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
   }, []);
   


   const handleGetSupply = async () => {
    const supply = await contract.methods.getTotalSupply().call();
    console.log("supply", supply)
   }
   
   return (
     <>
      <Flex bg='teal.500' p='3' mb='3'>
        <Box>
          :)
        </Box>
        <Spacer />
        <Box p='2'>
          <Heading size='md'>Image Labeling to Earn!</Heading>
        </Box>
        <Spacer />
        <Box>
          {
          active ?<Button onClick={disconnect}>Disconnect</Button> : <Button onClick={connect}>Connect</Button>
          }
        </Box>
      </Flex>

      {active ? 
      <>
      <Flex justify='center'>
        <Tabs variant='soft-rounded' colorScheme='green'>
        <Text m='3'>Hello, you connected with <b>{account}</b></Text> 

        <TabList>
          <Tab>I am Image Uploader!</Tab>
          <Tab>I am Image Labeler!</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Uploader 
              contract={contract}
              web3={web3}
              account={account}
            />
            <Button onClick={handleGetSupply}>Get supply</Button>
          </TabPanel>
          <TabPanel>
            <Labeler 
              contract={contract}
              web3={web3}
              account={account}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
      </Flex>
    </>
      : 
      <Flex justify='center'>
        <span>Please collect to wallet in Rospten Network</span>
        </Flex>
        
      }
    </>
   );
}

export default App;