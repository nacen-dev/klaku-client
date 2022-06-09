import React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  message: string;
}

export const ErrorText = ({ message, className }: Props) => {
  return (
    <div className={`text-red-600 ${className ? className : ""}`}>
      {message}
    </div>
  );
};
