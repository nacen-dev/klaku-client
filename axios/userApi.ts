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
});

export const registerUser = (userData: SignUpFormData) => {
  return api
    .post("/users", { ...userData })
    .then((res) => res)
    .catch((error) => error.response);
};
