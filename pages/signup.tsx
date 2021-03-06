import axios from "axios";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { registerUser } from "../axios/axiosAPI";
import { SignupForm } from "../components/SignupForm/SignupForm";
import { useGlobalState } from "../state";

const Signup: NextPage = () => {
  const [auth, setAuth] = useGlobalState("auth");

  const router = useRouter();

  useEffect(() => {
    if (auth.accessToken) router.push("/shop");
  }, []);

  const [signUpMessage, setSignUpMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { mutate, error } = useMutation(registerUser, {
    onSuccess: (responseData) => {
      if (responseData.status === 200) {
        setErrorMessage("");
        setSignUpMessage(responseData.data.message);
      }
    },
    onError: () => {
      if (axios.isAxiosError(error)) {
        if (!error.response?.data) {
          setErrorMessage("An error has occurred");
          setSignUpMessage("");
        } else {
          setErrorMessage(error.response?.data as string);
          setSignUpMessage("");
        }
      }
    },
  });

  return (
    <div className="h-[90vh] px-[10%] sm:px-[15%] md:px-[20%] flex flex-col justify-center">
      <h1 className="text-3xl font-bold text-center mb-8">Signup</h1>
      <div className="w-full max-w-[400px] mr-auto ml-auto">
        <SignupForm
          submit={mutate}
          signUpMessage={signUpMessage}
          errorMessage={errorMessage}
        />
      </div>
    </div>
  );
};

export default Signup;
