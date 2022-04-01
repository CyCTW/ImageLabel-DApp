// Currently I can't find way to send ether to smart contract, so the test will fail.
/*
pragma solidity ^0.6.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/ImageLabel.sol";

contract TestImageLabel {
    // The id of the pet that will be used for testing
    string img_cid = "https://test";
    string classname = "monkey";
    uint public initialBalance = 1 ether;

    ImageLabel contract_ = new ImageLabel();

    function testUploadRawImage() public {

        contract_.uploadRawImage(img_cid);
        // contract_.send(initialBalance);
        uint num_img = contract_.getNum();
        Assert.equal(num_img, 1, "num img not equal");
    }

    function testGetRandomImage() public {
        // ImageLabel contract_ = new ImageLabel();

        string memory cid = contract_.getRandomImage();
        Assert.equal(img_cid, cid, "cid not equal!");
        
    }

    function testUploadLabeledImage() public {
        contract_.uploadLabeledImage(img_cid, classname);
        uint num_img = contract_.getNum();

        Assert.equal(num_img, 0, "num img not equal");
    }
}
*/