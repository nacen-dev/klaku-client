import axios from "axios";

interface Products {
  name: string;
  description: string;
  _id: string
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export const getAllProducts = (): Promise<Products[]> =>
  api.get("/products").then((res) => res.data);
