import axios from "axios";

export type SignUpFormData = {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  passwordConfirmation: string;
};

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export const registerUser = async (userData: SignUpFormData) => {
  const res = await api.post("/users", { ...userData });
  return res;
};

export const loginUser = async (loginData: { email: string; password: string }) => {
  const res = await api
    .post("/sessions", JSON.stringify({ ...loginData }));
  return res;
};

export const logoutUser = async (auth: string) => {
  const res = await api
    .delete("/sessions", { headers: { Authorization: `Bearer ${auth}` } });
  return res;
};