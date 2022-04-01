import React, { useEffect, useState } from 'react';
import { Button, Input, NumberInput, NumberInputField, Text } from '@chakra-ui/react'
import { create } from 'ipfs-http-client'

const client = create('https://ipfs.infura.io:5001/api/v0')

function Uploader({web3, account, contract}) {
    const [fileUrl, setFileUrl] = useState(``)
    const [price, setPrice] = useState(`0.0005`)

    const submitToContract = async () => {
        await contract.methods.uploadRawImage(fileUrl).send({ from: account, value: web3.utils.toWei(price, "ether") });
        // await contract.methods.set(5).send({ from: account });
        const response = await contract.methods.getNum().call();
        console.log("res:", response)
        setFileUrl('')
    }

    const onUpload = async (e) => {
      const file = e.target.files[0];
      try {
        const added = await client.add(file)
        const url = `https://ipfs.infura.io/ipfs/${added.path}`;
        setFileUrl(url);
        
      } catch (err) {
        console.log('upload file err', err);
      }
      
    }
    const parse = (val) => val.replace('/ETH/i', '')

    const handlePrice = (e) => {
        const price = e.target.value
        console.log(typeof(price))
        setPrice(price);
    }
    const format = (val) => val + `ETH`
    return (
        <>
            <Text>1. Input reward you want to pay to labeler in ETH</Text>
            <Input  onChange={handlePrice}  value={price} />
            <Text>1. Upload your unlabeled image</Text>
            <input type="file" onChange={onUpload}/>
            {
                fileUrl && (
                    <>
                    <img src={fileUrl} width="700px"/>
                    <Button m='3' onClick={submitToContract}>Upload</Button>
                </>
                )
            }

        </>
    )
}
export default Uploader;
