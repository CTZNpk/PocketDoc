import apiClient from "./apiClient";

export const signIn = async (credentials) => {
  const response = await apiClient.post("/user-auth/signin", credentials);
  return response.data;
};

export const signUp = async (userDetails) => {
  const response = await apiClient.post("/user-auth/signup", userDetails);
  return response.data;
};

export const getUser = async () => {
  const response = await apiClient.get("/user-auth/");
  return response.data;
};

export const logoutUser = async () => {
  const response = await apiClient.post("/user-auth/logout");
  return response.data;
};
