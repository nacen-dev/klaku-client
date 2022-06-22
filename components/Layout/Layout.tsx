import Head from "next/head";
import React, { FC } from "react";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";

interface Props {
  children: React.ReactNode;
}

const Layout:FC<Props> = ({ children }) => {
  return (
    <div>
      <Head>
        <title>Klaku Clothing</title>
      </Head>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export { Layout };
