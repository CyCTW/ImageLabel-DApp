import React, { useEffect, useState } from 'react';
import getWeb3 from "./getWeb3";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
function App() {
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
      const accounts = await web3.eth.getAccounts();
      console.log(web3)
      console.log(accounts)
      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      // this.setState({ web3, accounts, contract: instance }, this.runExample);
      setWeb3(web3);
      setAccounts(accounts);
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
      await contract.methods.set(5).send({ from: accounts[0] });
      const response = await contract.methods.get().call();
      setStorageValue(response);
   }

   return (
     <>
      <button onClick={handleClick}>Init contract</button>
      <p>storageValue: {storageValue}</p>
      <p>Your account: {accounts && accounts[0]}</p>

      
    </>
   );
}

export default App;