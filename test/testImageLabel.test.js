const ImageLabel = artifacts.require("ImageLabel")

contract("ImageLabel", (accounts) => {
    let contract;
    const img_url = 'https://test';
    const price = "0.005";
    before(async () => {
        contract = await ImageLabel.deployed();
    });

    describe("upload image", async () => {
        before("", async () => {
            await contract.uploadRawImage(img_url, {from: accounts[0], value: web3.utils.toWei(price, "ether")})
        })

        it("check num of image", async () => {
            const num_img = await contract.getNum();
            assert.equal(num_img, 1, "Img num not correct");
        })

        it("check reward", async () => {
            let reward = await contract.getImageReward(img_url);
            reward = parseInt(reward);
            // console.log('reward', reward)
            assert.equal(reward, web3.utils.toWei(price, "ether"), "reward not equal");
        })
    })
})