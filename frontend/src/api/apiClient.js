import { getNavigate } from "@/utils/navigateFunction";
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

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const navigate = getNavigate();
      if (navigate) {
        navigate("/login");
      } else {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);
export default apiClient;
