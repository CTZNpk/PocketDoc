import React, { useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, BookOpen, Brain, FileQuestion } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ThemeButton from "@/components/Button";
import Title from "@/components/Title";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white">
      <Navbar />
      <IntroScreen />
      <SummarizeDocumentSection />
      <GenerateQuizSection />
      <FeatureCards />
      <Footer />
    </div>
  );
}

function IntroScreen() {
  return (
    <div className="min-h-[90vh] pb-4 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-cyan-900 opacity-30"></div>

      <div className="mt-20 w-full max-w-md mx-auto">
        <img
          src="/Intro.png"
          alt="3D Illustration"
          className="relative z-10 w-full drop-shadow-2xl animate-float blur-0 "
        />
      </div>

      {/* Animated dots/particles effect */}

      <div className="container mx-auto text-center relative z-10">
        <p className="text-cyan-400 font-medium mb-2 mt-4">
          A Hub for Students, Teachers & Researchers
        </p>
        <Title>PocketDoc</Title>
        <p className="max-w-xl mx-auto text-gray-400 mb-8">
          Transform how you interact with documents. Extract key insights,
          generate personalized quizzes, and enhance your learning with
          AI-powered document analysis that adapts to your needs.
        </p>
        <ThemeButton className="px-8 py-4 rounded-lg text-lg mb-20">
          Start Exploring <ChevronRight className="ml-2 h-5 w-5" />
        </ThemeButton>
      </div>
    </div>
  );
}

function SummarizeDocumentSection() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play();
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.4 },
    );

    if (video) {
      observer.observe(video);
      return () => observer.disconnect();
    }
  }, []);

  return (
    <div className="py-24 px-4 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800"></div>

      <div className="container mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-400">
              Main Takeaways
            </h2>
            <p className="text-xl text-gray-300 mb-4">
              The essential points you need to know.
            </p>
            <p className="text-gray-400 mb-8">
              Extract the most important information from any document with our
              AI-powered summarization. Save hours of reading time by focusing
              only on what matters most to you.
            </p>

            <ThemeButton className="px-8 py-4 rounded-lg text-lg">
              Summarize Documents <BookOpen className="ml-2 h-5 w-5" />
            </ThemeButton>
          </div>
          <DotLottieReact
            src="https://lottie.host/60cefb2c-ece1-4913-b239-dda3815f4443/LnLqNaG88N.lottie"
            loop
            autoplay
          />{" "}
        </div>
      </div>
    </div>
  );
}

function GenerateQuizSection() {
  useEffect(() => {
    const existingScript = document.querySelector(
      'script[src="https://unpkg.com/@lottiefiles/lottie-player@2.0.8/dist/lottie-player.js"]',
    );
    if (!existingScript) {
      const script = document.createElement("script");
      script.src =
        "https://unpkg.com/@lottiefiles/lottie-player@2.0.8/dist/lottie-player.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="py-24 px-4 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800"></div>

      <div className="container mx-auto relative z-10">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12">
          <lottie-player
            src="https://lottie.host/41a48463-73fd-4e3e-9a9f-06710175c158/dkCsGd04ZC.json"
            background="transparent"
            className="w-full"
            style={{ height: "400px" }}
            autoplay
            loop
          ></lottie-player>

          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-400">
              Generate Quiz
            </h2>
            <p className="text-xl text-gray-300 mb-4">
              Test your knowledge with custom quizzes.
            </p>
            <p className="text-gray-400 mb-8">
              Turn any document into interactive quizzes tailored to your
              learning goals. Our AI identifies key concepts and creates
              questions that reinforce your understanding.
            </p>

            <ThemeButton className="px-8 py-4 rounded-lg text-lg">
              Generate Quiz <Brain className="ml-2 h-5 w-5" />
            </ThemeButton>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCards() {
  return (
    <div className="py-20 px-4 relative bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white">
      {/* New Hero Banner */}
      <div className="relative bg-gradient-to-r from-cyan-600 to-cyan-400 rounded-2xl shadow-lg shadow-cyan-900/20 mb-20 px-6 py-16 overflow-hidden">
        <div className="absolute top-0 left-0 w-60 h-60 bg-white/10 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl translate-x-1/2 translate-y-1/2"></div>

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-white leading-tight">
            Unlock Smarter Learning with PocketDoc
          </h2>
          <p className="text-lg text-white/90">
            Summarize, quiz, and master your documents with ease — everything
            you need in one intelligent toolkit.
          </p>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            title="Summarize Documents"
            description="Get the essential points from any document in seconds."
            icon={<BookOpen className="h-8 w-8 text-cyan-400" />}
          />
          <FeatureCard
            title="Query-Based Summary"
            description="Ask specific questions and get targeted information."
            icon={<FileQuestion className="h-8 w-8 text-cyan-400" />}
          />
          <FeatureCard
            title="Generate Quiz"
            description="Create custom quizzes to test your knowledge."
            icon={<Brain className="h-8 w-8 text-cyan-400" />}
          />
        </div>
      </div>
    </div>
  );
}
function FeatureCard({ title, description, icon }) {
  return (
    <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 shadow-lg shadow-cyan-900/10 overflow-hidden group">
      <CardHeader className="pb-2">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-600 to-cyan-400 flex items-center justify-center mb-4 text-white">
          {icon}
        </div>
        <CardTitle className="text-xl text-white">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-gray-400">
        <p>{description}</p>
      </CardContent>
      <CardFooter>
        <Button
          variant="ghost"
          className="text-cyan-400 hover:text-cyan-300 p-0 group-hover:translate-x-2 transition-transform"
        >
          Explore <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </CardFooter>

      {/* Hover effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"></div>
    </Card>
  );
}

// Add this to your global CSS or styled-components
// .animate-float {
//   animation: float 6s ease-in-out infinite;
// }
// @keyframes float {
//   0%, 100% { transform: translateY(0); }
//   50% { transform: translateY(-20px); }
// }
