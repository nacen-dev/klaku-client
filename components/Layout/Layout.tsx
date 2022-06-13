import Head from "next/head";
import React from "react";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
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
