import React, { useEffect, useMemo, useState } from "react";
import { FieldError } from "react-hook-form";

type Option1 = { id: string | number; name: string };

interface SearchableInputProps {
  data: Option1[];
  placeholder?: string;
  label?: string;

  // RHF-controlled props from Controller
  name: string;
  value?: string | number;                // current branchId from RHF
  onChange: (value: unknown) => void;     // call with the id
  inputRef?: React.Ref<any>;
  error?: FieldError;
}

const SearchableInput: React.FC<SearchableInputProps> = ({
  data,
  placeholder = "Select data...",
  label,
  name,
  value,
  onChange,
  inputRef,
  error,
}) => {
  const [query, setQuery] = useState("");
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [filteredData, setFilteredData] = useState<Option1[]>([]);

  // find the current option from the form's value
  const currentMatch = useMemo(() => {
    if (value === undefined || value === null || value === "") return null;
    return data.find((item) => String(item.id) === String(value)) ?? null;
  }, [value, data]);

  // when RHF value changes externally, reflect the name in the visible text box
  useEffect(() => {
    setQuery(currentMatch?.name ?? "");
  }, [currentMatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setQuery(v);

    if (v.trim().length > 0) {
      const low = v.toLowerCase();
      const filtered = data.filter(
        (item) =>
          String(item.id).toLowerCase().includes(low) ||
          item.name.toLowerCase().includes(low)
      );
      setFilteredData(filtered);
      setShowSuggestion(true);
    } else {
      setFilteredData([]);
      setShowSuggestion(false);
    }
  };

  const handleSelect = (opt: Option1) => {
    // show the chosen name
    setQuery(opt.name);
    setShowSuggestion(false);
    // push the ID into RHF form state
    onChange(opt.id); // RHF + Zod (with z.coerce.number) will coerce if needed
  };

  const inputId = `si-${name}`;

  return (
    <div className="relative w-full">
      {label && (
        <label htmlFor={inputId} className="block mb-2 text-sm font-medium text-gray-900">
          {label}
        </label>
      )}

      {/* Visible search input */}
      <input
        id={inputId}
        ref={inputRef}
        name={name}
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
          focus:outline-none  block w-full p-2.5 
          ${error ? "focus:ring-2 focus:ring-red-500 focus:border-red-500" : "focus:ring-2 focus:ring-green-500 focus:border-green-500 " }`}
        // onFocus={() => filteredData.length && setShowSuggestion(true)}
        // onBlur={() => setTimeout(() => setShowSuggestion(false), 120)}
        autoComplete="off"
      />

      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}

      {showSuggestion && filteredData.length > 0 && (
        <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded border border-gray-200 bg-white shadow">
          {filteredData.map((item) => (
            <li
              key={item.id}
              className="cursor-pointer px-3 py-2 hover:bg-gray-100"
              onMouseDown={() => handleSelect(item)}
            >
              <span className="text-gray-700">{item.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchableInput;
