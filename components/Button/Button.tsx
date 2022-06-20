import React from "react";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {}

export const Button = (props: Props) => {
  return (
    <button
      className="px-4 py-2 bg-slate-700 hover:bg-sky-700 text-white rounded w-full cursor-pointer"
      {...props}
    >
      {props.children}
    </button>
  );
};
