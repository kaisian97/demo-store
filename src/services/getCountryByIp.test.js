import { getCountryByIp } from "./getCountryByIp";
import { setupServer } from "msw/node";
import {
  getCountryApiSG,
  getCountryApiMY,
  getCountryApiException,
} from "./handlers";

describe("get country api", () => {
  const handlers = [getCountryApiSG, getCountryApiMY, getCountryApiException];

  const server = setupServer(...handlers);

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("should able to get countryCode SG", async () => {
    server.use(getCountryApiSG);

    const data = await getCountryByIp();
    expect(data.countryCode).toEqual("SG");
  });

  it("should able to get countryCode MY", async () => {
    server.use(getCountryApiMY);

    const data = await getCountryByIp();
    expect(data.countryCode).toEqual("MY");
  });

  it("should catch the error if getCountry api fail", async () => {
    server.use(getCountryApiException);

    const data = await getCountryByIp();
    expect(data).toEqual(false);
  });
});
