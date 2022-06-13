import React from "react";
import { Nav } from "../Nav/Nav";
import { MdClose } from "react-icons/md";

interface Props {
  show: boolean;
  close: () => void;
  className: string;
}

export const Sidebar = ({ show, close, className }: Props) => {
  return (
    <div
      className={`${
        show ? "translate-x-0" : "translate-x-full"
      } fixed w-[200px] h-full right-0 top-0 bg-slate-700 text-white transition-transform duration-300 ${className}`}
    >
      <aside className="p-6">
        <div className="mb-4 flex gap-4 items-center justify-between text-xl">
          <p>Menu</p>
          <MdClose className="text-2xl cursor-pointer" onClick={close} />
        </div>
        <Nav
          className="flex-col flex text-xl"
          isLoggedIn={false}
          listClass="flex-col flex gap-2"
        />
      </aside>
    </div>
  );
};
