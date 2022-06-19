import React from "react";
import Portal from "../../hoc/Portal";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  show: boolean;
  close: () => void;
  overlayClass?: string;
}

export const Sidebar = ({
  show,
  className,
  children,
  close,
  overlayClass,
}: Props) => {
  return (
    <Portal>
      <>
        <div
          className={`bg-black opacity-50 inset-0 fixed z-10 ${
            show ? "" : "hidden"
          } ${overlayClass ? overlayClass : ""}`}
          onClick={close}
        />
        <div
          className={`${
            show ? "translate-x-0" : "translate-x-full"
          } fixed w-[200px] h-full right-0 top-0 z-20 bg-slate-700 text-white transition-transform duration-300 ${className}`}
        >
          {children}
        </div>
      </>
    </Portal>
  );
};
