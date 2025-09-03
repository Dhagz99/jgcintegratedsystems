import React from "react";
import {
  UseFormRegister,
  FieldError,
  FieldValues,
  Path,
  Control,
  Controller,
} from "react-hook-form";
import TagInput from "@/app/request/components/TagInput";

type Option = { value: string; label: string };

type CommonProps<T extends FieldValues> = {
  variant?: "primary" | "secondary" | "tertiary";
  label?: string;
  name: Path<T>;
  control?: Control<T>; // for taginput
  register: UseFormRegister<T>;
  error?: FieldError;
  options?: Option[];
};

type InputTextProps<T extends FieldValues> = CommonProps<T> & {
  type?: "text" | "number" | "email" | "password" | "date" | "taginput";
} & React.InputHTMLAttributes<HTMLInputElement>;

type TextareaProps<T extends FieldValues> = CommonProps<T> & {
  type: "textarea";
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

type SelectProps<T extends FieldValues> = CommonProps<T> & {
  type: "select";
} & React.SelectHTMLAttributes<HTMLSelectElement>;

type InputProps<T extends FieldValues> =
  | (InputTextProps<T> & { tags?: string[]; setTags?: React.Dispatch<React.SetStateAction<string[]>> })
  | TextareaProps<T>
  | SelectProps<T>;

function InputField<T extends FieldValues>(props: InputProps<T>) {
  const {
    variant = "primary",
    label = "",
    name,
    register,
    error,
    type = "text",
    options = [],
    className = "",
    control,
    onChange,
    onClick,
    ...rest
  } = props;

  const registerProps = register(name);

  const handleChange = (e: React.ChangeEvent<any>) => {
    registerProps.onChange(e);
    if (onChange) onChange(e);
  };

  const handleClick = (e: React.MouseEvent<any>) => {
    if (onClick) onClick(e);
  };

  return (
    <div className="flex flex-col gap-2 flex-1">
      <label className="font-semibold text-[#333333]" htmlFor={String(name)}>
        {label}
      </label>

      {type === "taginput" ? (
        <Controller
          name={name}
          control={control as Control<T>}
          render={({ field }) => (
            <TagInput
              tags={(field.value as string[]) ?? []}
              setTags={(next) => field.onChange(next)}
              placeholder={(rest as any).placeholder || "Type and press Enter"}
              onBlur={field.onBlur}
            />
          )}
        />
      ) : type === "textarea" ? (
        <textarea
          id={String(name)}
          {...registerProps}
          onChange={handleChange}
          onClick={handleClick}
          className={`border border-gray-300 rounded p-2 flex flex-wrap gap-2 min-h-[42px] ${className}`}
          {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : type === "select" ? (
        <select
          id={String(name)}
          {...registerProps}
          onChange={handleChange}
          onClick={handleClick}
          className={`border border-gray-300 rounded p-2 flex flex-wrap gap-2 min-h-[42px] ${className}`}
          {...(rest as React.SelectHTMLAttributes<HTMLSelectElement>)}
        >
          <option value="">Select an option</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={String(name)}
          type={type}
          {...registerProps}
          
          onChange={handleChange}
          onClick={handleClick}
          className={`border border-gray-300 rounded p-2 flex flex-wrap w-full gap-2 min-h-[42px] ${className}`}
          {...(rest as React.InputHTMLAttributes<HTMLInputElement>)}
        />
      )}

      {error && <p className="text-red-400 font-light">{error.message}</p>}
    </div>
  );
}

export default InputField;
