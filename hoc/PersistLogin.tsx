import React, { useEffect, useState } from "react";
import { getRefreshToken } from "../axios/axiosAPI";
import { Loader } from "../components/Loader/Loader";
import { useGlobalState } from "../state";

interface Props {
  children: React.ReactNode;
}

export const PersistLogin = ({ children }: Props) => {
  const [auth, setAuth] = useGlobalState("auth");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const verifyRefreshToken = async () => {
      try {
        const refreshToken = await getRefreshToken();
        setAuth(refreshToken);
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    !auth.accessToken ? verifyRefreshToken() : setIsLoading(false);

    return () => {
      isMounted = false;
    };
  }, []);

  return <>{isLoading ? <Loader /> : children}</>;
};