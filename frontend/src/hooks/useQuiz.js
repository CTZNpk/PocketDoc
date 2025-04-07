import {
  downloadQuiz,
  generateQuiz,
  getAllUserQuiz,
  getQuizById,
  submitQuizService,
} from "@/api/quizService";
import { emitToast } from "../utils/emitToast";
import quizStore from "@/store/quizStore";

const useQuiz = () => {
  const { isLatest, setLatestFalse, setQuiz, quiz } = quizStore();
  const generateQuizFromDoc = async (details) => {
    try {
      const response = await generateQuiz(details);
      setLatestFalse();
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

  const downloadQuizFromId = async (quizId) => {
    try {
      downloadQuiz(quizId);
    } catch (e) {
      emitToast(`Error getting Quiz: ${e}`);
    }
  };

  const submitQuiz = async (details) => {
    try {
      const response = await submitQuizService(details);
      return response;
    } catch (e) {
      emitToast(`Error getting Quiz: ${e}`);
    }
  };

  const getUserQuizzes = async () => {
    try {
      if (!isLatest) {
        const response = await getAllUserQuiz();
        setQuiz(response.data);
        return response.data;
      } else {
        return quiz;
      }
    } catch (e) {
      emitToast(`Error getting Quiz: ${e}`);
    }
  };

  return {
    getQuiz,
    generateQuizFromDoc,
    downloadQuizFromId,
    submitQuiz,
    getUserQuizzes,
  };
};

export default useQuiz;
