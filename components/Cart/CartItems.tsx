import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  addToCart,
  deleteFromCart,
  handleQuantityChange,
  ICartItem,
  reduceItemFromCart,
} from "../../state";
import { AiOutlineDelete } from "react-icons/ai";

interface Props {
  cart: ICartItem[];
}

export const CartItems = ({ cart }: Props) => {
  return (
    <ul className="flex flex-col gap-4">
      {cart.map((cartItem) => (
        <li key={cartItem.product._id} className="flex">
          <div className="w-[150px] relative">
            <Image
              src={cartItem.product.image}
              layout="fill"
              alt={cartItem.product.name}
            />
          </div>
          <div className="ml-5 flex-1">
            <div className="flex justify-between">
              <Link href={`/shop/products/${cartItem.product._id}`}>
                <a className="text-ellipsis overflow-hidden w-[calc(100%-60px)] block text-xl">
                  {cartItem.product.name}
                </a>
              </Link>
              <span>
                <AiOutlineDelete
                  className="text-2xl cursor-pointer"
                  onClick={() => deleteFromCart(cartItem)}
                />
              </span>
            </div>

            <div className="my-2">
              <p className="mb-2">${cartItem.product.price}</p>
              <div className="flex gap-1 justify-between rounded-2xl border border-slate-200 p-1 w-[100px]">
                <button
                  className="w-6 text-lg"
                  onClick={() => reduceItemFromCart(cartItem)}
                >
                  -
                </button>
                <input
                  max={cartItem.product.stock}
                  className="bg-inherit w-6 text-center"
                  type="number"
                  value={cartItem.quantity}
                  onChange={(event) => handleQuantityChange(cartItem, event)}
                />
                <button
                  className="w-6 text-lg"
                  onClick={() => addToCart(cartItem.product)}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};
