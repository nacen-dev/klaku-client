import React, { useState } from "react";
import { Cart } from "../Cart/Cart";
import { Hamburger } from "../Hamburger/Hamburger";
import { Nav } from "../Nav/Nav";
import { Sidebar } from "../Sidebar/Sidebar";

interface Props {}

export const Header = (props: Props) => {
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
        <p>Klaku Clothing</p>
        <div className="flex justify-between gap-4">
          <Nav
            className="md-max:hidden"
            listClass="flex gap-4"
          />
          <Hamburger click={toggleHamburger} className="md:hidden" />
          <Cart />
        </div>
      </div>
      <Sidebar show={show} close={closeMenu} className="md:hidden" />
    </>
  );
};
