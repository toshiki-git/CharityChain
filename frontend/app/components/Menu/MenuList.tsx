"use client";

import React, { useEffect, useState } from "react";
import { Card, CardBody, CardFooter, Image, Link } from "@nextui-org/react";
import { useRouter } from "next/navigation";

const MenuPage = () => {
  const router = useRouter();
  const [balance, setBalance] = useState(0);

  // ページロード時にユーザの残高を取得
  useEffect(() => {
    const fetchBalance = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        console.error("No access token found");
        //router.push("/login"); // トークンがなければログインページへリダイレクト
        return;
      }

      try {
        const response = await fetch("http://localhost:8081/balance", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setBalance(data.balance);
        } else {
          console.error("Failed to fetch balance");
        }
      } catch (error) {
        console.error("Error fetching balance: ", error);
      }
    };

    fetchBalance();
  }, []);

  return (
    <div>
      <div className="text-lg font-bold justify-center items-center flex">
        Your Balance: {balance} BTC
      </div>
      <div className="flex justify-center items-center">
        <div className="flex flex-row justify-center items-center space-x-4">
          <div className="mt-4">
            <Link href="/products">
              <Card shadow="sm" isPressable className="max-w-xs mt-2 mr-4">
                <CardBody className="overflow-visible p-0">
                  <Image
                    shadow="sm"
                    radius="lg"
                    width="100%"
                    className="object-cover"
                    src="/shop.png"
                  />
                </CardBody>
                <CardFooter className="text-small justify-between">
                  <b>サービスを利用する</b>
                </CardFooter>
              </Card>
            </Link>
          </div>
          <div className="mt-4">
            <Link href="/select">
              <Card shadow="sm" isPressable className="max-w-xs mt-2">
                <CardBody className="overflow-visible p-0">
                  <Image
                    shadow="sm"
                    radius="lg"
                    width="100%"
                    className="object-cover"
                    src="/apply.png"
                  />
                </CardBody>
                <CardFooter className="text-small justify-between">
                  <b>寄付を受けとる申請</b>
                </CardFooter>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
