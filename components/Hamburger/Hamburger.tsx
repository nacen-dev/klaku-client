import React from "react";

interface Props {
  click: () => void;
  lineColorClass?: string;
  buttonBackgroundClass?: string;
  className?: string;
}

export const Hamburger = ({
  click,
  lineColorClass,
  buttonBackgroundClass,
  className
}: Props) => {
  return (
    <button
      onClick={click}
      className={`w-8 h-7 ${
        buttonBackgroundClass ? buttonBackgroundClass : "bg-transparent"
      } border-none flex justify-around flex-col cursor-pointer p-0 ${className}`}
    >
      <div
        className={`w-8 h-[2px] ${
          lineColorClass ? lineColorClass : "bg-white"
        }`}
      ></div>
      <div
        className={`w-8 h-[2px] ${
          lineColorClass ? lineColorClass : "bg-white"
        }`}
      ></div>
      <div
        className={`w-8 h-[2px] ${
          lineColorClass ? lineColorClass : "bg-white"
        }`}
      ></div>
    </button>
  );
};
