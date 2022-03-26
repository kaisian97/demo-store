import { render, screen, fireEvent } from "@testing-library/react";
import RadioGroup from "./RadioGroup";

const setup = (props = {}) => {
  const options = [
    { label: "dog", value: 1 },
    { label: "cat", value: 2 },
  ];
  const utils = render(
    <RadioGroup
      valueKey="code"
      labelKey="animal"
      options={options}
      {...props}
    />
  );
  const radioGroup = screen.getByRole("radiogroup");
  return {
    radioGroup,
    options,
    ...utils,
  };
};

it("show selected value correctly", () => {
  setup();
  const radios = screen.getAllByRole("radio");
  fireEvent.click(radios[0]);
  expect(radios[0].getAttribute("aria-checked")).toBe("true");
});

it("should render label", () => {
  const label = "this is radio group label";
  setup({ label });
  screen.getByText(label);
});
