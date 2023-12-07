"use client";
import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  useDisclosure,
} from "@nextui-org/react";
import ProductModal from "./ProductModal";
import list from "./Products.json";

interface Product {
  id: number;
  title: string;
  img: string;
  price: string;
}

const ProductList = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleCardClick = (product: Product) => {
    setSelectedProduct(product);
    onOpen();
  };

  return (
    <div className="m-4">
      <div className="gap-6 grid grid-cols-2 sm:grid-cols-4 mt-4">
        {list.map((item) => (
          <Card
            shadow="sm"
            key={item.id}
            isPressable
            onPress={() => handleCardClick(item)}
          >
            <CardBody className="overflow-visible p-0">
              <Image
                shadow="sm"
                radius="lg"
                width="100%"
                alt={item.title}
                className="w-full object-cover"
                src={item.img}
              />
            </CardBody>
            <CardFooter className="text-large justify-between">
              <b>{item.title}</b>
              <p className="text-default-500">{item.price}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
      {selectedProduct && (
        <ProductModal
          isOpen={isOpen}
          onOpenChange={onClose}
          product={selectedProduct}
        />
      )}
    </div>
  );
};

export default ProductList;
