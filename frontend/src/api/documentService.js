import apiClient from "./apiClient"

export const getUserDocs = async () => {
  const response = await apiClient.get("/document/", { protected: true })
  return response.data;
}

//TODO
export const uploadUserDoc = async (file) => {
  const response = await apiClient.post("/document/upload", { protected: true })
  return response.data
}
