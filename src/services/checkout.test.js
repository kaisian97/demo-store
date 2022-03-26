import { checkout } from "./checkout";
import { rest } from "msw";
import { setupServer } from "msw/node";

const checkoutApiException = rest.post(
  "https://api.uat.ablr.com/api/v2/public/merchant/checkout/",
  async (req, res, ctx) => res.networkError("Custom network error message")
);

const checkoutApi = rest.post("/checkout", async (req, res, ctx) =>
  res(ctx.json({ checkout_url: "https://backend.uat.ablr.com" }))
);

const handlers = [checkoutApiException, checkoutApi];

const server = setupServer(...handlers);

it("should able to get checkout_url", () => {
  return checkout({
    amount: "100.00",
  }).then((data) => {
    expect(data.checkout_url).toBeTruthy();
  });
});

it("should catch the error if checkout api fail", async () => {
  server.listen();
  server.use(checkoutApiException);

  const data = await checkout();
  expect(data).toEqual(false);

  server.resetHandlers();
  server.close();
});
