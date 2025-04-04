import apiClient from "./apiClient";

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
