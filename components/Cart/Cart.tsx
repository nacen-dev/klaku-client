import React, { useState } from "react";
import { BsBag } from "react-icons/bs";
import { Sidebar } from "../Sidebar/Sidebar";
import { BsArrowLeft } from "react-icons/bs";
import { useGlobalState } from "../../state";
import { CartItems } from "./CartItems";

export interface CartProps {}

export const Cart: React.FC<CartProps> = (props) => {
  const [showCart, setShowCart] = useState(false);
  const [cart, setCart] = useGlobalState("cart");

  const openCart = () => setShowCart(true);

  const closeCart = () => setShowCart(false);

  return (
    <>
      <div className="flex cursor-pointer gap-3" onClick={openCart}>
        <p>Cart</p>
        <BsBag className="text-2xl relative" />
        <span className="bg-red-700 text-white rounded-xl px-1 text-xs flex items-center justify-center min-w-[22px] absolute right-3">
          {cart.length}
        </span>
      </div>
      <Sidebar
        show={showCart}
        close={closeCart}
        className="max-w-[450px] !w-full"
      >
        <div className="p-4">
          <div className="flex items-center gap-4 mb-8">
            <BsArrowLeft
              className="text-4xl cursor-pointer"
              onClick={closeCart}
            />
            <p className="text-2xl mr-auto ml-auto">Your Cart</p>
          </div>
          <CartItems cart={cart} />
        </div>
      </Sidebar>
    </>
  );
};
