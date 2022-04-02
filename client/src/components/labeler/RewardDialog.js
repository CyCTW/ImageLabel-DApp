import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogFooter,
  Button,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import React from "react";

function RewardDialog({
  rewardDialogOpen,
  setRewardDialogOpen,
  reward,
  setReward,
}) {
  return (
    <AlertDialog isOpen={rewardDialogOpen}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader>Congralulation!</AlertDialogHeader>

          <AlertDialogBody>
            You earned {reward} eth! Check your wallet!
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button
              onClick={() => {
                setRewardDialogOpen(false);
                setReward(0);
              }}
              colorScheme="green"
            >
              Close
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}

export default RewardDialog;
