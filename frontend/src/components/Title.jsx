import React from "react";

export default function Title({ children }) {
  return (
    <h1
      className="text-5xl md:text-7xl font-bold mb-6 
        bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-400"
    >
      {children}
    </h1>
  );
}
