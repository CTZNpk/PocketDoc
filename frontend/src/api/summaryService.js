import apiClient from "./apiClient";

export const getSummaryFromPassage = async (passage) => {
  console.log(passage)
  const response = await apiClient.post("/summarize/", {
    passage: passage
  })
  console.log(response)
  return response.data;
}
