import axios from "axios";
import { IAuth } from "../context/StateContext";

export type SignUpFormData = {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  passwordConfirmation: string;
};

export const authAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export const registerUser = async (userData: SignUpFormData) => {
  const res = await authAPI.post("/users", { ...userData });
  return res;
};

export const loginUser = async (loginData: {
  email: string;
  password: string;
}) => {
  const res = await authAPI.post("/sessions", JSON.stringify({ ...loginData }));
  return res;
};

export const logoutUser = async (auth: IAuth) => {
  const res = await authAPI.delete("/sessions", {
    headers: { Authorization: `Bearer ${auth}` },
  });
  return res;
};

export const getRefreshToken = async () => {
  const res = await authAPI.post("/sessions/refresh");
  return res;
};
