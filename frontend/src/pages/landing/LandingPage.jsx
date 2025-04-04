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
    <div className="pt-20 min-h-[90vh] pb-4 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-cyan-900 opacity-30"></div>

      {/* Animated dots/particles effect */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <div className="absolute h-40 w-40 rounded-full bg-cyan-600/20 blur-3xl top-1/4 left-1/4 animate-pulse"></div>
        <div className="absolute h-60 w-60 rounded-full bg-indigo-600/10 blur-3xl bottom-1/4 right-1/3 animate-pulse"></div>
      </div>

      <div className="container mx-auto text-center relative z-10">
        <p className="text-cyan-400 font-medium mb-4">
          A Hub for Students, Teachers & Researchers
        </p>
        <Title>PocketDoc</Title>
        <h2 className="text-2xl md:text-3xl text-gray-300 font-light mb-6">
          Your Friendly Pocket LLM
        </h2>
        <p className="max-w-xl mx-auto text-gray-400 mb-8">
          Transform how you interact with documents. Extract key insights,
          generate personalized quizzes, and enhance your learning with
          AI-powered document analysis that adapts to your needs.
        </p>
        <ThemeButton className="px-8 py-4 rounded-lg text-lg">
          Start Exploring <ChevronRight className="ml-2 h-5 w-5" />
        </ThemeButton>
      </div>

      <div className="mt-12 w-full max-w-2xl mx-auto">
        <img
          className="w-full drop-shadow-2xl animate-float"
          src="https://landingfoliocom.imgix.net/store/collection/dusk/images/hero/1/3d-illustration.png"
          alt="3D Illustration"
        />
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

          <div className="lg:w-1/2 rounded-xl overflow-hidden border border-gray-800 shadow-2xl shadow-cyan-900/20">
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              className="w-full rounded-xl"
            >
              <source src="/book_search.mp4" type="video/mp4" />
              Your browser does not support video
            </video>
          </div>
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
          <div className="lg:w-1/2 rounded-xl overflow-hidden border border-gray-800 shadow-2xl shadow-cyan-900/20 bg-gray-900 p-4">
            <lottie-player
              src="https://lottie.host/41a48463-73fd-4e3e-9a9f-06710175c158/dkCsGd04ZC.json"
              background="transparent"
              className="w-full"
              style={{ height: "400px" }}
              autoplay
              loop
            ></lottie-player>
          </div>

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
    <div className="py-20 px-4 relative">
      {/* Call to action banner with gradient */}
      <div className="relative mb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-700 to-cyan-500 opacity-90"></div>
        <div className="relative z-10 py-12 px-4 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            Explore our tools and become more productive
          </h2>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>
      </div>

      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            title="Summarize Documents"
            description="Get the essential points from any document in seconds."
            icon={<BookOpen className="h-8 w-8" />}
          />
          <FeatureCard
            title="Query Based Summary"
            description="Ask specific questions and get targeted information."
            icon={<FileQuestion className="h-8 w-8" />}
          />
          <FeatureCard
            title="Generate Quiz"
            description="Create custom quizzes to test your knowledge."
            icon={<Brain className="h-8 w-8" />}
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
