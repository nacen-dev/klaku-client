import Link from "next/link";
import React from "react";

interface Props extends React.HTMLAttributes<HTMLElement> {
  isLoggedIn: boolean;
  listClass?: string;
}

export const Nav = ({ className, isLoggedIn, listClass }: Props) => {
  return (
    <nav className={className}>
      <ul className={`flex gap-2 ${listClass}`}>
        <li>
          <Link href="/shop">Shop</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
        {isLoggedIn ? null : (
          <li>
            <Link href="/login">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};
