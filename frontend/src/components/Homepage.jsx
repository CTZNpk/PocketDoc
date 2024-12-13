import React from "react";


export default function Homepage() {
  return (
    <div className="bg-black text-white">
      <section className="py-12 sm:pb-16 lg:pb-20 xl:pb-24">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="relative flex flex-col-reverse lg:flex-row items-center lg:items-start lg:justify-between">
            {/* Text Section */}
            <div className="lg:w-2/3 flex flex-col items-center text-center lg:items-start lg:text-left">
              <p className="text-sm font-normal tracking-widest text-gray-300 uppercase">
                A Hub for Students, Teachers & Researchers
              </p>
              <h1 className="mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500">
                Pocket Doc
              </h1>
              <h2 className="text-xl sm:text-2xl mt-2 lg:mt-3">
                Your friendly Pocket LLM
              </h2>
              <p className="max-w-lg mt-4 text-base sm:text-lg md:text-xl font-normal text-gray-400">
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                amet sint. Velit officia consequat duis enim velit mollit.
                Exercitation veniam consequat.
              </p>
              <div className="relative inline-flex items-center justify-center mt-8 sm:mt-12 group">
                <div className="absolute transition-all duration-200 rounded-full -inset-px bg-gradient-to-r from-cyan-500 to-purple-500 group-hover:shadow-lg group-hover:shadow-cyan-500/50"></div>
                <button
                  className="relative inline-flex items-center justify-center px-8 py-3 text-base font-normal text-white bg-black border border-transparent rounded-full"

                >
                  Start Exploring Inspiration
                </button>
              </div>
              {/* <div className="inline-flex items-center pt-6 mt-8 border-t border-gray-800 sm:pt-10 sm:mt-14">
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeWidth="1.5"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13 7.00003H21M21 7.00003V15M21 7.00003L13 15L9 11L3 17"
                    stroke="url(#a)"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <defs>
                    <linearGradient
                      id="a"
                      x1="3"
                      y1="7.00003"
                      x2="22.2956"
                      y2="12.0274"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop
                        offset="0%"
                        style={{ stopColor: "var(--color-cyan-500)" }}
                      />
                      <stop
                        offset="100%"
                        style={{ stopColor: "var(--color-purple-500)" }}
                      />
                    </linearGradient>
                  </defs>
                </svg>
              </div> */}
            </div>

            {/* Image Section */}
            <div className="-mt-4 mb-8 lg:mt-0 lg:ml-8">
              <img
                className="w-full max-w-xs mx-auto sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
                src="https://landingfoliocom.imgix.net/store/collection/dusk/images/hero/1/3d-illustration.png"
                alt="3D Illustration"
              />
            </div>
          </div>
        </div>
      </section>
      <section>
    
      </section>
    </div>
  );
}
