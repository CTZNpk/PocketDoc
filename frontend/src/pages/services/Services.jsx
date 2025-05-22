import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, FileQuestion, Brain } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import FeatureCard from "@/components/FeatureCard";
import useSummary from "@/hooks/useSummary";
import ReactMarkdown from "react-markdown";

export default function Services() {
  const [input, setInput] = useState("");
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { generatePassageSummary } = useSummary();

  const navigate = useNavigate();

  const navigateToDocument = () => {
    navigate("/myDocuments");
  };

  const navigateToQuiz = () => {
    navigate("/myQuiz");
  };

  const handleSummaryGeneration = async () => {
    if (!input.trim()) return;
    setIsLoading(true);

    const summary = await generatePassageSummary({
      passage: input.trim(),
    });

    const cleanedMarkdown = summary
      .replace(/^```(?:\w+)?\n/, "")
      .replace(/```$/, "");
    setSummary(cleanedMarkdown);

    setIsLoading(false);
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
              onClick={handleSummaryGeneration}
              disabled={isLoading}
              className={`mt-4 px-6 py-2 rounded-md font-medium text-white bg-gradient-to-r from-cyan-600 to-cyan-500
    ${isLoading ? "opacity-50 cursor-not-allowed" : "hover:from-cyan-500 hover:to-cyan-400"}
  `}
            >
              {isLoading ? "Summarizing..." : "Summarize"}
            </button>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Summary Output
            </label>
            <div className="w-full max-h-[300px] overflow-y-auto bg-gray-800/60 border border-gray-700 rounded-md p-4 text-gray-300">
              <ReactMarkdown className="prose prose-invert">
                {summary ||
                  "Summary will appear here after clicking summarize."}
              </ReactMarkdown>
            </div>
          </div>
        </div>

        {/* Features Section */}

        <h2 className="text-3xl font-semibold text-center mb-12">
          What You Can Do with PocketDoc
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div onClick={navigateToDocument}>
            <FeatureCard
              title="Summarize Documents"
              description="Get the essential points from any document in seconds."
              icon={<BookOpen className="h-8 w-8 text-cyan-400" />}
              hoverEffect={false}
            />
          </div>
          <div onClick={navigateToDocument}>
            <FeatureCard
              title="Query-Based Summary"
              description="Ask specific questions and get targeted information."
              icon={<FileQuestion className="h-8 w-8 text-cyan-400" />}
              hoverEffect={false}
            />
          </div>
          <div onClick={navigateToQuiz}>
            <FeatureCard
              title="Generate Quiz"
              description="Create custom quizzes to test your knowledge."
              icon={<Brain className="h-8 w-8 text-cyan-400" />}
              hoverEffect={false}
            />
          </div>
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
