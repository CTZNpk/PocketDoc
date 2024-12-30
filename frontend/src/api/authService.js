import apiClient from "./apiClient";

export const signIn = async (credentials) => {
  const response = await apiClient.post('/user-auth/signin', credentials);
  return response.data;
};

export const signUp = async (userDetails) => {
  const response = await apiClient.post('/user-auth/signup', userDetails);
  return response.data;
};

