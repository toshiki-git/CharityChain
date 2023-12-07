import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Image,
  Link,
} from "@nextui-org/react";

interface Props {
  isOpen: boolean;
  onOpenChange: () => void;
  product: { id: number; title: string; img: string; price: string };
}

const ProductModal: React.FC<Props> = ({ isOpen, onOpenChange, product }) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      backdrop="blur"
      size="lg"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 text-3xl font-bold">
          {product.title}
        </ModalHeader>
        <ModalBody>
          <Image
            shadow="sm"
            radius="lg"
            width="100%"
            alt={product.title}
            className="w-full object-cover"
            src={product.img}
          />
        </ModalBody>
        <ModalFooter>
          <p className="text-default-500">{product.price}</p>
          <Link href={`purchase/${product.id}`}>Purchase</Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ProductModal;
