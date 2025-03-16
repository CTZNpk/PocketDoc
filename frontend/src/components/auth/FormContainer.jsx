import React from "react";
import AnimateBox from "../shared/AnimateBox";

export default function FormContainer({ title, subtitle, children, footer }) {
  return (
    <div className="flex min-h-screen bg-black">
      {/* Form side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <AnimateBox className="w-full max-w-md">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl border border-gray-800 p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
              {subtitle && <p className="text-gray-400">{subtitle}</p>}
            </div>

            {children}

            {footer && <div className="mt-8">{footer}</div>}
          </div>
        </AnimateBox>
      </div>

      {/* Image side */}
      <div className="hidden lg:block lg:w-1/2 bg-gradient-to-br from-cyan-900 to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20 z-10"></div>

        {/* Abstract shapes */}
        <div className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full bg-cyan-500/20 blur-3xl"></div>
        <div className="absolute top-20 -right-20 w-60 h-60 rounded-full bg-purple-500/20 blur-3xl"></div>
        <div className="absolute -left-20 bottom-1/3 w-72 h-72 rounded-full bg-blue-500/20 blur-3xl"></div>

        {/* Content overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 p-12">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            Experience the Future
          </h2>
          <p className="text-gray-300 text-center max-w-md">
            Join our platform and unlock the full potential of your digital
            journey with cutting-edge tools and seamless experiences.
          </p>
        </div>

        {/* Grid overlay for texture */}
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
      </div>
    </div>
  );
}
