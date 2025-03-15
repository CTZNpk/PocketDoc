import apiClient from "./apiClient";

export const getSummaryFromPassage = async (passage) => {
  const response = await apiClient.post("/summarize/", {
    passage: passage,
  });
  console.log(response);
  return response.data;
};

export const getSummaryFromChapterId = async (chapterId) => {
  const response = await apiClient.get(`/summarize/${chapterId}`, {
    protected: true,
  });
  console.log(response);
  return response.data;
};

export const getSummaryFromPages = async (documentId, start_page, end_page) => {
  const response = await apiClient.post(
    `/summarize/summarize-doc/`,
    {
      document_id: documentId,
      start_page: start_page,
      end_page: end_page,
    },
    {
      protected: true,
    },
  );
  return response.data;
};
