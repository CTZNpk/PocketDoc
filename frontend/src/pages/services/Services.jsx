import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, FileQuestion, Brain } from "lucide-react";
import { Link } from "react-router-dom";
import FeatureCards from "@/components/landing/FeatureCards";
import FeatureCard from "@/components/FeatureCard";

export default function Services() {
  const [input, setInput] = useState("");
  const [summary, setSummary] = useState("");

  const handleSummarize = () => {
    if (!input.trim()) return;
    // For now, simulate summary
    setSummary("This is a sample summary. Log in to use the full summarizer.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white flex flex-col">
      <Navbar />

      <div className="container mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold text-center mb-12 mt-10">
          Try Our Summarizer
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <label
              htmlFor="text-input"
              className="block text-sm text-gray-400 mb-2"
            >
              Paste your text here
            </label>
            <textarea
              id="text-input"
              rows={10}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full bg-gray-800/60 text-white border border-gray-700 rounded-md p-4 focus:ring-2 focus:ring-cyan-500 outline-none"
              placeholder="Enter or paste your content..."
            />
            <button
              onClick={handleSummarize}
              className="mt-4 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white px-6 py-2 rounded-md font-medium"
            >
              Summarize
            </button>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Summary Output
            </label>
            <div className="w-full min-h-[160px] bg-gray-800/60 border border-gray-700 rounded-md p-4 text-gray-300">
              {summary || "Summary will appear here after clicking summarize."}
            </div>
          </div>
        </div>

        {/* Login Reminder */}
        <div className="text-center mb-20">
          <p className="text-gray-400 text-lg">
            To access full features like document upload, quiz generation, and
            advanced summaries, please{" "}
            <Link
              href="/login"
              className="text-cyan-400 underline hover:text-cyan-300"
            >
              log in
            </Link>
            .
          </p>
        </div>

        {/* Features Section */}

        <h2 className="text-3xl font-semibold text-center mb-12">
          What You Can Do with PocketDoc
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            title="Summarize Documents"
            description="Get the essential points from any document in seconds."
            icon={<BookOpen className="h-8 w-8 text-cyan-400" />}
            hoverEffect={false}
          />
          <FeatureCard
            title="Query-Based Summary"
            description="Ask specific questions and get targeted information."
            icon={<FileQuestion className="h-8 w-8 text-cyan-400" />}
            hoverEffect={false}
          />
          <FeatureCard
            title="Generate Quiz"
            description="Create custom quizzes to test your knowledge."
            icon={<Brain className="h-8 w-8 text-cyan-400" />}
            hoverEffect={false}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
}

function ServiceCard({ icon, title, desc }) {
  return (
    <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400">{desc}</p>
    </div>
  );
}
