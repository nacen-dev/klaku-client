import React from "react";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export const Button:React.FC<Props> = (props) => {
  return (
    <button
      {...props}
      className={`px-4 py-2 bg-slate-700 hover:bg-sky-700 text-white rounded w-full cursor-pointer ${
        props.className ? props.className : ""
      }`}
      type={props.type ? props.type : "button"}
      disabled={props.disabled ? true : false}
    >
      {props.children}
    </button>
  );
};
