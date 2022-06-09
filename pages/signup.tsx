import type { NextPage } from "next";
import { useState } from "react";
import { useMutation } from "react-query";
import { registerUser } from "../axios/userApi";
import { SignupForm } from "../components/SignupForm/SignupForm";

const Signup: NextPage = () => {
  const [signUpMessage, setSignUpMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { mutate } = useMutation(registerUser, {
    onSuccess: (responseData) => {
      console.log(responseData);

      if (responseData.status === 200) {
        setErrorMessage("");
        setSignUpMessage(responseData.data.message);
      } else {
        setErrorMessage(responseData.data.error);
        setSignUpMessage("");
      }
    },
    onError: () => {
      setErrorMessage("An error has occurred");
    },
  });

  return (
    <div className="flex justify-center items-center h-[80%]">
      <SignupForm
        submit={mutate}
        signUpMessage={signUpMessage}
        errorMessage={errorMessage}
      />
    </div>
  );
};

export default Signup;
