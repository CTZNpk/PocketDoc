import { Brain } from "lucide-react";
import ThemeButton from "../Button";
import { useNavigate } from "react-router";

export default function GenerateQuizSection() {
  const navigate = useNavigate();
  const navigateToQuiz = () => {
    navigate("/myQuiz");
  };
  return (
    <div className="py-24 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800"></div>
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4">
        <div className="flex flex-col-reverse lg:flex-row-reverse items-center gap-12 w-full">
          <div className="w-full lg:w-1/2 text-center lg:text-right">
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
            <ThemeButton
              className="px-8 py-4 rounded-lg text-lg inline-flex items-center"
              onClick={navigateToQuiz}
            >
              Generate Quiz <Brain className="ml-2 h-5 w-5" />
            </ThemeButton>
          </div>
          <img
            src="/Intro.png"
            alt="Explain Feature Illustration"
            className="h-[250px] w-full max-w-sm mx-auto lg:mx-0"
          />
        </div>
      </div>
    </div>);
}
