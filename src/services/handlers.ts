import { rest } from "msw";

export const checkoutApiException = rest.post(
  "https://api.uat.ablr.com/api/v2/public/merchant/checkout/",
  async (req, res, ctx) => res.networkError("Custom network error message")
);

export const checkoutApi = rest.post(
  "https://api.uat.ablr.com/api/v2/public/merchant/checkout/",
  async (req, res, ctx) =>
    res(ctx.json({ data: { checkout_url: "https://backend.uat.ablr.com" } }))
);

export const getCountryApiSG = rest.get(
  `https://extreme-ip-lookup.com/json/`,
  (req, res, ctx) => {
    return res(ctx.json({ countryCode: "SG" }));
  }
);

export const getCountryApiMY = rest.get(
  `https://extreme-ip-lookup.com/json/`,
  (req, res, ctx) => {
    return res(ctx.json({ countryCode: "MY" }));
  }
);

export const getCountryApiOthers = rest.get(
  `https://extreme-ip-lookup.com/json/`,
  (req, res, ctx) => {
    return res(ctx.json({ countryCode: "US" }));
  }
);

export const getCountryApiException = rest.get(
  `https://extreme-ip-lookup.com/json/`,
  (req, res, ctx) => {
    return res.networkError("Custom network error message");
  }
);
