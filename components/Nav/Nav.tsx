import Link from "next/link";
import React from "react";
import { useGlobalState } from "../../state";
import { Logout } from "../Logout/Logout";

interface Props extends React.HTMLAttributes<HTMLElement> {
  listClass?: string;
}

export const Nav = ({ className, listClass }: Props) => {
  const [ auth, setAuth ] = useGlobalState("auth");

  return (
    <nav className={className}>
      <ul className={`${listClass}`}>
        <li>
          <Link href="/shop">Shop</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
        {auth.accessToken ? (
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
