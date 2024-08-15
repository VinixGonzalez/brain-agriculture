import React, { InputHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type InputProps = {
  label?: string;
  register?: UseFormRegisterReturn;
  error?: boolean;
  errorMsg?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input: React.FC<InputProps> = ({
  label,
  id,
  placeholder = "Digite...",
  register,
  error,
  errorMsg,
  ...props
}) => {
  return (
    <div className={`flex flex-col gap-1`}>
      {label && (
        <label className="text-sm" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        id={id}
        placeholder={placeholder}
        className={`border rounded-md placeholder:italic placeholder:text-gray-300 placeholder:text-sm p-2 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        {...register}
        {...props}
      />
      {error && <small className="text-red-500">{errorMsg}</small>}
    </div>
  );
};
