const ImageLabel = artifacts.require("ImageLabel")

contract("ImageLabel", (accounts) => {
    let contract;
    before(async () => {
        contract = await ImageLabel.deployed();
    });

    describe("upload image", async () => {
        // before("")
    })
})