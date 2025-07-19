import api from "../utils/axios";

export const loginUser = async (email: string, password: string) => {
  const response = await api.post("token/", { email, password });
  return response.data;
};

export const registerUser = async (email: string, password: string) => {
  const response = await api.post("register/", { email, password });
  return response.data;
};
