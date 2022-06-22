import React from "react";
import { BsBag } from "react-icons/bs";
import { Sidebar } from "../Sidebar/Sidebar";
import { BsArrowLeft } from "react-icons/bs";
import { calculateSubTotal, cartItemsCount, useGlobalState } from "../../state";
import { CartItems } from "./CartItems";
import { Button } from "../Button/Button";
import Link from "next/link";

export interface CartProps {}

export const Cart: React.FC<CartProps> = (props) => {
  const [showCart, setShowCart] = useGlobalState("showCart");
  const [cart, setCart] = useGlobalState("cart");

  const openCart = () => setShowCart(true);

  const closeCart = () => setShowCart(false);

  const itemsCount = cartItemsCount();
  const subTotal = calculateSubTotal();

  return (
    <>
      <div className="flex cursor-pointer gap-3" onClick={openCart}>
        <p>Cart</p>
        <BsBag className="text-2xl relative" title="cart" />
        <span className="bg-red-700 text-white rounded-xl px-1 text-xs flex items-center justify-center min-w-[22px] absolute right-3">
          {itemsCount}
        </span>
      </div>
      <Sidebar
        show={showCart}
        close={closeCart}
        className="max-w-[450px] !w-full"
      >
        <div className="p-4 flex flex-col h-full">
          <div className="flex items-center gap-4 mb-8">
            <BsArrowLeft
              className="text-4xl cursor-pointer"
              onClick={closeCart}
            />
            <p className="text-2xl mr-auto ml-auto">Your Cart</p>
          </div>
          <CartItems cart={cart} className="flex-grow" />
          <div className="mt-8">
            <div className="flex justify-between">
              <span className="text-lg">
                Subtotal{" "}
                {itemsCount > 1 ? `${itemsCount} Items` : `${itemsCount} Item`}
              </span>
              <span className="text-lg">${subTotal}</span>
            </div>
            <Button className="mt-4 bg-sky-700">
              <Link href="/checkout">
                <a className="w-full block">Checkout</a>
              </Link>
            </Button>
          </div>
        </div>
      </Sidebar>
    </>
  );
};
