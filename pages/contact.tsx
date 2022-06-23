import { NextPage } from "next";
import React from "react";
import { ContactForm } from "../components/ContactForm.tsx/ContactForm";

type Props = {};

const Contact: NextPage<Props> = () => {
  return (
    <div className="h-fit-content  bg-neutral-200 p-[5%]">
      <div className="bg-white p-8 max-w-[675px] mr-auto ml-auto rounded shadow-lg">
        <h1 className="text-3xl text-slate-700 font-semibold text-center">Contact Us</h1>
        <ContactForm className="mt-8"/>
      </div>
    </div>
  );
};

export default Contact;
