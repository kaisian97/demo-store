import { render, screen, waitFor } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import App from "App";
import { STORES } from "constant";
import { MemoryRouter } from "react-router-dom";
import { useStore } from "stores";
import { setupServer } from "msw/node";
import {
  getCountryApiSG,
  getCountryApiMY,
  getCountryApiException,
  getCountryApiOthers,
} from "./services/handlers";

describe("App page", () => {
  const handlers = [
    getCountryApiSG,
    getCountryApiMY,
    getCountryApiOthers,
    getCountryApiException,
  ];

  const server = setupServer(...handlers);

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("if current user at SG then set the store to SG", async () => {
    const { result } = renderHook(useStore);
    server.use(getCountryApiSG);

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(result.current.store).toEqual(STORES[1]);
    });
  });

  it("if current user at MY then set the store to MY", async () => {
    const { result } = renderHook(useStore);
    server.use(getCountryApiMY);

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(result.current.store).toEqual(STORES[0]);
    });
  });

  it("if current user not in SG or MY then default store is MY", async () => {
    const { result } = renderHook(useStore);
    server.use(getCountryApiOthers);

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(result.current.store).toEqual(STORES[0]);
    });
  });

  it("if get country api failed the default store is MY", async () => {
    const { result } = renderHook(useStore);
    server.use(getCountryApiException);

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(result.current.store).toEqual(STORES[0]);
    });
  });
});
