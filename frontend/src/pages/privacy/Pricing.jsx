import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle2 } from "lucide-react";

export default function Pricing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-24 text-center">
        <h1 className="text-4xl font-bold mb-4">Pricing</h1>
        <p className="text-gray-400 text-lg mb-12">
          PocketDoc is completely free — no hidden fees, no credit card
          required.
        </p>

        <div className="max-w-md mx-auto bg-gray-800/50 rounded-xl border border-gray-700 p-8">
          <h2 className="text-2xl font-semibold mb-2">Free Plan</h2>
          <p className="text-cyan-400 text-4xl font-bold mb-4">$0</p>
          <ul className="text-left text-gray-300 space-y-3 mb-6">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="text-cyan-400 w-5 h-5 mt-1" />
              Upload and summarize documents
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="text-cyan-400 w-5 h-5 mt-1" />
              AI-generated quizzes
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="text-cyan-400 w-5 h-5 mt-1" />
              Performance insights
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="text-cyan-400 w-5 h-5 mt-1" />
              Unlimited access, forever
            </li>
          </ul>
          <button className="w-full py-3 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white rounded-md font-medium transition">
            Start Using for Free
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
