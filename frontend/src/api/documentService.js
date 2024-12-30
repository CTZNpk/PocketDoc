import apiClient from "./apiClient"

export const getUserDocs = async () => {
  const response = await apiClient.get("/document/", { protected: true })
  return response.data;
}

//TODO
export const uploadUserDoc = async (file, title) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("title", title);
  const response = await apiClient.post("/document/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    protected: true,
  });
  return response.data.data;
}
