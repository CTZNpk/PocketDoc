import React from 'react'

export default function ShadowDiv({ children }) {
  return (

    <div className="relative inline-flex items-center justify-center mt-8 sm:mt-12 group">
      <div className="absolute transition-all duration-200 rounded-full -inset-px bg-gradient-to-r 
                  from-cyan-500 to-purple-500 group-hover:shadow-lg group-hover:shadow-cyan-500/50"></div>
      {children}
    </div>
  )
}

