import { useElements, useStripe } from "@stripe/react-stripe-js";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { GiCheckMark } from "react-icons/gi";

import { clearCart } from "../../state";
import { Button } from "../Button/Button";

interface Props {
  clientSecret: string;
}

export const PaymentStatus: React.FC<Props> = ({ clientSecret }) => {
  const stripe = useStripe();
  const [message, setMessage] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");

  useEffect(() => {
    if (!stripe) {
      return;
    }

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          clearCart();
          setPaymentStatus("succeeded");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          setPaymentStatus("processing");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          setPaymentStatus("requires_payment_method");
          break;
        default:
          setMessage("Something went wrong.");
          setPaymentStatus("error");
          break;
      }
    });
  }, [stripe]);

  const renderPaymentStatus = (status: string) => {
    switch (status) {
      case "succeeded":
        return (
          <>
            <h2 className="text-3xl text-emerald-700 text-center w-full">
              {message}
            </h2>
            <div className="flex items-center justify-center">
              <div className="rounded-[50%] border-2 border-emerald-700 p-4">
                <GiCheckMark className="text-emerald-700 text-4xl" />
              </div>
            </div>
          </>
        );
      case "processing":
        return (
          <h2 className="text-3xl text-yellow-700 text-center w-full">
            {message}
          </h2>
        );
      default:
        return (
          <>
            <h2 className="text-3xl text-red-700 text-center w-full">
              {message}
            </h2>
            <div className="w-1/2 mr-auto ml-auto">
              <Button>
                <Link href="/checkout">
                  <a className="cursor-pointer">Retry Payment</a>
                </Link>
              </Button>
            </div>
          </>
        );
    }
  };

  return (
    <div className="p-[5%] h-full w-full max-w-[768px] mr-auto ml-auto bg-white text-2xl text-black shadow-lg">
      <div className="flex flex-col gap-8 items-center justify-center h-full">
        {renderPaymentStatus(paymentStatus)}
      </div>
    </div>
  );
};
