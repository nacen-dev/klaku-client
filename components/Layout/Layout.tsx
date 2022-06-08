import Head from "next/head";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div>
      <Head>
        <title>Klaku Clothing</title>
      </Head>
      <header>Nav</header>
      <main>{children}</main>
      <footer>Footer</footer>
    </div>
  );
};

export { Layout };
