import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000/pocketdoc/",
  headers: {
    "accept": "application/json",
    "content-type": "application/json"
  },
  timeout: 5000,
})
export default apiClient;
