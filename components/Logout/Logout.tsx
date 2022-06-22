import { useRouter } from "next/router";
import React from "react";
import { logoutUser } from "../../axios/axiosAPI";
import { useGlobalState } from "../../state";

interface Props {}

export const Logout = (props: Props) => {
  const [auth, setAuth] = useGlobalState("auth");
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logoutUser(auth);
      setAuth({ accessToken: "" });
    } catch (error) {
      console.error(error);
    }
    router.push("/");
  };

  return <button onClick={handleLogout}>Logout</button>;
};
