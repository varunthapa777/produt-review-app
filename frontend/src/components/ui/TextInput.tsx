import React from "react";
import { IconType } from "react-icons";

interface TextInputProps {
  id: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
  prefixIcon?: IconType;
}

const TextInput: React.FC<TextInputProps> = ({
  id,
  type,
  value,
  onChange,
  placeholder,
  required,
  className,
  prefixIcon: PrefixIcon,
}) => {
  return (
    <div className="relative">
      {PrefixIcon && (
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <PrefixIcon className="text-gray-400 dark:text-gray-300" />
        </span>
      )}
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        className={`w-full ${
          PrefixIcon ? "pl-10" : "pl-4"
        } pr-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 ${className}`}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

export default TextInput;
