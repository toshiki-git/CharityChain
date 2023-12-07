"use client";

import React from "react";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

const Apply = () => {
  const router = useRouter();

  const handleYES = () => {
    router.push("/select");
  };

  const handleNO = () => {
    router.push("/menu");
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="mt-4">
        <Button onClick={handleYES} color="primary">
          YES
        </Button>
      </div>
      <div className="mt-4">
        <Button onClick={handleNO} color="primary">
          NO
        </Button>
      </div>
    </div>
  );
};

export default Apply;
