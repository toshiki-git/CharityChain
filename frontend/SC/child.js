import Web3 from "web3";
const web3 = new Web3("http://127.0.0.1:7546");

const contractABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address payable[]",
        name: "recipients",
        type: "address[]",
      },
    ],
    name: "distributeDonations",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "donate",
    outputs: [],
    stateMutability: "payable",
    type: "function",
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
const contractAddress = "0xA5466252a802f6F00CcA5967B3b6C0C52afb9E47";

const contract = new web3.eth.Contract(contractABI, contractAddress);

export const donate = (fromAddress, amount) => {
  const donationAmount = web3.utils.toWei(amount.toString(), "ether");

  return contract.methods.donate().send({
    from: fromAddress,
    value: donationAmount,
    gas: "100000",
  });
};
