import React from 'react'

export default function Title({ children, size = "large", mt = true }) {
  let textSize = "text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl ";
  if (size === "small") {
    textSize = "text-l sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl ";
  }

  return (
    <h1 className={`${mt ? "mt-6" : ""} ${textSize} font-bold 
              text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500`}>
      {children}
    </h1 >
  )
}

