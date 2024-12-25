import React from "react";

export default function InputField({ id, label, type, value, onChange, placeholder }) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-400">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-2 mt-1 bg-gray-700 text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        required
      />
    </div>
  );
}
