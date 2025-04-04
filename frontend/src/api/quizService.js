import apiClient from "./apiClient";

export const generateQuiz = async (details) => {
  const response = await apiClient.post(`quiz/generate/`, details);
  return response.data.data;
};
