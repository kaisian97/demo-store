import { checkout } from "./checkout";
import { setupServer } from "msw/node";
import { checkoutApi, checkoutApiException } from "./handlers";

describe("checkout api", () => {
  const handlers = [checkoutApiException, checkoutApi];

  const server = setupServer(...handlers);

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("should able to get checkout_url", async () => {
    server.use(checkoutApi);

    const data = await checkout({
      amount: "100.00",
    });

    expect(data.checkout_url).toEqual("https://backend.uat.ablr.com");
  });

  it("should catch the error if checkout api fail", async () => {
    server.use(checkoutApiException);

    const data = await checkout();
    expect(data).toEqual(false);
  });
});
