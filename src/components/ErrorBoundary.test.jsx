import { fireEvent, render, screen } from "@testing-library/react";
import ErrorBoundary from "./ErrorBoundary";

const Child = () => {
  throw new Error();
};

const renderProviders = (ui) => render(ui, {});

describe("Error Boundary", () => {
  const original = window.location;

  beforeAll(() => {
    Object.defineProperty(window, "location", {
      configurable: true,
      value: { reload: jest.fn() },
    });
  });

  afterAll(() => {
    Object.defineProperty(window, "location", {
      configurable: true,
      value: original,
    });
  });

  it(`should render error boundary component when there is an error`, () => {
    const spy = jest.spyOn(console, "error");
    spy.mockImplementation(() => {});

    renderProviders(
      <ErrorBoundary>
        <Child />
      </ErrorBoundary>
    );
    const errorMessage = screen.getByText("Something went wrong");
    expect(errorMessage).toBeDefined();

    spy.mockRestore();
  });

  it("reload function working", () => {
    const spy = jest.spyOn(console, "error");
    spy.mockImplementation(() => {});

    renderProviders(
      <ErrorBoundary>
        <Child />
      </ErrorBoundary>
    );

    const btn = screen.getByText("Reload the window");
    fireEvent.click(btn);
    expect(window.location.reload).toBeCalledTimes(1);

    spy.mockRestore();
  });
});
