import { STORES } from "constant";
import { formatPrice } from "utils";

import { renderHook } from "@testing-library/react-hooks";
import { useStore } from "../stores";
import { act } from "react-dom/test-utils";

describe("currency conversion", () => {
  it("convert price to MYR", () => {
    const { result } = renderHook(useStore);
    act(() => {
      result.current.setStore(STORES[0]);
    });

    const formattedPrice = formatPrice("100");

    expect(formattedPrice).toContain("MYR");
    expect(formatPrice("100")).toMatch(/310.00/);
  });

  it("convert price to SGD", () => {
    const { result } = renderHook(useStore);
    act(() => {
      result.current.setStore(STORES[1]);
    });

    const formattedPrice = formatPrice("100");

    expect(formattedPrice).toContain("SGD");
    expect(formattedPrice).toMatch(/100.00/);
  });

  it("able to format the price correctly if default store is not selected in some cases", () => {
    const { result } = renderHook(useStore);
    act(() => {
      result.current.setStore(null);
    });

    const formattedPrice = formatPrice(100);

    expect(formattedPrice).toContain("MYR");
    expect(formatPrice("100")).toMatch(/310.00/);
  });
});
