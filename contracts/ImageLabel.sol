pragma solidity ^0.6.0;

contract ImageLabel {
    struct RawImage {
        address uploader;
        uint reward;
        uint idx;
    }
    event Labeled(address indexed sender, string image_cid);

    uint num_of_imgs ;
    mapping(string => RawImage) imgs;
    mapping(uint => string) indexs;

    constructor() public {
        num_of_imgs = 0;
    }
    function uploadRawImage(string memory image_cid) public payable  {
        uint reward = msg.value;        
        // Store sender information.
        imgs[image_cid] = RawImage(msg.sender, reward, num_of_imgs );
        indexs[num_of_imgs] = image_cid;
        num_of_imgs += 1;
    }

    function getNum() public view returns (uint) {
        return num_of_imgs;
    }

    function getRandomImage() public view returns (string memory) {
        // return a random raw image
        require(num_of_imgs > 0, "No image in contract");
        return indexs[0];
    }

    function sendReward(string memory image_cid) public {
        uint reward = imgs[image_cid].reward;
        address payable receiver = payable(msg.sender);
        receiver.transfer(reward);
        // require(success, "Failed to send ether.");
    }

    function uploadLabeledImage(string memory old_image_cid, string memory new_image_cid) public {

        // emit event
        address uploader_addr = imgs[old_image_cid].uploader;
        emit Labeled(uploader_addr, new_image_cid);
        // tmp directly send reward to solver.
        sendReward(old_image_cid);
        // clear imgs data
        uint img_idx = imgs[old_image_cid].idx;

        delete imgs[old_image_cid];
        delete indexs[img_idx];
        num_of_imgs -= 1;
    }

    function checkCorrectness() public {
        // TODO: uploader check image correctness
    }
}