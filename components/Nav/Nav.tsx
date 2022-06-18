import Link from "next/link";
import React from "react";
import { useStateContext } from "../../context/StateContext";
import { Logout } from "../Logout/Logout";

interface Props extends React.HTMLAttributes<HTMLElement> {
  listClass?: string;
}

export const Nav = ({ className, listClass }: Props) => {
  const { auth } = useStateContext();

  return (
    <nav className={className}>
      <ul className={`${listClass}`}>
        <li>
          <Link href="/shop">Shop</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
        {auth ? (
          <li>
            <Logout />
          </li>
        ) : (
          <li>
            <Link href="/login">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};
