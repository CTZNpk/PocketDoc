import {
  FileText,
  Sparkles,
  ListChecks,
  Gauge,
  Wand2,
  Workflow,
  LineChart,
  CheckCircle2,
  Users,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white">
      <Navbar />
      <div className="container mx-auto py-16 px-4 mt-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">
            About PocketDoc
          </h1>
          <p className="text-gray-400 max-w-3xl mx-auto">
            Empowering learners and educators with smart document
            understanding—summarize, study, and assess effortlessly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-semibold text-white border-b border-gray-700 pb-2 mb-6">
              Our Platform
            </h2>
            <p className="text-gray-300 mb-4">
              PocketDoc transforms your documents into digestible summaries and
              intelligent quizzes using cutting-edge AI. Whether you’re a
              student, teacher, or lifelong learner, PocketDoc helps you grasp
              key ideas and test understanding—all from a single file.
            </p>
            <p className="text-gray-300 mb-4">
              Upload any learning material—PDFs, articles, handouts—and get
              clean, context-aware summaries plus customizable quizzes. Our
              system prioritizes affordability and ease of use without
              compromising intelligence.
            </p>
            <p className="text-gray-300">
              Built for accessibility and performance, PocketDoc is lightweight
              and optimized for everyday devices. You get meaningful insights,
              effective assessments, and a personalized learning journey.
            </p>
          </div>

          <div className="rounded-lg overflow-hidden flex items-center justify-center p-8 bg-gray-800/30">
            <div className="grid grid-cols-2 gap-6 w-full">
              <FeatureIcon
                icon={<FileText />}
                title="Document Upload"
                desc="Bring your own content"
              />
              <FeatureIcon
                icon={<Sparkles />}
                title="Smart Summarization"
                desc="Key idea extraction"
              />
              <FeatureIcon
                icon={<ListChecks />}
                title="Quiz Generator"
                desc="AI-crafted questions"
              />
              <FeatureIcon
                icon={<Gauge />}
                title="Insights"
                desc="Track and learn smarter"
              />
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-white border-b border-gray-700 pb-2 mb-6">
            Why PocketDoc?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Wand2 />}
              title="Query-Sensitive Summarization"
              desc="Get focused summaries based on your topic of interest or exam scope—no fluff."
            />
            <FeatureCard
              icon={<Workflow />}
              title="Custom Quizzes"
              desc="Choose question types, topics, and difficulty. Tailor your assessments your way."
            />
            <FeatureCard
              icon={<LineChart />}
              title="Complete Document Summary"
              desc="Get a concise, AI-powered overview of your entire document to quickly grasp key ideas and concepts."
            />
            <FeatureCard
              icon={<CheckCircle2 />}
              title="Lightweight AI"
              desc="Runs on standard machines—perfect for students and schools on a budget."
            />
            <FeatureCard
              icon={<Users />}
              title="For Everyone"
              desc="Designed for students, teachers, and self-learners across fields."
            />
            <FeatureCard
              icon={<ShieldCheck />}
              title="Secure & Private"
              desc="Your documents stay yours. Privacy-first architecture."
            />
          </div>
        </div>

        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-semibold text-white mb-6">
                Simplify Learning. Amplify Understanding.
              </h2>
              <p className="text-gray-300 mb-6">
                PocketDoc gives you control over your learning. No distractions,
                no complexity—just your content and our AI working together.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400">
                  Try PocketDoc Free
                </Button>
                <Button className="px-6 py-3 bg-gray-700 hover:bg-gray-600">
                  See Demo
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <StatCard value="100K+" label="Documents Summarized" />
              <StatCard value="1M+" label="Quizzes Generated" />
              <StatCard value="95%" label="Quiz Accuracy" />
              <StatCard value="Free" label="Forever Plan Available" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

// Reusable Components
function FeatureIcon({ icon, title, desc }) {
  return (
    <div className="p-4 bg-gray-800 rounded-lg text-center">
      <div className="h-8 w-8 text-cyan-400 mx-auto mb-3">{icon}</div>
      <h3 className="text-lg font-medium text-white mb-1">{title}</h3>
      <p className="text-gray-400 text-sm">{desc}</p>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="p-6 bg-gray-800/50 rounded-lg">
      <div className="h-8 w-8 text-cyan-400 mb-4">{icon}</div>
      <h3 className="text-lg font-medium text-white mb-2">{title}</h3>
      <p className="text-gray-400">{desc}</p>
    </div>
  );
}

function StatCard({ value, label }) {
  return (
    <div className="p-5 bg-gray-800/50 rounded-lg text-center">
      <h3 className="text-3xl font-bold text-cyan-400 mb-1">{value}</h3>
      <p className="text-gray-400">{label}</p>
    </div>
  );
}
