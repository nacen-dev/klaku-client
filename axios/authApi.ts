import axios from "axios";
import { IAuth } from "../context/StateContext";
import { getGlobalState, setGlobalState } from "../state";

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

export const getRefreshToken = async () => {
  const res = await authAPI.post<IAuth>("/sessions/refresh");
  return res.data;
};

const getAuth = () => getGlobalState("auth");
const setAuth = (value: IAuth) => setGlobalState("auth", value);

authAPI.interceptors.request.use(
  (config) => {
    if (config.headers && !config.headers["Authorization"]) {
      config.headers["Authorization"] = `Bearer ${getAuth().accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

authAPI.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalConfig = error.config;
    console.log(error.response);
    if (error.response.status === 403 && !originalConfig._retry) {
      originalConfig._retry = true;
      try {
        const refreshToken = await getRefreshToken();
        setAuth(refreshToken);
        return authAPI(originalConfig);
      } catch (_error) {
        console.log("caught", _error);
        return Promise.reject(_error);
      }
    }
    return Promise.reject(error);
  }
);

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
    headers: { Authorization: `Bearer ${auth.accessToken}` },
  });
  return res;
};

export const getOrders = async () => {
  const res = await authAPI.get("/orders");
  return res;
};
