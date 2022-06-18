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

export const registerUser = (userData: SignUpFormData) => {
  return api.post("/users", { ...userData }).then((res) => res);
};

export const loginUser = (loginData: { email: string; password: string }) => {
  return api
    .post("/sessions", JSON.stringify({ ...loginData }))
    .then((res) => res);
};

export const logoutUser = (auth: string) => {
  return api
    .delete("/sessions", { headers: { Authorization: auth } })
    .then((res) => res);
};
