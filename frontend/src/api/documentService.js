import apiClient from "./apiClient";

export const getUserDocs = async () => {
  const response = await apiClient.get("/document/");
  return response.data;
};

export const uploadUserDoc = async (file, title) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("title", title);
  const response = await apiClient.post("/document/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data.data;
};

export const getUserDocFromId = async (docId) => {
  const response = await apiClient.get(`/document/${docId}`, {
    responseType: "blob",
  });
  return response.data.arrayBuffer();
};

export const getDocMetaFromId = async (docId) => {
  const response = await apiClient.get(`/document/${docId}/meta`);
  return response.data;
};

export const generateEmbeddings = async (docId) => {
  const response = await apiClient.get(`/document/${docId}/embed`);
  return response.data;
};

