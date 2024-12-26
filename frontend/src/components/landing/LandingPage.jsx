import React from "react";
import { useEffect, useRef } from "react";
import styled from 'styled-components';
import HomepageSection from "./HomepageSection";

export default function LandingPage() {
  return (
    <div className="bg-black text-white">
      <div className="lg:h-[15vh] h-[10vh] "></div>
      <IntroScreen />
      <SummarizeDocumentSection />
      <GenerateQuizSection />
      <MultipleSelection />
      <div className="lg:h-[15vh] h-[10vh] "></div>
    </div>
  );
}

function IntroScreen() {
  return (
    <HomepageSection
      topText="A Hub for Students, Teachers & Researchers"
      title="PocketDoc"
      subHeading="Your Friendly Pocket LLM"
      text={`Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint. Velit officia consequat duis enim velit mollit.
              Exercitation veniam consequat.`}
      buttonText="Start Exploring Inspiration"
      visual={
        <img
          className="w-full max-w-xs mx-auto sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
          src="https://landingfoliocom.imgix.net/store/collection/dusk/images/hero/1/3d-illustration.png"
          alt="3D Illustration"
        />
      }
    />
  );
}


function SummarizeDocumentSection() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    // Create an intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Start playing the video when it enters the viewport
            video.play();
          } else {
            // Pause the video when it's not in the viewport (optional)
            video.pause();
          }
        });
      },
      { threshold: 0.40 }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <HomepageSection
      title="Main Takeaways"
      subHeading="The essential points you need to know."
      text={`Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint. Velit officia consequat duis enim velit mollit.
              Exercitation veniam consequat.`}
      buttonText="Summarize Documents"
      visual={
        <video ref={videoRef} autoPlay muted >
          <source src="/book_search.mp4" type="video/mp4"
            className="w-full max-w-xs mx-auto sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
          />
          Your browser does not support video
        </video>
      }
    />
  );
};

function GenerateQuizSection() {
  useEffect(() => {
    const existingScript = document.querySelector('script[src="https://unpkg.com/@lottiefiles/lottie-player@2.0.8/dist/lottie-player.js"]');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = "https://unpkg.com/@lottiefiles/lottie-player@2.0.8/dist/lottie-player.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);
  return (
    <HomepageSection
      title="Generate Quiz"
      subHeading="The essential points you need to know."
      text={`Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint. Velit officia consequat duis enim velit mollit.
              Exercitation veniam consequat.`}
      buttonText="Generate Quiz"
      visual={
        <lottie-player
          src="https://lottie.host/41a48463-73fd-4e3e-9a9f-06710175c158/dkCsGd04ZC.json"
          background="##FFFFFF"
          className="w-full max-w-xs mx-auto sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
          autoplay
          loop
        ></lottie-player>
      }
    />
  );
}

function MultipleSelection() {
  return (
    <section className="min-h-[75vh]">
      <div className="flex bg-cyan-600 my-[20vh] min-h-[15vh] items-center justify-center">
        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-center">
          Explore our tools and become more productive
        </h1>
      </div>
      <div className="flex flex-col-reverse my-0 py-0 lg:flex-row  px-0 mx-auto sm:px-0 lg:px-8 max-w-7xl items-center justify-evenly">
        <Card text="Summarize Documents" />
        <Card text="Query Based Summary" />
        <Card text="Generate Quiz" />

      </div>
    </section>

  );
}


const Card = ({ text }) => {
  return (
    <StyledWrapper>
      <div className="card my-5 lg:my-0">{text}</div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .card {
    position: relative;
    width: 220px;
    height: 320px;
    background: #06b6d4;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 25px;
    font-weight: bold;
    border-radius: 15px;
    text-align:center;
    cursor: pointer;
  }

  .card::before,
  .card::after {
    position: absolute;
    content: "";
    width: 20%;
    height: 20%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 25px;
    font-weight: bold;
    background-color: lightblue;
    transition: all 0.5s;
  }

  .card::before {
    top: 0;
    right: 0;
    border-radius: 0 15px 0 100%;
  }

  .card::after {
    bottom: 0;
    left: 0;
    border-radius: 0 100%  0 15px;
  }

  .card:hover::before,
  .card:hover:after {
    width: 100%;
    height: 100%;
    border-radius: 15px;
    transition: all 0.5s;
  }

  .card:hover:after {
    content: "Explore";
  }`;


