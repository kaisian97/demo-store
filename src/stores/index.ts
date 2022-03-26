import { STORES } from "constant";
import { Product, Store } from "./../types/index";
import create from "zustand";
import { combine, persist } from "zustand/middleware";
import produce from "immer";
import toast from "react-hot-toast";

export const useStore = create(
  combine({ store: STORES[0] }, (set) => ({
    setStore: (store: Store) => set(() => ({ store })),
  }))
);

export const useCartStore = create(
  persist(
    combine({ cart: [] as (Product & { quantity: number })[] }, (set) => ({
      updateCart: (product: Product) =>
        set((state) => {
          const newCart = produce(state.cart, (draft) => {
            const prd = draft.find((item) => item.id === product.id);
            if (prd) {
              prd.quantity += 1;
            } else {
              draft.push({ ...product, quantity: 1 });
            }
          });
          toast.success(`${product.title} was added to cart.`);
          return {
            cart: newCart,
          };
        }),
      deleteCart: (product: Product) =>
        set((state) => {
          const newCart = state.cart.filter((item) => item.id !== product.id);
          toast.success(`${product.title} was removed from cart.`);

          return {
            cart: newCart,
          };
        }),
      clearCart: () =>
        set(() => {
          return {
            cart: [],
          };
        }),
    })),
    {
      name: "demo-ablr",
      getStorage: () => localStorage,
    }
  )
);
