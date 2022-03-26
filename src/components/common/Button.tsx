import { PropsWithChildren } from "react";

interface ButtonProps
  extends PropsWithChildren<JSX.IntrinsicElements["button"]> {
  variant?: "solid" | "ghost";
  size?: "sm" | "normal" | "lg";
}

const Button = ({
  children,
  className = "",
  variant = "solid",
  size = "normal",
  ...restProps
}: ButtonProps) => {
  const variantClassName = {
    solid: "bg-black text-white",
    ghost: "text-black border border-slate-600",
  };

  const sizeClassName = {
    sm: "",
    normal: "px-4 py-2",
    lg: "px-4 py-4",
  };
  return (
    <button
      className={`${sizeClassName[size]} ${variantClassName[variant]} rounded-xl ${className}`}
      {...restProps}
    >
      {children}
    </button>
  );
};

export default Button;
