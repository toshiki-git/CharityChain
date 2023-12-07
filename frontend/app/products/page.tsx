import ProductList from "@/app/components/Product/ProductList";
import Header from "@/app/components/Header/Header";

const Products = () => {
  return (
    <div>
      <Header />
      <div className="text-3xl m-4 font-semibold">商品一覧</div>
      <ProductList />
    </div>
  );
};

export default Products;
