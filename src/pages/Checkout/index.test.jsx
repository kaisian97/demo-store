import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import Checkout from ".";
import { useCartStore } from "stores";
import { act } from "react-dom/test-utils";
import { PRODUCTS } from "constant";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

beforeAll(() => {
  const location = window.location;
  delete global.window.location;
  global.window.location = Object.assign({}, location);
});

it("should display all cart items", () => {
  const { result } = renderHook(useCartStore);
  render(<Checkout />);

  act(() => {
    result.current.updateCart(PRODUCTS[0]);
  });
  act(() => {
    result.current.updateCart(PRODUCTS[1]);
  });

  screen.getByText(PRODUCTS[0].title, { exact: false });
  screen.getByText(PRODUCTS[1].title, { exact: false });
  expect(() => screen.getByText(PRODUCTS[2].title, { exact: false })).toThrow();
});

it("should show albr checkout button after select it", () => {
  const { result } = renderHook(useCartStore);
  render(<Checkout />);

  act(() => {
    result.current.updateCart(PRODUCTS[0]);
  });

  const span = screen.getByText("Ablr");
  expect(() =>
    screen.getByRole("button", { name: "Continue to Ablr" })
  ).toThrow();
  fireEvent.click(span);
  screen.getByRole("button", { name: "Continue to Ablr" });
});

it("should show empty cart content", () => {
  render(<Checkout />);

  expect(() =>
    screen.getByRole("button", { name: "Continue to Ablr" })
  ).toThrow();
  screen.getByText("Back to store");
});

it("should call checkout api and go to other url", async () => {
  const { result } = renderHook(useCartStore);
  render(<Checkout />);

  act(() => {
    result.current.updateCart(PRODUCTS[0]);
  });

  const span = screen.getByText("Ablr");
  fireEvent.click(span);

  const button = screen.getByRole("button", { name: "Continue to Ablr" });

  fireEvent.click(button);

  await waitFor(() => {
    expect(window.location.href).toContain("backend.uat.ablr.com");
  });
});
