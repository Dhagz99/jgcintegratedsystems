import { FieldError, FieldErrorsImpl, Merge, UseFormRegisterReturn } from "react-hook-form";


type FormError = FieldError | Merge<FieldError, FieldErrorsImpl<any>>;

type FormInputProps = {
  label?: string;
  placeholder?: string;
  register?: UseFormRegisterReturn;
  error?: FormError;
  type?: string;
};

export const FormsInputs = ({
  label,
  placeholder,
  register,
  error,
  type
}: FormInputProps) => {
  return (
    <div className="flex flex-col w-full">
      {label && (
        <label
          htmlFor={register?.name}
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          {label}
        </label>
      )}
      <input
        type={type}
        {...register}
        id={register?.name} // dynamic ID to avoid conflicts
        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
            focus:outline-none  block w-full p-2.5 
            ${error ? "focus:ring-2 focus:ring-red-500 focus:border-red-500" : "focus:ring-2 focus:ring-green-500 focus:border-green-500 " }`}
        placeholder={placeholder}
      />
  {typeof error?.message === "string" && (
  <p className="text-red-500 text-sm mt-1">{error.message}</p>
)}
    </div>
  );
};


type Option = { value: number | string; label: string };

type FormSelectProps = {
  label?: string;
  register?: UseFormRegisterReturn;
  error?: FieldError;
  options?: Option[];
  placeholder?: string;
};

export const FormsSelect = ({
  label,
  register,
  error,
  options,
  placeholder,
}: FormSelectProps) => {

  return (
    <div className="flex flex-col">
      {label && (
        <label
          htmlFor={register?.name}
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          {label}
        </label>
      )}
      <select
        {...register}
        id={register?.name} // dynamic ID to avoid conflicts
        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
            focus:outline-none  block w-full p-2.5 
            ${error ? "focus:ring-2 focus:ring-red-500 focus:border-red-500" : "focus:ring-2 focus:ring-green-500 focus:border-green-500 " }`}
      >
     <option value="" >
           {placeholder}
      </option>

        {options?.map(o => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
      </select>
      {error && (
        <p className="text-red-500 text-sm mt-1">{error.message}</p>
      )}
    </div>
  );
};



export const FormsTextArea = ({
  label,
  placeholder,
  register,
  error,
}: FormInputProps) => {
  return (
    <div className="flex flex-col w-full h-full">
      {label && (
        <label
          htmlFor={register?.name}
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          {label}
        </label>
      )}
      <textarea
        {...register}
        id={register?.name}
        placeholder={placeholder} // ✅ fixed
        className={ `h-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
            focus:outline-none block w-full p-2.5 
            ${error
              ? "focus:ring-2 focus:ring-red-500 focus:border-red-500"
              : "focus:ring-2 focus:ring-green-500 focus:border-green-500"
            }`}
      />
    {typeof error?.message === "string" && (
  <p className="text-red-500 text-sm mt-1">{error.message}</p>
)}
    </div>
  );
};


type FormCheckBoxProps = {
  label?: string;
  placeholder?: string;
  register?: UseFormRegisterReturn;
  error?: { message?: string };
};


export const FormsCheckBox = ({
  label,
  placeholder,
  register,
  error,
}: FormCheckBoxProps) => {
  return (
    <div className="flex flex-col w-full">
      {label && (
        <label
          htmlFor={register?.name}
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          {label}
        </label>
      )}

      <div className="flex items-center me-4 bg-gray-50 border border-gray-300 p-2.5 rounded-lg">
        <input
          id={register?.name}
          type="checkbox"
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 focus:ring-2"
          {...register} 
        />
        <label
          htmlFor={register?.name}
          className="ms-2 text-sm font-medium text-gray-900"
        >
          {placeholder}
        </label>
      </div>

      {typeof error?.message === "string" && (
        <p className="text-red-500 text-sm mt-1">{error.message}</p>
      )}
    </div>
  );
};