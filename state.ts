import { createGlobalState } from "react-hooks-global-state";

export interface IAuth {
  accessToken: string;
}

export interface ICartItem {
  productId: string;
  quantity: number;
}

export interface ICart {
  items: ICartItem[];
}

interface IState {
  auth: IAuth;
  cart: ICart[];
}

export const { useGlobalState, getGlobalState, setGlobalState } =
  createGlobalState<IState>({
    auth: { accessToken: "" },
    cart: [],
  });
