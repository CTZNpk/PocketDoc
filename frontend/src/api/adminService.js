import apiClient from "./apiClient";

export const getAllUsers = async () => {
  const response = await apiClient.get("/admin/users");
  return response.data;
};

export const createUser = async (userData) => {
  const response = await apiClient.post("/admin/users", userData);
  return response.data;
};

export const deleteUser = async (userId) => {
  const response = await apiClient.delete(`/admin/users/${userId}`);
  return response.data;
};

export const getUserStats = async () => {
  const response = await apiClient.get("/admin/users/stats");
  return response.data;
};

export const getAllDocuments = async () => {
  const response = await apiClient.get("/admin/documents");
  return response.data;
};

export const uploadDocument = async (documentData) => {
  const response = await apiClient.post("/admin/documents", documentData);
  return response.data;
};

export const deleteDocument = async (docId) => {
  const response = await apiClient.delete(`/admin/documents/${docId}`);
  return response.data;
};

export const getAllQuizzes = async () => {
  const response = await apiClient.get("/admin/quizzes");
  return response.data;
};

export const createQuiz = async (quizData) => {
  const response = await apiClient.post("/admin/quizzes", quizData);
  return response.data;
};

export const deleteQuiz = async (quizId) => {
  const response = await apiClient.delete(`/admin/quizzes/${quizId}`);
  return response.data;
};

export const getQuizStats = async () => {
  const response = await apiClient.get("/admin/quizzes/stats");
  return response.data;
};

export const getDashboardSummaries = async () => {
  const response = await apiClient.get("/admin/dashboard");
  return response.data;
};

export const getAllSummaries = async () => {
  const response = await apiClient.get("/admin/summaries");
  return response.data;
};
