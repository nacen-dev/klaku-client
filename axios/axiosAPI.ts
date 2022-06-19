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

export const axiosAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export const getRefreshToken = async () => {
  const res = await axiosAPI.post<IAuth>("/sessions/refresh");
  return res.data;
};

const getAuth = () => getGlobalState("auth");
const setAuth = (value: IAuth) => setGlobalState("auth", value);

axiosAPI.interceptors.request.use(
  (config) => {
    if (config.headers && !config.headers["Authorization"]) {
      config.headers["Authorization"] = `Bearer ${getAuth().accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosAPI.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalConfig = error.config;
    console.log(error.response);
    if (error.response.status === 403 && !originalConfig._retry) {
      originalConfig._retry = true;
      try {
        const refreshToken = await getRefreshToken();
        setAuth(refreshToken);
        return axiosAPI(originalConfig);
      } catch (_error) {
        console.log("caught", _error);
        return Promise.reject(_error);
      }
    }
    return Promise.reject(error);
  }
);

export const registerUser = async (userData: SignUpFormData) => {
  const res = await axiosAPI.post("/users", { ...userData });
  return res;
};

export const loginUser = async (loginData: {
  email: string;
  password: string;
}) => {
  const res = await axiosAPI.post("/sessions", JSON.stringify({ ...loginData }));
  return res;
};

export const logoutUser = async (auth: IAuth) => {
  const res = await axiosAPI.delete("/sessions", {
    headers: { Authorization: `Bearer ${auth.accessToken}` },
  });
  return res;
};

export const getOrders = async () => {
  const res = await axiosAPI.get("/orders");
  return res;
};

interface IReview {
  name: string;
  comment: string;
  rating: number;
}

export interface IProduct {
  _id: string;
  name: string;
  description: string;
  image: string;
  size?: string;
  color?: string;
  category?: string;
  rating: number;
  stock: number;
  reviews: IReview[];
  price: number;
}

export const getAllProducts = (): Promise<IProduct[]> =>
  axiosAPI.get("/products").then((res) => res.data);

export const getProductById = (productId: string): Promise<IProduct> =>
  axiosAPI.get(`/products/${productId}`).then((res) => res.data);
