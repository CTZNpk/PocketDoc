import React from "react";
import { motion } from "framer-motion";

export default function Signup() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-lg"
      >
        <h1 className="text-2xl font-bold text-center text-white mb-6">
          Create an Account
        </h1>
        <form>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-400"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-2 mt-1 bg-gray-700 text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-400"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 mt-1 bg-gray-700 text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-400"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 mt-1 bg-gray-700 text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full px-4 py-2 font-medium text-white bg-purple-600 rounded-md shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Sign Up
          </motion.button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-400">
            Already have an account?{" "}
            <a href="#" className="text-purple-400 hover:underline">
              Log in
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
