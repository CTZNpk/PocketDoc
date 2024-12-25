import React from "react";
import AnimateBox from "../shared/AnimateBox";

export default function FormContainer({ title, children, footer }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <AnimateBox className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center text-white mb-6">{title}</h1>
        {children}
        {footer && <div className="mt-4 text-center">{footer}</div>}
      </AnimateBox>
    </div>
  );
}
