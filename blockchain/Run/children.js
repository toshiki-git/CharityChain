// contractFunctions.js
const Web3 = require("web3");
const fs = require("fs");

const web3 = new Web3("http://127.0.0.1:7546");

const contractABI = JSON.parse(fs.readFileSync("../ABI/child.json", "utf8"));
const contractAddress = "0xA5466252a802f6F00CcA5967B3b6C0C52afb9E47";

const contract = new web3.eth.Contract(contractABI, contractAddress);

const donate = (fromAddress, amount) => {
  const donationAmount = web3.utils.toWei(amount.toString(), "ether");

  return contract.methods.donate().send({
    from: fromAddress,
    value: donationAmount,
    gas: 100000,
  });
};

const getBalance = async () => {
  const balance = await contract.methods.getBalance().call();
  console.log(`Balance: ${balance}`);
};

const distribute = async (Address_list, fromAddress) => {
  await contract.methods.distributeDonations(Address_list).send({
    from: fromAddress,
    gas: 1000000,
  });
};

Address_list = [
  "0xe46efa37e07cdfb6293482069288eb55e35e6504",
  "0x9c569cb60ad050e2a17ba2d64b5bcf1dcd22af47",
];

distribute(Address_list, "0xe46efa37e07cdfb6293482069288eb55e35e6504");

getBalance();

module.exports = { donate, getBalance, distribute };
