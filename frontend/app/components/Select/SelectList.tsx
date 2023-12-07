"use client";
import React, { useState } from "react";
import { Button, Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import list from "@/app/components/Donation/Donations.json";

const SelectList = () => {
  const [selected, setSelected] = useState<number>(-1);

  const handleCardClick = (index: number) => {
    setSelected(index);
  };

  const handleRegister = () => {
    setSelected(-1);
    alert("申請が完了しました");
  };

  return (
    <div className="m-5">
      <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
        {list.map((item, index) => (
          <Card
            shadow="sm"
            key={index}
            isPressable
            className={`max-w-xs mt-2 ${
              index === selected ? "border-4 border-blue-500" : ""
            }`} // 条件に応じて外枠スタイルを適用
            onClick={() => handleCardClick(index)} // カードクリック時のハンドラ
          >
            <CardBody className="overflow-visible p-0">
              <Image
                shadow="sm"
                radius="lg"
                width="100%"
                alt={item.title}
                className="object-cover"
                src={item.img}
              />
            </CardBody>
            <CardFooter className="text-small justify-between">
              <b>{item.title}</b>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="flex justify-center">
        <Button className="mt-3" color="primary" onPress={handleRegister}>
          Register
        </Button>
      </div>
    </div>
  );
};

export default SelectList;
