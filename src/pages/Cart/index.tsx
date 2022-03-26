import { useMemo } from "react";
import { useCartStore, useStore } from "stores";
import { formatPrice } from "utils";
import Button from "components/common/Button";
import { useNavigate } from "react-router-dom";
import Checkout from "pages/Checkout";
import CartItem from "components/Cart/CartItem";
import EmptyCart from "components/Cart/EmptyCart";

type Props = {};

const Cart = (props: Props) => {
  useStore();
  const navigate = useNavigate();
  const cart = useCartStore((state) => state.cart);

  const totalCartPrice = useMemo(() => {
    return cart.reduce((total, item) => {
      const itemPrice = parseFloat(item.price);
      total += itemPrice * item.quantity;
      return total;
    }, 0);
  }, [cart]);

  return (
    <div>
      {!!cart.length ? (
        <>
          <h1 className="text-xl tracking-wider font-bold text-center mb-8">
            Cart
          </h1>
          <div className="md:mx-10">
            <div className="flex-1 md:ml-8">
              <div>
                {cart.map((item, i) => {
                  const isFirstItem = i === 0;
                  return (
                    <CartItem
                      key={item.id}
                      className={isFirstItem ? "border-t" : ""}
                      item={item}
                    />
                  );
                })}
              </div>
              <div className="my-4 flex flex-col md:flex-row md:space-x-4 md:space-y-0 items-end space-y-4 md:items-center">
                <div className="ml-auto font-semibold">
                  Total: {formatPrice(totalCartPrice)}
                </div>
                <Button
                  onClick={() => navigate(Checkout.path)}
                  size="lg"
                  className="w-60"
                >
                  Continue to checkout
                </Button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <EmptyCart />
      )}
    </div>
  );
};

Cart.path = "/cart";

export default Cart;
