import React from "react";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  type?: "button" | "submit" | "reset";
}

export const Button = (props: Props) => {
  return (
    <button
      {...props}
      className={`px-4 py-2 bg-slate-700 hover:bg-sky-700 text-white rounded w-full cursor-pointer ${props.className}`}
      type={props.type ? props.type : "button"}
    >
      {props.children}
    </button>
  );
};
