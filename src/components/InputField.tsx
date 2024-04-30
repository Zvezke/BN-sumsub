// components/InputField.tsx
import React from "react";
import { UseFormRegister, FieldValues, Path } from "react-hook-form";

interface InputFieldProps<T extends FieldValues> {
  label: string;
  id: Path<T>;
  type: string;
  register: UseFormRegister<T>;
  validation: Record<string, any>;
  className: string;
}

const InputField = <T extends FieldValues>({
  label,
  id,
  type,
  register,
  validation,
  className,
}: InputFieldProps<T>) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-medium leading-6 text-white"
    >
      {label}
    </label>
    <div className="mt-2">
      <input
        id={id}
        type={type}
        {...register(id, validation)}
        className={className}
      />
    </div>
  </div>
);

export default InputField;
