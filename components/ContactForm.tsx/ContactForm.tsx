import React, { FC, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { ErrorText } from "../ErrorText/ErrorText";
import { Button } from "../Button/Button";
import { GiCheckMark } from "react-icons/gi";

interface Props {
  className?: string;
}

const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .max(50, "Maximum of 50 character length")
    .required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  message: Yup.string()
    .required("Message is required")
    .max(500, "Maximum of 500 characters"),
});

interface IContactFormData {
  name: string;
  email: string;
  message: string;
}

export const ContactForm: FC<Props> = ({ className }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (data: IContactFormData) => {
    setMessage("Message sent successfully");
  };

  return message ? (
    <div className="mt-8 flex flex-col gap-8">
      <h2 className="text-3xl text-emerald-700 text-center w-full">
        {message}
      </h2>
      <div className="flex items-center justify-center">
        <div className="rounded-[50%] border-2 border-emerald-700 bg-emerald-700 p-4">
          <GiCheckMark className="text-white text-4xl" />
        </div>
      </div>
    </div>
  ) : (
    <Formik
      initialValues={{
        name: "",
        email: "",
        message: "",
      }}
      validationSchema={ContactSchema}
      onSubmit={(formData) => {
        handleSubmit(formData);
      }}
    >
      {({ errors, touched }) => (
        <Form
          className={`${className ? className : ""} flex flex-col gap-5 p-2`}
        >
          <div className="flex gap-2 flex-col">
            <label htmlFor="name">Name</label>
            <Field name="name" id="name" className="border px-2 py-1 rounded" />
            {errors.name && touched.name ? (
              <ErrorText message={errors.name} />
            ) : null}
          </div>

          <div className="flex gap-2 flex-col">
            <label htmlFor="email">Email</label>
            <Field
              name="email"
              id="email"
              className="border px-2 py-1 rounded"
              type="email"
            />
            {errors.email && touched.email ? (
              <ErrorText message={errors.email} />
            ) : null}
          </div>

          <div className="flex gap-2 flex-col">
            <label htmlFor="message">Message</label>
            <Field
              name="message"
              id="message"
              className="border px-2 py-1 rounded resize-none h-20"
              as="textarea"
            />
            {errors.message && touched.message ? (
              <ErrorText message={errors.message} />
            ) : null}
          </div>

          <Button className="mt-2" type="submit">
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};
