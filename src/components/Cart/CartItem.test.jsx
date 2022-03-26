import { render, screen } from "@testing-library/react";
import { PRODUCTS } from "constant";
import { textContentMatcher } from "setupTests";
import { formatPrice } from "utils";
import CartItem from "./CartItem";

it("able to render cart item details", async () => {
  const quantity = 10;
  render(<CartItem item={{ ...PRODUCTS[0], quantity }} />);

  const itemTotalPrice = parseFloat(PRODUCTS[0].price) * quantity;

  screen.getByText(`${PRODUCTS[0].title} (${quantity})`);
  await screen.findByText(textContentMatcher(formatPrice(itemTotalPrice)));
});
