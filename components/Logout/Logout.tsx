import { useRouter } from "next/router";
import React from "react";
import { logoutUser } from "../../axios/authApi";
import { useGlobalState } from "../../state";

interface Props {}

export const Logout = (props: Props) => {
  const [auth, setAuth] = useGlobalState("auth");
  const router = useRouter();

  const handleLogout = async () => {
    await logoutUser(auth);
    setAuth({ accessToken: "" });
    router.push("/");
  };

  return <button onClick={handleLogout}>Logout</button>;
};
