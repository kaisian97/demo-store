import { render, screen, fireEvent } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import { PRODUCTS, STORES } from "constant";
import { act } from "react-dom/test-utils";
import { useCartStore, useStore } from "stores";
import { formatPrice } from "utils";
import Cart from ".";
import { textContentMatcher, renderWithRouter } from "setupTests";

import "@testing-library/jest-dom";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

test("display added cart item in cart page", () => {
  render(<Cart />);
  const { result } = renderHook(useCartStore);
  act(() => {
    result.current.updateCart(PRODUCTS[0]);
  });
  screen.getByText(PRODUCTS[0].title, { exact: false });
});

test("MYR price in cart page display correctly", () => {
  render(<Cart />);
  const { result } = renderHook(useCartStore);

  const price = "123";
  act(() => {
    result.current.updateCart({ ...PRODUCTS[0], price });
  });

  screen.getAllByText(`MYR ${parseFloat(price) * STORES[0].rate}`, {
    exact: false,
  });
});

test("SGD price in cart page display correctly", () => {
  render(<Cart />);
  const { result } = renderHook(useCartStore);
  const { result: storeResult } = renderHook(useStore);

  const price = "123";
  act(() => {
    result.current.updateCart({ ...PRODUCTS[0], price });
  });
  act(() => {
    storeResult.current.setStore(STORES[1]);
  });

  screen.getAllByText(`SGD ${parseFloat(price) * STORES[1].rate}`, {
    exact: false,
  });
});

test("display total items price MYR in cart correctly", () => {
  render(<Cart />);
  const { result } = renderHook(useCartStore);
  const { result: storeResult } = renderHook(useStore);

  const price = "123";
  act(() => {
    result.current.updateCart({ ...PRODUCTS[0], price });
  });
  act(() => {
    result.current.updateCart({ ...PRODUCTS[0], price });
  });
  act(() => {
    storeResult.current.setStore(STORES[0]);
  });

  const totalItemPrice = result.current.cart.reduce((total, item) => {
    total += parseFloat(item.price) * item.quantity;
    return total;
  }, 0);

  screen.getByText(`Total: MYR ${totalItemPrice * STORES[0].rate}`, {
    exact: false,
  });
});

test("display total items price SGD in cart correctly", () => {
  render(<Cart />);
  const { result } = renderHook(useCartStore);
  const { result: storeResult } = renderHook(useStore);

  const price = "123";
  act(() => {
    result.current.updateCart({ ...PRODUCTS[0], price });
  });
  act(() => {
    result.current.updateCart({ ...PRODUCTS[0], price });
  });
  act(() => {
    storeResult.current.setStore(STORES[1]);
  });

  const totalItemPrice = result.current.cart.reduce((total, item) => {
    total += parseFloat(item.price) * item.quantity;
    return total;
  }, 0);

  screen.getByText(`Total: SGD ${totalItemPrice * STORES[1].rate}`, {
    exact: false,
  });
});

test("display no item if cart is empty", () => {
  render(<Cart />);
  screen.getByText("There is no item in cart.");
  expect(() => screen.getByText("Cart")).toThrow();
});

test("display cart content if cart is not empty", () => {
  render(<Cart />);

  const { result } = renderHook(useCartStore);

  act(() => {
    result.current.updateCart(PRODUCTS[0]);
  });

  screen.getByText("Cart");
  expect(() => screen.getByText("There is no item in cart.")).toThrow();
});

test("calculate item price correctly based on the quantity", async () => {
  render(<Cart />);

  const { result } = renderHook(useCartStore);

  act(() => {
    result.current.updateCart(PRODUCTS[0]);
  });
  act(() => {
    result.current.updateCart(PRODUCTS[0]);
  });
  act(() => {
    result.current.updateCart(PRODUCTS[1]);
  });
  act(() => {
    result.current.updateCart(PRODUCTS[2]);
  });
  act(() => {
    result.current.updateCart(PRODUCTS[0]);
  });

  let prod0TotalPrice = 0;
  let prod1TotalPrice = 0;
  let prod2TotalPrice = 0;
  result.current.cart.forEach((item) => {
    switch (item.id) {
      case PRODUCTS[0].id:
        prod0TotalPrice = parseFloat(item.price) * item.quantity;
        return;
      case PRODUCTS[1].id:
        prod1TotalPrice = parseFloat(item.price) * item.quantity;
        return;
      case PRODUCTS[2].id:
        prod2TotalPrice = parseFloat(item.price) * item.quantity;
        return;
      default:
        return;
    }
  });
  await screen.findByText(textContentMatcher(formatPrice(prod0TotalPrice)));
  await screen.findByText(textContentMatcher(formatPrice(prod1TotalPrice)));
  await screen.findByText(textContentMatcher(formatPrice(prod2TotalPrice)));
});

test("able to delete item and display correct total items price", async () => {
  render(<Cart />);

  const { result } = renderHook(useCartStore);

  act(() => {
    result.current.updateCart(PRODUCTS[0]);
  });
  act(() => {
    result.current.updateCart(PRODUCTS[0]);
  });
  act(() => {
    result.current.updateCart(PRODUCTS[1]);
  });

  // delete first row item in cart
  const deleteBtns = await screen.findAllByTestId("delete");
  fireEvent.click(deleteBtns[0]);

  const totalItemPrice = result.current.cart.reduce((total, item) => {
    total += parseFloat(item.price) * item.quantity;
    return total;
  }, 0);

  await screen.findByText(
    textContentMatcher(`Total: ${formatPrice(totalItemPrice)}`)
  );
});

test("able to navigate to checkout page if cart not empty", async () => {
  renderWithRouter(<Cart />);

  const { result } = renderHook(useCartStore);

  act(() => {
    result.current.updateCart(PRODUCTS[0]);
  });

  expect(screen.getByText("Cart")).toBeInTheDocument();

  fireEvent.click(screen.getByText("Continue to checkout"));
});

test("able to navigate to home page if cart is empty", () => {
  renderWithRouter(<Cart />);

  expect(screen.getByText(/Cart/i)).toBeInTheDocument();

  fireEvent.click(screen.getByText(/Back to store/i));
});
