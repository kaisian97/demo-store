import { STORES } from "constant";
import { useStore } from "stores";

export const formatPrice = (price: string | number) => {
  const { currency, rate } = useStore.getState().store || STORES[0];
  let formattedPrice = typeof price !== "number" ? (price as any) * 1 : price;
  formattedPrice = formattedPrice * rate;

  return formattedPrice
    .toLocaleString(undefined, {
      style: "currency",
      currency,
      // currencyDisplay: "narrowSymbol",
    })
    .replace("$", "SGD ");
};
