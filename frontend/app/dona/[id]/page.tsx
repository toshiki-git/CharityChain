import React from "react";
import DonationComponent from "@/app/components/Dona/Donation"; // 名前を変更
import Header from "@/app/components/Header/Header";

const DonationPage = ({ params }: { params: { id: string } }) => { // 名前を変更
  return (
    <div>
      <Header />
      <DonationComponent id={params.id} />
    </div>
  );
};

export default DonationPage; 
