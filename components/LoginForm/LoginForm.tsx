import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { ErrorText } from "../ErrorText/ErrorText";

interface Props {
  login: (userData: { email: string; password: string }) => void;
}

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const LoginForm = ({ login }: Props) => {
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={(values) => {
        login(values);
      }}
      validationSchema={LoginSchema}
    >
      {({ errors, touched }) => (
        <Form className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-lg">
              Email
            </label>
            <Field
              name="email"
              id="email"
              className={`border px-2 py-1 rounded ${
                errors.email && touched.email ? "border-red-700" : ""
              }`}
              type="email"
            />
            {errors.email && touched.email ? (
              <ErrorText message={errors.email} />
            ) : null}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-lg">
              Password
            </label>
            <Field
              name="password"
              id="password"
              className={`border px-2 py-1 rounded ${
                errors.password && touched.password ? "border-red-700" : ""
              }`}
              type="password"
            />
            {errors.password && touched.password ? (
              <ErrorText message={errors.password} />
            ) : null}
          </div>
          <button
            className="mt-4 px-4 py-2 bg-slate-700 hover:bg-blue-700 text-white rounded w-full"
            type="submit"
          >
            Login
          </button>
        </Form>
      )}
    </Formik>
  );
};
