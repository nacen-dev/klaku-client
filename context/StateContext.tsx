import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

export interface IAuth {
  accessToken: string;
}

interface IStateContext {
  auth: IAuth;
  setAuth: Dispatch<SetStateAction<IAuth>>;
  addToCart: (productId: string, quantity: number) => void;
  deleteFromCart: (productId: string) => void;
  removeItemFromCart: (productId: string, quantity: number) => void;
}

interface ICartItem {
  quantity: number;
  productId: string;
}

interface ICart {
  items: ICartItem[];
}

const StateContext = createContext<IStateContext | null>(null);

interface Props {
  children: React.ReactNode;
}

export const StateProvider = ({ children }: Props) => {
  const [auth, setAuth] = useState({ accessToken: "" });
  const [cart, setCart] = useState<ICart>({
    items: [],
  });

  const indexOfProductInCart = (productId: string) => {
    for (let i = 0; i < cart.items.length; i++) {
      if (cart.items[i].productId === productId) return i;
    }
    return -1;
  };

  const addToCart = (productId: string, quantity: number = 1) => {
    const index = indexOfProductInCart(productId);
    const updatedCart = { ...cart };
    if (index < 0) {
      updatedCart.items.push({ productId, quantity });
    } else {
      updatedCart.items[index].quantity += quantity;
    }
    setCart(updatedCart);
  };

  const deleteFromCart = (productId: string) => {
    setCart({
      items: cart.items.filter((cartItem) => cartItem.productId !== productId),
    });
  };

  const removeItemFromCart = (productId: string, quantity: number = 1) => {
    const index = indexOfProductInCart(productId);
    if (index < 0) return;
    if (quantity - cart.items[index].quantity <= 0) {
      setCart((prevCart) => ({
        items: prevCart.items.splice(index, 1),
      }));
    } else {
      setCart({
        items: cart.items.map((cartItem) =>
          cartItem.productId === productId
            ? { ...cartItem, quantity: cartItem.quantity - quantity }
            : cartItem
        ),
      });
    }
  };

  return (
    <StateContext.Provider
      value={{
        auth,
        setAuth,
        addToCart,
        deleteFromCart,
        removeItemFromCart,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => {
  return useContext(StateContext) as IStateContext;
};
