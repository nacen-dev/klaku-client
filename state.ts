import { createGlobalState } from "react-hooks-global-state";

export interface IAuth {
  accessToken: string;
}

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
export interface ICartItem {
  product: IProduct;
  quantity: number;
}

interface IState {
  auth: IAuth;
  cart: ICartItem[];
}

export const { useGlobalState, getGlobalState, setGlobalState } =
  createGlobalState<IState>({
    auth: { accessToken: "" },
    cart: [],
  });

export const indexOfProductInCart = (cart: ICartItem[], productId: string) => {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].product._id === productId) return i;
  }
  return -1;
};

export const addToCart = (product: IProduct, quantity: number = 1) => {
  const cart = getGlobalState("cart");
  const setCart = (value: ICartItem[]) => setGlobalState("cart", value);
  const index = indexOfProductInCart(cart, product._id);
  const updatedCart = [...cart];
  if (index < 0) {
    updatedCart.push({ product, quantity });
  } else {
    updatedCart[index].quantity += quantity;
  }
  setCart(updatedCart);
};

export const deleteFromCart = (cartItem: ICartItem) => {
  const cart = getGlobalState("cart");

  const setCart = (value: ICartItem[]) => setGlobalState("cart", value);
  setCart(cart.filter((cItem) => cItem.product._id !== cartItem.product._id));
};

export const handleQuantityChange = (
  cartItem: ICartItem,
  event: React.ChangeEvent<HTMLInputElement>
) => {
  const cart = getGlobalState("cart");
  const setCart = (value: ICartItem[]) => setGlobalState("cart", value);
  const quantity = Number(event.target.value);

  if (quantity === 0) {
    deleteFromCart(cartItem);
  } else {
    setCart(
      cart.map((cItem) =>
        cItem.product._id === cartItem.product._id
          ? {
              ...cItem,
              quantity:
                quantity > cItem.product.stock ? cItem.product.stock : quantity,
            }
          : cItem
      )
    );
  }
};

export const reduceItemFromCart = (
  cartItem: ICartItem,
  quantity: number = 1
) => {
  const cart = getGlobalState("cart");
  const setCart = (value: ICartItem[]) => setGlobalState("cart", value);
  const index = indexOfProductInCart(cart, cartItem.product._id);
  if (index < 0) return;
  if (cart[index].quantity - quantity <= 0) {
    deleteFromCart(cartItem);
  } else {
    setCart(
      cart.map((cItem) =>
        cItem.product._id === cartItem.product._id
          ? { ...cItem, quantity: cItem.quantity - quantity }
          : cItem
      )
    );
  }
};
