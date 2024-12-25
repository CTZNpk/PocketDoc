import { motion } from 'framer-motion'
import React from 'react'

export default function AnimateBox({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-lg"
    >{children}</motion.div>
  )
}

