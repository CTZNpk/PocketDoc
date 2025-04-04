import React from "react";

export default function InputField({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  icon,
  endIcon,
  required = false,
  error,
  ...props
}) {
  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-300">
          {label} {required && <span className="text-cyan-500">*</span>}
        </label>
      )}
      <div
        className={`relative rounded-lg shadow-sm ${error ? "ring-1 ring-red-500" : ""}`}
      >
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          id={id}
          name={id}
          type={type}
          className={`block w-full bg-gray-800 border border-gray-700 text-white rounded-lg 
            focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition duration-200
            ${icon ? "pl-10" : "pl-4"} ${endIcon ? "pr-10" : "pr-4"} py-2.5 text-sm
            placeholder-gray-400`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          {...props}
        />
        {endIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {endIcon}
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
