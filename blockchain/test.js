const Web3 = require("web3");
const web3 = new Web3("http://127.0.0.1:7546");

const contractABI = [
  {
    inputs: [],
    name: "donate",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address payable",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "sendDonation",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "getBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalDonations",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
const contractAddress = "0x0562D0EdfFbc5662144b0B98c042c160C035a6f2";

const contract = new web3.eth.Contract(contractABI, contractAddress);

const fromAddress = "0xe46efa37e07cdfb6293482069288eb55e35e6504"; // トランザクションを送信するアカウントのアドレス

const donationAmount = web3.utils.toWei("1", "ether"); // 例: 1 ETHを寄付する

/* contract.methods
  .donate()
  .send({
    from: fromAddress,
    value: donationAmount,
    gas: 100000,
  })
  .then((receipt) => {
    console.log("Donation successful:", receipt);
  })
  .catch((err) => {
    console.error("Donation failed:", err);
  }); */

contract.methods
  .getBalance()
  .call()
  .then((result) => {
    console.log(result);
  });
