import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import ThemeButton from "../Button";
import { BookOpen } from "lucide-react";

export default function SummarizeDocumentSection() {
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
            src="https://lottie.host/9987ad62-e21f-43e9-ab81-480527edb542/YQ365Eaw2H.lottie"
            className="w-[400px]"
            loop
            autoplay
          />
        </div>
      </div>
    </div>
  );
}
