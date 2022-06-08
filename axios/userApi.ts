import axios from "axios";

export type signUpFormData = {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  passwordConfirmation: string;
};

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export const registerUser = (userData: signUpFormData) => {
  return api
    .post("users", { ...userData })
    .then((res) => res.data)
    .catch((error) => error);
};
