import { StarIcon } from "@heroicons/react/solid";
import Button from "components/common/Button";
import Image from "components/common/Image";
import { PRODUCTS } from "constant";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { checkout } from "services/checkout";
import { useCartStore, useStore } from "stores";
import { Product } from "types";
import { formatPrice } from "utils";
import shallow from "zustand/shallow";

type ProductProps = {};

const ProductPage = (props: ProductProps) => {
  useStore();

  const { cart, updateCart } = useCartStore(
    (state) => ({ cart: state.cart, updateCart: state.updateCart }),
    shallow
  );

  const { id } = useParams();

  const product = useMemo(
    () =>
      PRODUCTS.find((prod) => prod.id === parseInt(id as string)) ||
      ({} as Product),
    [id]
  );

  const cartItem = useMemo(
    () => cart.find((item) => item.id === product.id),
    [cart, product]
  );

  const handleCheckout = async () => {
    const data = await checkout({
      amount: `${
        cartItem
          ? parseFloat(cartItem.price) * cartItem.quantity
          : parseFloat(product?.price)
      }`,
    });
    if (data) window.location.href = data.checkout_url;
  };

  return (
    <div className="flex flex-col h-full md:space-x-4 md:flex-row-reverse">
      <div className="md:flex-1 flex justify-center">
        <Image
          className="object-contain m-auto max-h-[400px] md:max-h-[500px]"
          src={product.image}
          alt={product.title}
        />
      </div>

      <div className="flex flex-col space-y-2 mt-4 md:flex-1">
        <div className="font-bold text-xl">{product.title}</div>
        <div className="flex">
          {Array.from({ length: product.stars }).map((_, i) => (
            <StarIcon key={i} className="text-yellow-500 w-6 h-6" />
          ))}
        </div>
        <div className="text-slate-500 text-sm">
          {formatPrice(product.price)}
        </div>
        <div className="text-sm">{product.description}</div>
        <div className="flex space-x-8">
          <Button className="mt-4" onClick={() => updateCart(product)}>
            Add to cart {cartItem?.quantity ? `(${cartItem.quantity})` : null}
          </Button>
          <Button className="mt-4" variant="ghost" onClick={handleCheckout}>
            Checkout now
          </Button>
        </div>
      </div>
    </div>
  );
};

ProductPage.path = "/product";

export default ProductPage;
