import React from "react";
import { motion } from "framer-motion";

export default function Button({
  children,
  variant = "primary",
  type = "button",
  onClick,
  className = "",
  wFull = true,
  whileHover = { scale: 1.05 },
  whileTap = { scale: 0.95 },
}) {
  const variants = {
    primary: `relative inline-flex items-center justify-center px-8 py-3 text-base font-normal 
                text- white bg-black border border-transparent rounded-full`,
    secondary: (wFull ? `w-full ` : ``) + `px-4 py-2 font-medium text-white bg-purple-600 rounded-md
  shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500`
  }

  return (
    <motion.button
      whileHover={variant == "primary" ? 0.00 : whileHover}
      whileTap={variant == "primary" ? 0.00 : whileTap}
      type={type}
      onClick={onClick}
      className={`${variants[variant]} ${className} `}
    >
      {children}
    </motion.button>
  );
}
