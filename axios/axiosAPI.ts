import axios from "axios";
import {
  getGlobalState,
  IAuth,
  ICartItem,
  IProduct,
  setGlobalState,
} from "../state";

export type SignUpFormData = {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  passwordConfirmation: string;
};

export const publicAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const privateAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export const getRefreshToken = async () => {
  const res = await privateAPI.post<IAuth>("/sessions/refresh");
  return res.data;
};

const getAuth = () => getGlobalState("auth");
const setAuth = (value: IAuth) => setGlobalState("auth", value);

privateAPI.interceptors.request.use(
  (config) => {
    if (config.headers && !config.headers["Authorization"]) {
      config.headers["Authorization"] = `Bearer ${getAuth().accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

privateAPI.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalConfig = error.config;
    if (error.response.status === 403 && !originalConfig._retry) {
      originalConfig._retry = true;
      try {
        const refreshToken = await getRefreshToken();
        setAuth(refreshToken);
        return privateAPI(originalConfig);
      } catch (_error) {
        console.log("caught", _error);
        return Promise.reject(_error);
      }
    }
    return Promise.reject(error);
  }
);

export const registerUser = async (userData: SignUpFormData) => {
  const res = await publicAPI.post("/users", { ...userData });
  return res;
};

export const loginUser = async (loginData: {
  email: string;
  password: string;
}) => {
  const res = await publicAPI.post(
    "/sessions",
    JSON.stringify({ ...loginData })
  );
  return res;
};

export const logoutUser = async (auth: IAuth) => {
  const res = await privateAPI.delete("/sessions", {
    headers: { Authorization: `Bearer ${auth.accessToken}` },
  });
  return res;
};

export const getOrders = async () => {
  const res = await privateAPI.get("/orders");
  return res;
};

export const getAllProducts = (): Promise<IProduct[]> =>
  publicAPI.get("/products").then((res) => res.data);

export const getProductById = (productId: string): Promise<IProduct> =>
  publicAPI.get(`/products/${productId}`).then((res) => res.data);

export const makePayment = async (
  items: { productId: string; quantity: number }[]
) => {
  const res = await publicAPI.post<{
    clientSecret: string;
    subTotal: number;
    shippingPrice: number;
  }>("/payment", {
    items,
  });
  return res.data;
};

export const verifyUser = async (email: string, token: string) => {
  const res = await publicAPI.post<{ message: string }>("/users/verify", {
    email,
    token,
  });
  return res.data;
};
