import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { makePayment } from "../axios/axiosAPI";
import { CartItems } from "../components/Cart/CartItems";
import { CheckoutForm } from "../components/CheckoutForm/CheckoutForm";
import { useGlobalState } from "../state";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY as string);

const Checkout: NextPage = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [cart, setCart] = useGlobalState("cart");
  const [shippingPrice, setShippingPrice] = useState(0);
  const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
    const productsData = cart.map((cartItem) => ({
      productId: cartItem.product._id,
      quantity: cartItem.quantity,
    }));

    const payment = async (products: typeof productsData) => {
      try {
        const data = await makePayment(products);
        setClientSecret(data.clientSecret);
        setShippingPrice(data.shippingPrice);
        setSubTotal(data.subTotal);
      } catch (error) {
        console.error(error);
      }
    };

    payment(productsData);
  }, [cart]);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "stripe",
    },
  };

  return (
    <div className="h-full md:h-screen p-[5%] w-90% bg-neutral-200 flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 h-100% px-8 py-4 bg-slate-700 text-white flex flex-col">
        <h2 className="text-2xl my-4 text-center">Order Summary</h2>
        <CartItems cart={cart} className="flex-1" />
        <div className="mt-8 flex flex-col gap-1">
          <div className="flex justify-between text-lg">
            <span>Subtotal:</span>
            <span>${subTotal}</span>
          </div>
          <div className="flex justify-between text-lg">
            <span className="text-lg">Shipping Price: </span>
            <span>${shippingPrice}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-xl">Total: </span>
            <span className="text-2xl font-bold">
              ${subTotal + shippingPrice}
            </span>
          </div>
        </div>
      </div>
      <div className="bg-white px-8 py-4 w-full md:w-1/2 h-full">
        {clientSecret && (
          <Elements options={options} stripe={stripePromise} key={clientSecret}>
            <CheckoutForm />
          </Elements>
        )}
      </div>
    </div>
  );
};

export default Checkout;
