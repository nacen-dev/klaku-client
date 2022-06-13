import axios from "axios";

interface IReview {
  name: string;
  comment: string;
  rating: number;
}

interface IProducts {
  _id: string;
  name: string;
  description: string;
  image: string;
  size?: string;
  color?: string;
  category?: string;
  rating: number;
  stock: number;
  reviews?: IReview[];
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export const getAllProducts = (): Promise<IProducts[]> =>
  api.get("/products").then((res) => res.data);
