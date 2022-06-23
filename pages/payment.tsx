import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js/pure";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { PaymentStatus } from "../components/PaymentStatus/PaymentStatus";


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY as string);

const Payment:NextPage = () => {
  const router = useRouter();

  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    setClientSecret(router.query.payment_intent_client_secret as string);
  }, []);

  return (
    <div className="h-fit-content p-[5%] bg-neutral-200">
      {clientSecret && (
        <Elements key={clientSecret} stripe={stripePromise}>
          <PaymentStatus clientSecret={clientSecret} />
        </Elements>
      )}
    </div>
  );
};

export default Payment;
