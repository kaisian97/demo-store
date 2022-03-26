import { ChangeEvent, PropsWithRef } from "react";

interface SelectProps<T> extends PropsWithRef<JSX.IntrinsicElements["select"]> {
  options: T[];
  labelKey?: string;
  valueKey?: string;
  handleOnChange: (selectedObj: T) => void;
}

const Select = <T extends Record<string, any>>({
  options = [],
  labelKey = "name",
  valueKey = "value",
  handleOnChange,
  ...restProps
}: SelectProps<T>) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedOpt = options.find(
      (opt) => opt[valueKey].toString() === e.target.value
    );
    if (!selectedOpt) return;
    handleOnChange(selectedOpt);
  };
  return (
    <select
      aria-label="select"
      className="px-4 py-2 border border-black"
      onChange={handleChange}
      {...restProps}
    >
      {options.map((opt) => {
        const optValue = opt[valueKey];
        const optLabel = opt[labelKey];
        return (
          <option key={optValue} value={optValue}>
            {optLabel}
          </option>
        );
      })}
    </select>
  );
};

export default Select;
