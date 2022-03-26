import Button from "components/common/Button";
import { useQuery } from "hooks/useQuery";
import Home from "pages/Home";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "stores";
import Checkout from ".";

type Props = {};

const CheckoutSuccess = (props: Props) => {
  const navigate = useNavigate();
  const qs = useQuery();
  const clearCart = useCartStore((state) => state.clearCart);
  useEffect(() => {
    if (
      !qs.get("checkout_id") ||
      !qs.get("order_state") ||
      !qs.get("order_code")
    )
      return;
    clearCart();
  }, [qs, clearCart]);
  return (
    <div className="text-center mx-16 my-8">
      <div className="font-medium mb-4">Payment Successful.</div>
      <Button className="w-full" onClick={() => navigate(Home.path)}>
        Return to home page
      </Button>
    </div>
  );
};

CheckoutSuccess.path = `${Checkout.path}/success`;

export default CheckoutSuccess;
