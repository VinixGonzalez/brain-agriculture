import React, { ButtonHTMLAttributes } from "react";

type ButtonSizes = "small" | "medium" | "large" | "full" | "fit";

type ButtonVariants = "primary" | "secondary";

type ButtonProps = {
  btnText?: string;
  size?: ButtonSizes;
  variant?: ButtonVariants;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({
  btnText,
  children,
  size = "medium",
  variant = "primary",
  ...props
}) => {
  const buttonSize = {
    small: "py-2 px-4 text-xs",
    medium: "py-2 px-8 text-sm",
    large: "py-2 px-24 text-base",
    full: "py-2 text-base w-full ",
    fit: "py-2 w-fit text-sm",
  };

  const buttonVariant = {
    primary: "bg-green-800 text-white",
    secondary: "bg-white text-green-800",
  };

  return (
    <button
      className={`border w-full flex items-center justify-center gap-2 border-green-800 rounded-md shadow-sm hover:bg-green-600 sm:w-fit disabled:bg-gray-200 disabled:border-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed focus:bg-green-700 focus:text-white hover:text-white ${buttonSize[size]} ${buttonVariant[variant]}`}
      {...props}
    >
      {btnText && btnText}
      {children}
    </button>
  );
};
