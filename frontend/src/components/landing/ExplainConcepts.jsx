import { FileQuestion } from "lucide-react";
import { Button } from "../ui/button";

export default function ExplainConceptsSection() {
  return (
    <div className="py-24 px-4 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800"></div>

      <div className="container mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
          {/* Left image */}
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
              Understand Concepts
            </h2>
            <p className="text-xl text-gray-300 mb-4">
              Ask PocketDoc to explain what you don’t understand.
            </p>
            <p className="text-gray-400 mb-8">
              Whether it's a complex paragraph or technical topic, PocketDoc’s
              AI can explain it in simple terms — just like a tutor. Learn at
              your pace, with clarity.
            </p>

            <Button className="px-8 py-4 rounded-lg text-lg bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400">
              Explain This <FileQuestion className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
