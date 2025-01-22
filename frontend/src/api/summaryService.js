import apiClient from "./apiClient";

export const getSummaryFromPassage = async (passage) => {
  const response = await apiClient.post("/summarize/", {
    passage: passage
  })
  console.log(response)
  return response.data;
}

export const getSummaryFromChapterId = async (chapterId) => {
  const response = await apiClient.get(`/summarize/${chapterId}`, { protected: true })
  console.log(response)
  return response.data;
}
