import Image from "components/common/Image";
import ProductPage from "pages/Product";
import { Link } from "react-router-dom";
import { Product } from "types";
import { formatPrice } from "utils";

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link to={`${ProductPage.path}/${product.id}`}>
      <div className="bg-slate-100 rounded-lg text-center w-full p-4 h-[300px] hover:shadow transition">
        <div className="mix-blend-darken">
          <Image
            className="m-auto object-contain h-[200px] w-[200px]"
            alt={product.title}
            src={product.image}
          />
        </div>

        <div className="font-bold line-clamp-2">{product.title}</div>
        <div className="text-slate-500 text-sm">
          {formatPrice(product.price)}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
