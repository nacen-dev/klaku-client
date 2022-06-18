import { useRouter } from "next/router";
import React from "react";
import { logoutUser } from "../../axios/userApi";
import { useStateContext } from "../../context/StateContext";

interface Props {}

export const Logout = (props: Props) => {
  const { auth, setAuth } = useStateContext();
  const router = useRouter();

  const handleLogout = async () => {
    await logoutUser(auth);
    setAuth({ accessToken: "" });
    router.push("/");
  };

  return <button onClick={handleLogout}>Logout</button>;
};
