import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Select from "./Select";

const spy = jest.fn();

const setup = (props = {}) => {
  const utils = render(<Select handleOnChange={spy} {...props} />);
  const select = screen.getByLabelText("select");
  return {
    select,
    options: props.options,
    ...utils,
  };
};

it("show selected value correctly", () => {
  const { select } = setup({
    options: [
      { name: "dog", value: 1 },
      { name: "cat", value: 2 },
    ],
  });
  fireEvent.change(select, { target: { value: 2 } });
  expect(select.value).toBe("2");
});

it("show selected value correctly based on valueKey", () => {
  const { select } = setup({
    options: [
      { animal: "dog", code: 1 },
      { animal: "cat", code: 2 },
    ],
    valueKey: "code",
    labelKey: "animal",
  });
  fireEvent.change(select, { target: { value: 2 } });
  expect(select.value).toBe("2");
});

it("should able to display dynamic label", () => {
  const { options } = setup({
    options: [
      { animal: "dog", code: 1 },
      { animal: "cat", code: 2 },
    ],
    valueKey: "code",
    labelKey: "animal",
  });
  options.forEach((opt) => {
    screen.getByText(opt.animal);
  });
});

it("should trigger handleOnChange", async () => {
  setup({
    options: [
      { animal: "dog", code: 1 },
      { animal: "cat", code: 2 },
    ],
    valueKey: "code",
    labelKey: "animal",
  });
  userEvent.selectOptions(
    screen.getByRole("combobox"),
    screen.getByRole("option", { name: "cat" })
  );
  expect(screen.getByRole("option", { name: "cat" }).selected).toBe(true);

  expect(spy).toBeCalledTimes(1);
});

it("should not trigger handleOnChange if value not found", async () => {
  const { select } = setup({
    options: [
      { animal: "dog", code: 1 },
      { animal: "cat", code: 2 },
    ],
    valueKey: "code",
    labelKey: "animal",
  });
  fireEvent.change(select, { target: { value: 3 } });

  expect(spy).toBeCalledTimes(0);
});

it("should able to render with empty option", async () => {
  const { select } = setup({
    options: undefined,
  });
  fireEvent.change(select, { target: { value: 3 } });
  screen.getByRole("combobox", { name: "select" });
});
