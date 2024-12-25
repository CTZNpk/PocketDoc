import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function AnimateBox({ children, className = "" }) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <motion.div
      ref={ref} // Attach the ref to track visibility
      initial={{ opacity: 0, y: 50 }} // Initial state for animation
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }} // Animate based on visibility
      transition={{ duration: 0.5, ease: "easeOut" }} // Animation duration and easing
      className={className}
    >
      {children}
    </motion.div>
  );
}

