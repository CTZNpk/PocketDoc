import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link, Outlet } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="bg-black py-6">
      <SlideTabs />
      <Outlet />
    </div>
  );
}

const SlideTabs = () => {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  return (
    <ul
      onMouseLeave={() => {
        setPosition((pv) => ({
          ...pv,
          opacity: 0,
        }));
      }}
      className="relative mx-auto flex w-fit rounded-full border-2 border-black bg-white p-1"
    >
         
      <Tab setPosition={setPosition} to="/">Home</Tab>
      <Tab setPosition={setPosition} to="/Contact">Contact</Tab>
      <Tab setPosition={setPosition} to="/features">Features</Tab>
      <Tab setPosition={setPosition} to="/docs">Docs</Tab>
      <Tab setPosition={setPosition} to="/blog">Blog</Tab>

      <Cursor position={position} />
    </ul>
  );
};

const Tab = ({ children, setPosition, to }) => {
  const ref = useRef(null);

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref?.current) return;

        const { width } = ref.current.getBoundingClientRect();

        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        });
      }}
      className="relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase text-white mix-blend-difference md:px-5 md:py-3 md:text-base"
    >
      {/* Link for navigation */}
      <Link to={to}>{children}</Link>
    </li>
  );
};

const Cursor = ({ position }) => {
  return (
    <motion.li
      animate={{
        ...position,
      }}
      className="absolute z-0 h-7 rounded-full bg-black md:h-12"
    />
  );
};
