import React from 'react'

export default function Title({ text }) {
  return (
    <h1 className="mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold 
              text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500">
      {text}
    </h1>
  )
}

