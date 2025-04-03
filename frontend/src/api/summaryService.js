import apiClient from "./apiClient";

export const getSummaryFromPassage = async (details) => {
  const response = await apiClient.post("/summarize/", details);
  return response.data;
};

export const getSummaryFromPages = async (documentId, start_page, end_page) => {
  const response = await apiClient.post(`/summarize/summarize-doc/`, {
    document_id: documentId,
    start_page: start_page,
    end_page: end_page,
  });
  return response.data;
};

export const getExplanationFromText = async (details) => {
  const response = await apiClient.post(`/explain/`, details);
  return response.data;
};
