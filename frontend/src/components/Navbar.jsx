import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Button from "./shared/Button";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className="bg-white dark:bg-black fixed w-full z-20 
      top-0 left-0 border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-bold whitespace-nowrap text-white">
            PocketDoc
          </span>
        </Link>

        <div className="flex md:order-2 space-x-3 rtl:space-x-reverse">
          <Button variant="secondary" onClick={() => navigate("/login")}>
            Login
          </Button>

          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 
            rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 
            dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border 
            border-gray-700 rounded-lg bg-black 
            md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 ">
            <li>
              <Link
                to="/"
                className="block py-2 px-3 text-gray-900 rounded 
                 hover:text-purple-500 md:p-0  text-white border-gray-700"
                aria-current="page"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/services"
                className="block py-2 px-3 text-gray-900 rounded 
                 hover:text-purple-500 md:p-0  text-white border-gray-700"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                to="/myDocuments"
                className="block py-2 px-3 text-gray-900 rounded 
                 hover:text-purple-500 md:p-0  text-white border-gray-700"
              >
                Documents
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="block py-2 px-3 text-gray-900 rounded 
                 hover:text-purple-500 md:p-0  text-white border-gray-700"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="block py-2 px-3 text-gray-900 rounded 
                 hover:text-purple-500 md:p-0  text-white border-gray-700"
              >
                Contact
              </Link>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}

