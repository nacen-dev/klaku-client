import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { makePayment } from "../axios/axiosAPI";
import { CheckoutForm } from "../components/CheckoutForm/CheckoutForm";
import { getGlobalState } from "../state";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY as string);

const Checkout: NextPage = () => {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const cart = getGlobalState("cart");
    const payment = async (c: typeof cart) => {
      const data = await makePayment(c);
      setClientSecret(data.clientSecret);
    };
    payment(cart);
  }, []);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "stripe",
    },
  };

  return (
    <div className="h-screen p-8 bg-neutral-200">
      <div className="bg-white p-8 rounded shadow-md mt-[10%] max-w-[640px] mr-auto ml-auto w-full">
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
