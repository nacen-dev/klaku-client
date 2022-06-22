import dynamic from "next/dynamic";
import Link from "next/link";
import React, { FC, useState } from "react";
import { MdClose } from "react-icons/md";
import { Cart, CartProps } from "../Cart/Cart";
import { Hamburger } from "../Hamburger/Hamburger";
import { Nav } from "../Nav/Nav";
import { Sidebar } from "../Sidebar/Sidebar";

interface Props {}

const DynamicCart = dynamic<CartProps>(
  () => import("../Cart/Cart").then((mod) => mod.Cart),
  {
    ssr: false,
  }
);

export const Header:FC<Props> = (props) => {
  const [show, setShow] = useState(false);

  const toggleHamburger = () => {
    setShow((prevState) => !prevState);
  };

  const closeMenu = () => {
    setShow(false);
  };

  return (
    <>
      <div className="py-4 px-6 flex justify-between items-center bg-slate-700 text-white text-xl h-[10vh]">
        <Link href="/shop">Klaku Clothing</Link>
        <div className="flex justify-between gap-4">
          <Nav className="md-max:hidden" listClass="flex gap-4" />
          <Hamburger click={toggleHamburger} className="md:hidden" />
          <DynamicCart />
        </div>
      </div>
      <Sidebar show={show} className="md:hidden" close={closeMenu}>
        <aside className="p-6">
          <div className="mb-4 flex gap-4 items-center justify-between text-xl">
            <p>Menu</p>
            <MdClose className="text-2xl cursor-pointer" onClick={closeMenu} />
          </div>
          <Nav
            className="flex-col flex text-xl"
            listClass="flex-col flex gap-2"
            onNavItemClick={closeMenu}
          />
        </aside>
      </Sidebar>
    </>
  );
};
