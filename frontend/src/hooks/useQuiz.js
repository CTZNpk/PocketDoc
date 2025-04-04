import { generateQuiz } from "@/api/quizService";
import { emitToast } from "../utils/emitToast";

const useQuiz = () => {
  const generateQuizFromDoc = async (details) => {
    try {
      const response = await generateQuiz(details);
      console.log("RESPONSE");
      console.log(response);
      return response.quizId;
    } catch (e) {
      emitToast(`Error getting Summary: ${e}`);
    }
  };

  return {
    generateQuizFromDoc,
  };
};

export default useQuiz;
