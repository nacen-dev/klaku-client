import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Loader } from "../components/Loader/Loader";

type Props = {};

const Custom404 = (props: Props) => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/");
  }, []);

  return (
    <div className="h-fit-content flex justify-center items-center">
      <Loader />
    </div>
  );
};

export default Custom404;
