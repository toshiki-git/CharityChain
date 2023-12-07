// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract ChildDonate {
    // 寄付の合計額を保持する変数
    uint256 public totalDonations;

    // コンストラクタ
    constructor() {
        totalDonations = 0;
    }

    // 寄付を受け入れるための関数
    function donate() public payable {
        require(msg.value > 0, "Donation must be more than 0");

        // 寄付の合計額を更新
        totalDonations += msg.value;
    }

    // 指定されたアドレスに寄付を送信する関数
    function sendDonation(address payable recipient, uint256 amount) public {
        require(address(this).balance >= amount, "Insufficient balance in contract");
        (bool sent,) = recipient.call{value: amount}("");
        require(sent, "Failed to send Ether");
    }

    // コントラクトの残高を確認するための関数
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
