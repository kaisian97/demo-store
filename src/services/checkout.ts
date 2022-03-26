import toast from "react-hot-toast";
import { useStore } from "stores";

export const checkout = async (payload: { amount: string }) => {
  const { store } = useStore.getState();

  const formattedPayload = {
    ...payload,
    amount: parseFloat(payload?.amount).toFixed(2),
    store_id: store.value,
    redirect_url: "http://localhost:3000/checkout/success",
  };

  try {
    const res = await fetch(
      "https://api.uat.ablr.com/api/v2/public/merchant/checkout/",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${store.secret}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedPayload),
      }
    );
    const resData = await res.json();
    return resData.data;
  } catch (error) {
    toast.error("Something went wrong! Unable to checkout.");
    return false;
  }
};
