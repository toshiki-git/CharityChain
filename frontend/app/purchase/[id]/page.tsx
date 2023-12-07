import React from "react";
import Product from "@/app/components/Purchase/Product";
import Header from "@/app/components/Header/Header";

const Purchase = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <Header />
      <Product id={params.id} />
    </div>
  );
};

export default Purchase;
