import { useState, ReactNode } from "react";
import { RadioGroup as HRadioGroup } from "@headlessui/react";

interface RadioGroupProps {
  label?: string;
  options: {
    label: ((checked: boolean) => ReactNode | "string") | ReactNode | "string";
    value: any;
  }[];
  onChange?: (value: any) => void;
}

const RadioGroup = ({ options, label, onChange }: RadioGroupProps) => {
  const [plan, setPlan] = useState("startup");

  const handleOnChange = (value: any) => {
    setPlan(value);
    onChange?.(value);
  };

  return (
    <HRadioGroup value={plan} onChange={handleOnChange}>
      {label && <HRadioGroup.Label>{label}</HRadioGroup.Label>}
      {options.map((opt) => (
        <HRadioGroup.Option key={opt.value} id={opt.value} value={opt.value}>
          {({ checked }) => (
            <span className={checked ? "bg-blue-200" : ""}>
              {typeof opt.label === "function" ? opt.label(checked) : opt.label}
            </span>
          )}
        </HRadioGroup.Option>
      ))}
    </HRadioGroup>
  );
};

export default RadioGroup;
