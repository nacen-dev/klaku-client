import React, { FC } from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  message: string;
}

export const ErrorText:FC<Props> = ({ message, className }) => {
  return (
    <div className={`text-red-600 ${className ? className : ""}`}>
      {message}
    </div>
  );
};
