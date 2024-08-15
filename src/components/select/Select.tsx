"use client";

import React from "react";
import {
  useController,
  FieldValues,
  UseControllerProps,
  UseFormRegisterReturn,
} from "react-hook-form";
import { FormControl } from "@chakra-ui/react";
import { Select, Props as SelectProps, GroupBase } from "chakra-react-select";

interface ControlledSelectProps<
  FormValues extends FieldValues = FieldValues,
  Option = unknown,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
> extends Omit<SelectProps<Option, IsMulti, Group>, "name" | "defaultValue">,
    UseControllerProps<FormValues> {
  register?: UseFormRegisterReturn;
  label?: string;
}

function ControlledSelect<
  FormValues extends FieldValues = FieldValues,
  Option = unknown,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
>({
  name,
  label,
  options,
  control,
  rules,
  shouldUnregister,
  register,
  ...selectProps
}: ControlledSelectProps<FormValues, Option, IsMulti, Group>) {
  const {
    field,
    fieldState: { error },
  } = useController<FormValues>({
    name,
    control,
    rules,
    shouldUnregister,
  });

  return (
    <FormControl id={name} isInvalid={!!error}>
      {label && <label className="text-sm">{label}</label>}
      <Select<Option, IsMulti, Group>
        {...register}
        options={options}
        chakraStyles={{
          control: (provided) => ({
            ...provided,
            borderWidth: error ? "0px" : "1px",
            borderColor: error ? "red.500" : "gray.300",
            bgColor: "white",
          }),
        }}
        {...selectProps}
        {...field}
      />
      {error && error.type === "invalid_type" && (
        <small className="text-red-500">Selecione ao menos uma cultura</small>
      )}
    </FormControl>
  );
}

export default ControlledSelect;
