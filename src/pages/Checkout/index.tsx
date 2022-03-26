import EmptyCart from "components/Cart/EmptyCart";
import Button from "components/common/Button";
import Image from "components/common/Image";
import RadioGroup from "components/common/RadioGroup";
import { useMemo } from "react";
import { checkout } from "services/checkout";
import { useCartStore, useStore } from "stores";
import { formatPrice } from "utils";
import shallow from "zustand/shallow";

type Props = {};

const Checkout = (props: Props) => {
  useStore();
  const { cart } = useCartStore(
    (state) => ({
      cart: state.cart,
    }),
    shallow
  );

  const totalCartPrice = useMemo(() => {
    return cart.reduce((total, item) => {
      const itemPrice = parseFloat(item.price);
      total += itemPrice * item.quantity;
      return total;
    }, 0);
  }, [cart]);

  const handleAblrCheckout = async () => {
    const data = await checkout({
      amount: totalCartPrice.toString(),
    });
    if (data) window.location.href = data.checkout_url;
  };

  return !!cart.length ? (
    <div>
      <h1 className="text-xl tracking-wider font-bold text-center mb-8">
        Checkout
      </h1>
      <div className="flex flex-col space-y-4 md:flex-row-reverse md:space-y-0">
        <div className="flex-1 md:ml-8">
          <div className="mb-4 text-sm uppercase tracking-wide text-slate-400 font-semibold ">
            Order Summary
          </div>
          <div>
            {cart.map((item, i) => {
              const isFirstItem = i === 0;
              return (
                <div
                  key={item.id}
                  className={`flex justify-between items-center space-x-4 py-2 border-b ${
                    isFirstItem ? "border-t" : ""
                  }`}
                >
                  <div className="flex justify-between items-center space-x-4">
                    <div className="flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.title}
                        className="w-10 h-10"
                      />
                    </div>
                    <div className="font-semibold text-sm md:text-base">
                      {item.title} ({item.quantity})
                    </div>
                  </div>
                  <div className="text-slate-500 text-sm whitespace-nowrap">
                    {formatPrice(parseFloat(item.price) * item.quantity)}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="my-4 flex">
            <div className="ml-auto font-semibold">
              Total: {formatPrice(totalCartPrice)}
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div className="mb-4 text-sm uppercase tracking-wide text-slate-400 font-semibold ">
            Select your payment method
          </div>
          <div className="">
            <RadioGroup
              options={[
                {
                  label: (checked) => {
                    return (
                      <div className="rounded-xl border p-4 cursor-pointer">
                        <div className="mb-2 flex space-x-4 items-center">
                          <div
                            className={`w-4 h-4 rounded-full ${
                              checked ? "bg-blue-500" : "bg-white border shadow"
                            } flex justify-center items-center`}
                          >
                            <div className="w-2 h-2 bg-white rounded-full" />
                          </div>
                          <div>
                            <div className="font-semibold">Ablr</div>
                            <div className="text-xs text-slate-600">
                              Buy now, pay later. No late fees. No surprises.
                            </div>
                          </div>
                        </div>
                        {checked && (
                          <Button
                            className="mb-2 w-full"
                            onClick={handleAblrCheckout}
                          >
                            Continue to Ablr
                          </Button>
                        )}
                        <div className="text-xs text-slate-600">
                          By clicking "Continue to Ablr", you will be asked to
                          enter your mobile number to get started. A credit
                          check might be performed.
                        </div>
                      </div>
                    );
                  },
                  value: "ablr",
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <EmptyCart />
  );
};

Checkout.path = "/checkout";

export default Checkout;
