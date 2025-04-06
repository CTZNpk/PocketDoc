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

export const getQuerySummary = async (details) => {
  const response = await apiClient.post(`summarize/search/`, details);
  return response.data;
};

export const getSummaryFromId = async (summaryId) => {
  const response = await apiClient.get(`summarize/${summaryId}`);
  console.log("HAHAHHAHH HERE WWWWW");
  console.log(response);
  return response.data;
};
