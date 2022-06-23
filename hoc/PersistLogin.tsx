import React, { FC, useEffect, useState } from "react";
import { getRefreshToken } from "../axios/axiosAPI";
import { Loader } from "../components/Loader/Loader";
import { useGlobalState } from "../state";

interface Props {
  children: React.ReactNode;
}

export const PersistLogin: FC<Props> = ({ children }) => {
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

  return (
    <>
      {isLoading ? (
        <div className="h-fit-content w-full flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        children
      )}
    </>
  );
};
