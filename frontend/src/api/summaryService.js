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
// api/summaries.js
export const getSummaryFromPages = async (documentId, start_page, end_page) => {
  try {
    // 1. First get document details
    const documentRes = await apiClient.get(`/documents/${documentId}`);
    
    // 2. Call storage endpoint
    const response = await apiClient.post(
      '/summarize/store-summary-doc',
      {
        document_id: documentId,
        file_path: documentRes.data.filePath,
        start_page: start_page,
        end_page: end_page
      },
      { protected: true }
    );

    return response.data;

  } catch (error) {
    console.error('Summary Error:', {
      documentId,
      pages: `${start_page}-${end_page}`,
      error: error.response?.data || error.message
    });
    throw error;
  }
};