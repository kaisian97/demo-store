import ProductCard from "components/Product/ProductCard";
import { PRODUCTS } from "constant";
import { useStore } from "stores";
type Props = {};

const Home = (props: Props) => {
  useStore();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {PRODUCTS.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

Home.path = "/";

export default Home;
