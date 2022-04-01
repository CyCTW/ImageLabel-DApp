import { AlertDialog, AlertDialogBody,AlertDialogHeader, AlertDialogContent, AlertDialogFooter, Button, Input, Text, useDisclosure, AlertDialogOverlay } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

function Labeler({web3, account, contract}) {
    const [fileUrl, setFileUrl] = useState("")
    const [imgClass, setImgClass] = useState("")
    const [reward, setReward] = useState(0)
    const [isImageExist, setIsImageExist] = useState(true)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    useEffect(async () => {
        if (fileUrl !== "") {  
            let res = await contract.methods.getImageReward(fileUrl).call();
            res = web3.utils.fromWei(res, 'ether');
            console.log("reward: ", res);
            setReward(res);
        }
    }, [fileUrl])

    const handleGetImage = async () => {
        try {
            const url = await contract.methods.getRandomImage().call();
            console.log("url: ", url);
            setFileUrl(url)
        } catch (err) {
            console.log(err);
            console.log("hihi")
            onOpen();
        }
        
    }

    const handleChange = async (e) => {
        const imgcls = e.target.value;
        setImgClass(imgcls);
    }

    const submitToContract = async() => {
        try {
            await contract.methods.uploadLabeledImage(fileUrl, imgClass).send({ from: account });
            console.log("success")
            setReward(0)
            setFileUrl('')
            setImgClass('')
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <Button onClick={handleGetImage}>Get image</Button>
            {
                fileUrl && (<img src={fileUrl} width="500px"/>)
            }
            <Text m='3'>1. Answer the Class of image to earn money!</Text>
            <Text>Earn Reward: {reward} ether</Text>
            <Input onChange={handleChange} value={imgClass}/>
            <Button onClick={submitToContract}>Submit</Button>
            <AlertDialog
                isOpen={isOpen}
                onClose={onClose}
                leastDestructiveRef={cancelRef}
            >
                <AlertDialogOverlay>

                <AlertDialogContent>
                    <AlertDialogHeader>
                        Warning
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        Currently there is no image in contract.
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose} colorScheme='red'>
                            Close
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
                </AlertDialogOverlay>

            </AlertDialog>

        </>
    )
}
export default Labeler;
