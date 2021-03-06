import React, { FC, SyntheticEvent, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Button } from "../Button/Button";
import { ErrorText } from "../ErrorText/ErrorText";
import { Loader } from "../Loader/Loader";

interface Props {}

export const CheckoutForm: FC<Props> = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${process.env.NEXT_PUBLIC_HOST_URL}/payment`,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      if (typeof error.message === "string") {
        setMessage(error.message);
      }
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <h2 className="text-2xl my-4 text-center">Payment Information</h2>
      <PaymentElement />
      {isLoading ? (
        <div className="h-full flex flex-col items-center justify-center">
          <Loader />
          <span className="text-xl">Loading...</span>
        </div>
      ) : (
        <>
          <Button
            type="submit"
            disabled={isLoading || !stripe || !elements}
            className="mt-4 px-4 py-3 bg-sky-700 text-white rounded w-full"
          >
            <span id="button-text">Pay now</span>
          </Button>
          {/* Show any error or success messages */}
          {message && <ErrorText className="text-center mt-4" message={message} />}
        </>
      )}
    </form>
  );
};
