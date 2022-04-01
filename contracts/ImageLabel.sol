pragma solidity ^0.6.0;

contract ImageLabel {
    struct RawImage {
        address uploader;
        uint reward;
        uint idx;
    }
    event Labeled(address indexed sender, string image_url, string classname);

    uint num_of_imgs;
    uint totalSupply; 
    mapping(string => RawImage) imgs;
    mapping(uint => string) indexs;

    constructor() public {
        num_of_imgs = 0;
        totalSupply = 0;
    }
    function uploadRawImage(string memory image_url) public payable  {
        uint reward = msg.value;        
        require(reward > 0, "Reward can't be zero");
        // Store sender information.
        imgs[image_url] = RawImage(msg.sender, reward, num_of_imgs );
        indexs[num_of_imgs] = image_url;
        totalSupply += reward;
        num_of_imgs += 1;
    }

    function getNum() public view returns (uint) {
        return num_of_imgs;
    }

    function getTotalSupply() public view returns (uint) {
        return totalSupply;
    }

    function getRandomImage() public view returns (string memory) {
        // return a random raw image
        require(num_of_imgs > 0, "No image in contract");
        uint randomidx = uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp)));
        randomidx %= num_of_imgs;
        return indexs[randomidx];
    }

    function getImageReward(string memory image_url) public view returns (uint) {
        uint r = imgs[image_url].reward;
        return r;
    }

    function sendReward(string memory image_url) public {
        uint reward = imgs[image_url].reward;
        bool success = payable(msg.sender).send(reward);
        require(success, "Failed to send ether.");
        totalSupply -= reward;
    }

    function uploadLabeledImage(string memory image_url, string memory classname) public {
        // ensure the image still exist
        require(imgs[image_url].reward > 0, "This image is not exist!");

        // emit event
        address uploader_addr = imgs[image_url].uploader;
        emit Labeled(uploader_addr, image_url, classname);
        // tmp directly send reward to solver.
        sendReward(image_url);
        // clear imgs data
        uint img_idx = imgs[image_url].idx;

        delete imgs[image_url];
        delete indexs[img_idx];
        num_of_imgs -= 1;
    }

    function checkCorrectness() public {
        // TODO: uploader check image correctness
    }

}