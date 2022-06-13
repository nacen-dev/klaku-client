import React from "react";
import { BsBag } from "react-icons/bs";

interface Props {}

export const Cart = (props: Props) => {
  const cartItemCount = 0;
  return (
    <div className="flex cursor-pointer gap-3">
      <p>Cart</p>
      <BsBag className="text-2xl relative" />
      <span className="bg-red-700 text-white rounded-xl px-1 text-xs flex items-center justify-center min-w-[22px] absolute right-3">
        {cartItemCount}
      </span>
    </div>
  );
};
