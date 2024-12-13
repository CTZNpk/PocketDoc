import React, { useEffect, useRef, useState } from "react";
import KeenSlider from "keen-slider";
import "keen-slider/keen-slider.min.css";

export default function Reviews() {
  const sliderRef = useRef(null);
  const [keenSliderInstance, setKeenSliderInstance] = useState(null);
  const [activeSlide, setActiveSlide] = useState(1);

  useEffect(() => {
    if (sliderRef.current) {
      const slider = new KeenSlider(sliderRef.current, {
        loop: true,
        defaultAnimation: {
          duration: 750,
        },
        slides: {
          origin: "center",
          perView: 1,
          spacing: 16,
        },
        breakpoints: {
          "(min-width: 640px)": {
            slides: {
              origin: "center",
              perView: 1.5,
              spacing: 16,
            },
          },
          "(min-width: 768px)": {
            slides: {
              origin: "center",
              perView: 1.75,
              spacing: 16,
            },
          },
          "(min-width: 1024px)": {
            slides: {
              origin: "center",
              perView: 3,
              spacing: 16,
            },
          },
        },
        created(slider) {
          setActiveSlide(slider.track.details.rel + 1);
        },
        slideChanged(slider) {
          setActiveSlide(slider.track.details.rel + 1);
        },
      });

      setKeenSliderInstance(slider);

      return () => slider.destroy();
    }
  }, []);

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <h2 className="text-center text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Read trusted reviews from our customers
        </h2>

        <div className="mt-8">
          <div ref={sliderRef} className="keen-slider">
            <div className="keen-slider__slide">
              <blockquote className="rounded-lg bg-gray-50 p-6 shadow-sm sm:p-8">
                <div className="flex items-center gap-4">
                  <img
                    alt="Reviewer"
                    src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <div className="flex justify-center gap-0.5 text-green-500">
                      {[...Array(5)].map((_, idx) => (
                        <svg
                          key={idx}
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="mt-0.5 text-lg font-medium text-gray-900">
                      Paul Starr
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-gray-700">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa sit rerum
                  incidunt, a consequuntur recusandae ab saepe illo est quia obcaecati neque
                  quibusdam eius accusamus error officiis atque voluptates magnam!
                </p>
              </blockquote>
            </div>
            {/* Add more slides as needed */}
          </div>

          <div className="flex justify-center mt-4 gap-4">
            <button
              onClick={() => keenSliderInstance?.prev()}
              className="p-2 bg-gray-200 rounded"
            >
              Previous
            </button>
            <button
              onClick={() => keenSliderInstance?.next()}
              className="p-2 bg-gray-200 rounded"
            >
              Next
            </button>
          </div>

          <p className="text-center mt-4 text-sm">
            Slide {activeSlide} of {keenSliderInstance?.track.details.slides.length || 0}
          </p>
        </div>
      </div>
    </section>
  );
}
