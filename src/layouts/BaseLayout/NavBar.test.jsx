import { screen, fireEvent } from "@testing-library/react";
import App from "App";
import { PRODUCTS } from "constant";
import { renderWithRouter } from "../../setupTests";
import { renderHook } from "@testing-library/react-hooks";
import { useCartStore } from "stores";
import { act } from "react-dom/test-utils";

it("should navigate to cart page", () => {
  renderWithRouter(<App />);
  fireEvent.click(screen.getByTitle("Cart"));
  expect(screen.getByText("Back to store")).toBeInTheDocument();
});

it("should navigate to home page", () => {
  renderWithRouter(<App />);
  fireEvent.click(screen.getByTitle("Cart"));
  expect(screen.getByText("Back to store")).toBeInTheDocument();
  fireEvent.click(screen.getByText("Demo Store"));
  PRODUCTS.forEach((product) => {
    screen.getByText(product.title);
  });
});

it("should display correct items count in cart badge", () => {
  renderWithRouter(<App />);

  const { result } = renderHook(useCartStore);

  act(() => {
    result.current.updateCart(PRODUCTS[0]);
    result.current.updateCart(PRODUCTS[1]);
  });

  act(() => {
    result.current.updateCart(PRODUCTS[0]);
  });
  act(() => {
    result.current.deleteCart(PRODUCTS[1]);
  });

  act(() => {
    result.current.updateCart(PRODUCTS[2]);
  });

  expect(screen.getByTitle("Total items")).toHaveTextContent(3);
});

it("should display 9+ if more than 10 items in cart", () => {
  renderWithRouter(<App />);

  const { result } = renderHook(useCartStore);

  PRODUCTS.forEach((product) => {
    act(() => {
      result.current.updateCart(product);
    });
  });

  act(() => {
    result.current.updateCart(PRODUCTS[0]);
  });
  act(() => {
    result.current.deleteCart(PRODUCTS[1]);
  });

  act(() => {
    result.current.updateCart(PRODUCTS[2]);
  });

  expect(screen.getByTitle("Total items")).toHaveTextContent("9+");
});
