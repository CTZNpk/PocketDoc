import { BookOpen, Brain, FileQuestion } from "lucide-react";
import FeatureCard from "../FeatureCard";

export default function FeatureCards() {
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
