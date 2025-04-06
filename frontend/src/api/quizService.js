import apiClient, { BASE_URL } from "./apiClient";

export const generateQuiz = async (details) => {
  const response = await apiClient.post(`quiz/generate/`, details);
  return response.data.data;
};

export const getQuizById = async (quizId) => {
  const response = await apiClient.get(`quiz/${quizId}`);
  return response.data;
};

export const submitQuizService = async (details) => {
  const response = await apiClient.post(`quiz/submit/`, details);
  console.log("HERE IS THE RESPONSE");
  console.log(response);
  return response.data;
};

export const downloadQuiz = async (quizId) => {
  window.open(`${BASE_URL}quiz/${quizId}/download`, "_blank");
};
