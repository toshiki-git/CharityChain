"use client";
import { Card, CardBody, CardFooter, Image, Button } from "@nextui-org/react";
import React from "react";
import products from "@/app/components/Product/Products.json";
import { useRouter } from "next/navigation";

interface ProductProps {
  id: string;
}

const Product: React.FC<ProductProps> = ({ id }) => {
  const router = useRouter();
  const product = products.find((p) => p.id === parseInt(id));

  const handleDonationClick = () => {
    // 募金ページへリダイレクト、または募金処理をここで行う
    router.push("/donation");
  };

  const handleReturnClick = () => {
    // 募金ページへリダイレクト、または募金処理をここで行う
    router.push("/products");
  };

  // 商品が見つからない場合の処理
  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-center mt-4">
        <Card shadow="sm" isPressable className="max-w-xs mt-2">
          <CardBody className="overflow-visible p-0">
            <Image
              shadow="sm"
              radius="lg"
              width="100%"
              className="object-cover"
              src={product.img}
            />
          </CardBody>
          <CardFooter className="text-small justify-between">
            <b>{product.title}</b>
            <p className="text-default-500">{product.price}</p>
          </CardFooter>
        </Card>
      </div>

      <div className="text-center mt-4">
        <div className="text-2xl font-bold mb-3">
          ご購入ありがとうございました！
        </div>
        <div className="text-2xl mb-3">募金しますか？</div>
        <Button className="mr-3" color="primary" onClick={handleDonationClick}>
          募金する
        </Button>
        <Button color="primary" onClick={handleReturnClick}>
          戻る
        </Button>
      </div>
    </div>
  );
};

export default Product;
