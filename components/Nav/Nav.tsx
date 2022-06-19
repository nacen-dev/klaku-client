import Link from "next/link";
import React from "react";
import { useGlobalState } from "../../state";
import { Logout } from "../Logout/Logout";

interface Props extends React.HTMLAttributes<HTMLElement> {
  listClass?: string;
  onNavItemClick?: () => void;
}

export const Nav = ({ className, listClass, onNavItemClick }: Props) => {
  const [auth, setAuth] = useGlobalState("auth");

  return (
    <nav className={className}>
      <ul className={`${listClass}`}>
        <li>
          <Link href="/shop">
            <a onClick={onNavItemClick}> Shop</a>
          </Link>
        </li>
        <li>
          <Link href="/contact">
            <a onClick={onNavItemClick}>Contact</a>
          </Link>
        </li>
        {auth.accessToken ? (
          <li onClick={onNavItemClick}>
            <Logout />
          </li>
        ) : (
          <li>
            <Link href="/login">
              <a onClick={onNavItemClick}>Login</a>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};
