import axios from "axios";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { loginUser } from "../axios/axiosAPI";
import { ErrorText } from "../components/ErrorText/ErrorText";
import { LoginForm } from "../components/LoginForm/LoginForm";
import { useGlobalState } from "../state";

interface Props {}

const Login: NextPage<Props> = () => {
  const { mutate, error } = useMutation(loginUser);
  const [errorMessage, setErrorMessage] = useState("");
  const [ auth, setAuth] = useGlobalState("auth")
  const router = useRouter();

  const handleLogin = async (userData: { email: string; password: string }) => {
    mutate(userData, {
      onSuccess: (responseData) => {
        setErrorMessage("");
        setAuth({ accessToken: responseData.data.accessToken });
        if (router.query && router.query.from) {
          router.push(router.query.from as string);
        } else {
          router.push("/");
        }
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          if (!error.response?.data) {
            setErrorMessage("An Error has occurred.");
          } else {
            setErrorMessage("Invalid username or password.");
          }
        }
      },
    });
  };

  return (
    <div className="h-[90vh] px-[10%] sm:px-[15%] md:px-[20%] flex flex-col justify-center">
      <div className="w-full max-w-[400px] mr-auto ml-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Login</h2>
        <ErrorText className="text-center my-2" message={errorMessage} />
        <LoginForm login={handleLogin} />
        <p className="text-center mt-4">
          {"Don't have an account?"}{" "}
          <Link href="/signup">
            <a className="border-b-slate-700 border-b">Sign up now</a>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
