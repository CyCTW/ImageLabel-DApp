import React, { useEffect, useState } from 'react';
import getWeb3 from "./getWeb3";
// import SimpleStorageContract from "./contracts/SimpleStorage.json";
import ImageLabelContract from "./contracts/ImageLabel.json";
import { useWeb3React } from "@web3-react/core"
import { injected } from "./components/wallet/Connectors"


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
   
   const handleClick = async () => {

      await contract.methods.uploadRawImage("testaa").send({ from: account });
      // await contract.methods.set(5).send({ from: account });
      const response = await contract.methods.getNum().call();
      console.log("res:", response)

      setStorageValue(response);
   }

   return (
     <>
      <button onClick={handleClick}>Init contract</button>
      <button onClick={connect}>Connect</button>
      <button onClick={disconnect}>Disconnect</button>
      <p>storageValue: {storageValue}</p>
      {active ? <span>Connected with <b>{account}</b></span> : <span>Not connected</span>}
      {/* <p>Your account: {accounts && accounts[0]}</p> */}

      
    </>
   );
}

export default App;