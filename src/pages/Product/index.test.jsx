import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import { act } from "react-dom/test-utils";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { useStore } from "stores";
import ProductPage from ".";
import { PRODUCTS, STORES } from "constant";
import { textContentMatcher } from "setupTests";
import { formatPrice } from "utils";

describe("product details page", () => {
  const currentProduct = PRODUCTS[0];

  beforeEach(() => {
    const location = window.location;
    delete global.window.location;
    global.window.location = Object.assign({}, location);
  });

  const renderComponent = ({ productId }) =>
    render(
      <MemoryRouter initialEntries={[`/product/${productId}`]}>
        <Routes>
          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>
      </MemoryRouter>
    );

  test("show product details correctly", () => {
    renderComponent({ productId: currentProduct.id });

    screen.getByText(currentProduct.title);
    screen.getByText(currentProduct.description);
  });

  test("show product price in SGD correctly", async () => {
    renderComponent({ productId: currentProduct.id });

    const { result } = renderHook(useStore);

    act(() => {
      result.current.setStore(STORES[1]);
    });

    await screen.findByText(
      textContentMatcher(formatPrice(currentProduct.price))
    );
  });

  test("show product price in MYR correctly", async () => {
    renderComponent({ productId: currentProduct.id });

    const { result } = renderHook(useStore);

    act(() => {
      result.current.setStore(STORES[0]);
    });

    await screen.findByText(
      textContentMatcher(formatPrice(currentProduct.price))
    );
  });

  test("show added item quantity beside add to cart button", async () => {
    const productId = currentProduct.id;
    renderComponent({ productId });

    const addToCartBtn = screen.getByText("Add to cart", { exact: false });
    fireEvent.click(addToCartBtn);
    fireEvent.click(addToCartBtn);

    screen.getByText(`Add to cart (2)`);
  });

  test("call checkout api and go to checkout url", async () => {
    renderComponent({ productId: currentProduct.id });
    const checkoutBtn = screen.getByText("Checkout now");
    fireEvent.click(checkoutBtn);

    await waitFor(() => {
      expect(window.location.href).toContain("backend.uat.ablr.com");
    });
  });
});
