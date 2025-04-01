import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:3000/pocketdoc",

  headers: {
    "accept": "application/json",
    "content-type": "application/json"
  },
})

apiClient.interceptors.request.use(
  (config) => {
    console.log(config)
    if (config.protected) {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      delete config.protected;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default apiClient;
