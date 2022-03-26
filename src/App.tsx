import { STORES } from "constant";
import BaseLayout from "layouts/BaseLayout";
import Cart from "pages/Cart";
import Checkout from "pages/Checkout";
import CheckoutSuccess from "pages/Checkout/Success";
import Home from "pages/Home";
import Product from "pages/Product";
import { useCallback, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { getCountryByIp } from "services/getCountryByIp";
import { useStore } from "stores";

function App() {
  const setStore = useStore((state) => state.setStore);

  const getCurrentUserCountry = useCallback(async () => {
    const data = await getCountryByIp();
    if (!data) return;

    const currentStore = STORES.find(
      (store) => store.code === data.countryCode
    );
    if (currentStore) {
      setStore(currentStore);
    }
  }, [setStore]);

  useEffect(() => {
    getCurrentUserCountry();
  }, [getCurrentUserCountry]);

  return (
    <BaseLayout>
      <Routes>
        <Route path={Home.path} element={<Home />} />
        <Route path={`${Product.path}/:id`} element={<Product />} />
        <Route path={Cart.path} element={<Cart />} />
        <Route path={Checkout.path} element={<Checkout />} />
        <Route path={CheckoutSuccess.path} element={<CheckoutSuccess />} />
      </Routes>
    </BaseLayout>
  );
}

export default App;
