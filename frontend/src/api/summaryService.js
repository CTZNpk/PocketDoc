import apiClient, { BASE_URL } from "./apiClient";

export const getSummaryFromPassage = async (details) => {
  const response = await apiClient.post("/summarize/", details);
  return response.data;
};

export const getSummaryFromPages = async (details) => {
  const response = await apiClient.post(`/summarize/summarize-doc/`, details);
  return response.data;
};

export const getExplanationFromText = async (details) => {
  const response = await apiClient.post(`/explain/`, details);
  return response.data;
};

export const getQuerySummary = async (details) => {
  const response = await apiClient.post(`summarize/search/`, details);
  return response.data;
};

export const getSummaryFromId = async (summaryId) => {
  const response = await apiClient.get(`summarize/${summaryId}`);
  return response.data;
};
export const getSummaryForUser = async () => {
  const response = await apiClient.get(`summarize/all`);
  return response.data;
};

export const downloadSummary = async (summaryId) => {
  window.open(`${BASE_URL}summarize/${summaryId}/download`, "_blank");
};
