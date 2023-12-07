import DonationList from "@/app/components/Donation/DonationList";
import Header from "@/app/components/Header/Header";

const Products = () => {
  return (
    <div>
      <Header />
      <div className="text-3xl m-4 font-semibold">どのジャンルに送りますか？</div>
      <DonationList />
    </div>
  );
};

export default Products;
