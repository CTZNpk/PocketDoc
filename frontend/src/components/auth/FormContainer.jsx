import React from "react";
import AnimateBox from "../shared/AnimateBox";

export default function FormContainer({ title, children, footer }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <AnimateBox>
        <h1 className="text-2xl font-bold text-center text-white mb-6">{title}</h1>
        {children}
        {footer && <div className="mt-4 text-center">{footer}</div>}
      </AnimateBox>
    </div>
  );
}
