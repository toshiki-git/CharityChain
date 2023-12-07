"use client";
import {
  Card,
  CardBody,
  Image,
  Button,
  Input,
  CardFooter,
} from "@nextui-org/react";
import React, { useState } from "react";
import donations from "@/app/components/Donation/Donations.json";
import { donate } from "@/SC/child";
import confetti from "canvas-confetti";

const userAddress = "0xe46efa37e07cdfb6293482069288eb55e35e6504";

interface DonationProps {
  id: string;
}

const Donation: React.FC<DonationProps> = ({ id }) => {
  const [isDonated, setIsDonated] = useState(false); // 送金完了の状態
  const handleConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      angle: 90,
      startVelocity: 60,
      gravity: 0.5,
      shapes: ["circle"], // 'circle' または 'square' が花弁の形に近い
      colors: ["#ff7eb9", "#ff65a3", "#7afcff", "#feff9c"], // 明るく柔らかい色彩
      zIndex: 10,
    });
  };

  const donation = donations.find((p) => p.id === parseInt(id));

  const [amount, setAmount] = React.useState(0); // 送金額の状態

  const handleDonationClick = async () => {
    try {
      donate(userAddress, amount); //ブロックチェーンに送金
      handleConfetti(); //祝福の花吹雪
      setIsDonated(true); // 送金完了の状態を更新
    } catch (error) {
      console.error("Error during transfer: ", error);
    } finally {
      setAmount(0);
    }
  };

  return (
    <div>
      <div className="text-center mt-4">
        {isDonated && <div className="text-3xl m-3">募金が完了しました！</div>}
        <div className="flex items-center justify-center">
          <Card shadow="sm" isPressable className="max-w-xs mt-2">
            <CardBody className="overflow-visible p-0">
              <Image
                shadow="sm"
                radius="lg"
                width="100%"
                alt={donation?.title}
                className="object-cover"
                src={donation?.img}
              />
            </CardBody>
            <CardFooter className="text-small justify-between">
              <b>{donation?.title}</b>
            </CardFooter>
          </Card>
        </div>

        <div className="text-2xl font-bold m-3">いくら送りますか？</div>
        <div className="flex justify-center">
          <Input
            type="number"
            value={amount.toString()} // Convert amount to string
            className="w-1/3 text-center"
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </div>
        <Button className="mt-3" color="primary" onClick={handleDonationClick}>
          募金する
        </Button>
      </div>
    </div>
  );
};

export default Donation;
