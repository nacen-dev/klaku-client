import React, { FC } from "react";

interface Props {
  click: () => void;
  lineColorClass?: string;
  buttonBackgroundClass?: string;
  className?: string;
}

export const Hamburger: FC<Props> = ({
  click,
  lineColorClass,
  buttonBackgroundClass,
  className,
}) => {
  return (
    <button onClick={click} className="flex gap-4">
      <span>Menu</span>
      <div
        className={`w-8 h-7 ${
          buttonBackgroundClass ? buttonBackgroundClass : "bg-transparent"
        } border-none flex justify-around flex-col cursor-pointer p-0 ${className}`}
      >
        <div
          className={`w-8 h-[2px] ${
            lineColorClass ? lineColorClass : "bg-white"
          }`}
        />
        <div
          className={`w-8 h-[2px] ${
            lineColorClass ? lineColorClass : "bg-white"
          }`}
        />
        <div
          className={`w-8 h-[2px] ${
            lineColorClass ? lineColorClass : "bg-white"
          }`}
        />
      </div>
    </button>
  );
};
