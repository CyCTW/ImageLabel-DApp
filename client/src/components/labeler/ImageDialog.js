import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogFooter,
  Button,
  Input,
  Text,
  useDisclosure,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

function ImageDialog({ alertDialogOpen, setAlertDialogOpen }) {
  return (
    <AlertDialog isOpen={alertDialogOpen}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader>Oops</AlertDialogHeader>

          <AlertDialogBody>
            Currently there is no image in contract.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button onClick={() => setAlertDialogOpen(false)} colorScheme="red">
              Close
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}

export default ImageDialog;
