import axios from "axios";

export const BASE_URL = "http://localhost:3000/pocketdoc/";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    accept: "application/json",
    "content-type": "application/json",
  },
  withCredentials: true,
});

export default apiClient;
