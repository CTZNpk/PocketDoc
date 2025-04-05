import React from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import IntroScreen from "@/components/landing/IntroScreen";
import SummarizeDocumentSection from "@/components/landing/SummarizeDocumentSection";
import GenerateQuizSection from "@/components/landing/GenerateQuizSection";
import FeatureCards from "@/components/landing/FeatureCards";
import ExplainConceptsSection from "@/components/landing/ExplainConcepts";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white">
      <Navbar />
      <IntroScreen />
      <SummarizeDocumentSection />
      <GenerateQuizSection />
      <ExplainConceptsSection />
      <FeatureCards />
      <Footer />
    </div>
  );
}
