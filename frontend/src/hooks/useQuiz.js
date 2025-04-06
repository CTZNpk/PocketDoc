import { generateQuiz, getQuizById } from "@/api/quizService";
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

  const getQuiz = async (quizId) => {
    try {
      const response = await getQuizById(quizId);
      return response;
    } catch (e) {
      emitToast(`Error getting Summary: ${e}`);
    }
  };

  return {
    getQuiz,
    generateQuizFromDoc,
  };
};

export default useQuiz;
