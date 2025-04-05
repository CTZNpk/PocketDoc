import Title from "@/components/Title";
import ThemeButton from "../Button";
import { ChevronRight } from "lucide-react";

export default function IntroScreen() {
  return (
    <div className="min-h-[90vh] pb-4 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-cyan-900 opacity-30"></div>

      <div className="mt-25 w-full max-w-sm mx-auto">
        <img
          src="/logo.png"
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
