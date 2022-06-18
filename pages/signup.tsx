import axios from "axios";
import type { NextPage } from "next";
import { useState } from "react";
import { useMutation } from "react-query";
import { registerUser } from "../axios/userApi";
import { SignupForm } from "../components/SignupForm/SignupForm";

const Signup: NextPage = () => {
  const [signUpMessage, setSignUpMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { mutate, error } = useMutation(registerUser, {
    onSuccess: (responseData) => {
      console.log(responseData);

      if (responseData.status === 200) {
        setErrorMessage("");
        setSignUpMessage(responseData.data.message);
      } else {
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
