import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { GiCheckMark } from "react-icons/gi";
import { resendVerification, verifyUser } from "../axios/axiosAPI";
import { Button } from "../components/Button/Button";
import { ErrorText } from "../components/ErrorText/ErrorText";

type Props = {};

const Verify = (props: Props) => {
  const router = useRouter();
  const [verificationMessage, setVerificationMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [isExpiredLink, setIsExpiredLink] = useState(false);

  useEffect(() => {
    if (!router.query.email && !router.query.token) {
      router.push("/");
    }
  }, []);

  const verifyAccount = async () => {
    const { email, token } = router.query;
    try {
      const response = await verifyUser(email as string, token as string);
      setVerificationMessage(response.message);
      setIsVerified(response.verified);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const err = error as AxiosError<{ message: string; expired: boolean }>;
        if (err.response?.data) {
          setErrorMessage(err.response.data.message);
          setIsExpiredLink(err.response.data.expired);
        } else {
          setErrorMessage("An Error has occurred");
        }
      } else {
        setErrorMessage("An Error has occurred.");
      }
    }
  };

  const resendVerificationLink = async () => {
    const { email } = router.query;
    try {
      const response = await resendVerification(email as string);
      setVerificationMessage(response.message);
      if (response.verified) {
        setIsVerified(response.verified);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const renderVerificationMessage = () => {
    if (verificationMessage) {
      return (
        <div className="flex flex-col justify-center items-center my-4 gap-4">
          {isVerified && (
            <div className="rounded-[50%] border-2 border-emerald-700 bg-emerald-700 p-4">
              <GiCheckMark className="text-white text-4xl" />
            </div>
          )}
          <span className="text-lg text-emerald-700">
            {verificationMessage}
          </span>
          {isExpiredLink && !isVerified && (
            <Button onClick={resendVerificationLink}>
              Resend Verification
            </Button>
          )}
          {isVerified && (
            <Button>
              <Link href="/login">Login</Link>
            </Button>
          )}
        </div>
      );
    } else if (errorMessage) {
      return (
        <div className="mt-8">
          <ErrorText message={errorMessage} className="mb-4 text-center" />
          {isExpiredLink && (
            <Button onClick={resendVerificationLink}>
              Resend Verification
            </Button>
          )}
        </div>
      );
    } else {
      return (
        <>
          <p className="my-8">
            You have successfully created an account. Please click on the button
            below to complete your registration.
          </p>
          <Button onClick={verifyAccount}>Verify Account</Button>
        </>
      );
    }
  };

  return (
    <div className="h-fit-content bg-neutral-200 p-[5%]">
      <div className="bg-white shadow-md max-w-[640px] items-center ml-auto mr-auto p-8 rounded-lg">
        <h1 className="font-semibold text-2xl text-slate-700 text-center">
          Verification
        </h1>
        {renderVerificationMessage()}
      </div>
    </div>
  );
};

export default Verify;
