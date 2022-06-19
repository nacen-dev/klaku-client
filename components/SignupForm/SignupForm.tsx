import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { ErrorText } from "../ErrorText/ErrorText";
import { SignUpFormData } from "../../axios/axiosAPI";

interface Props {
  submit: (userData: SignUpFormData) => void;
  signUpMessage: string;
  errorMessage: string;
}

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .max(50, "Maximum of 50 character length")
    .required("First Name is required"),
  lastName: Yup.string()
    .max(50, "Maximum of 50 character length")
    .required("Last Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Minimum Password Length is 6")
    .required("Password is required"),
  passwordConfirmation: Yup.string()
    .min(6, "Password must match")
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm your password"),
});

export const SignupForm = ({ submit, signUpMessage, errorMessage }: Props) => {
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirmation: "",
      }}
      validationSchema={SignupSchema}
      onSubmit={(values) => {
        submit(values);
      }}
    >
      {({ errors, touched }) => (
        <Form className="flex gap-2 flex-col">
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
            <label htmlFor="firstName">First Name</label>
            <Field
              name="firstName"
              id="firstName"
              className="border px-2 py-1 rounded"
            />
            {errors.firstName && touched.firstName ? (
              <ErrorText message={errors.firstName} />
            ) : null}
          </div>
          <div className="flex gap-2 flex-col">
            <label htmlFor="lastName">Last Name</label>
            <Field
              name="lastName"
              id="lastName"
              className="border px-2 py-1 rounded"
            />
            {errors.lastName && touched.lastName ? (
              <ErrorText message={errors.lastName} />
            ) : null}
          </div>
          <div className="flex gap-2 flex-col">
            <label htmlFor="password">Password</label>
            <Field
              name="password"
              id="password"
              className="border px-2 py-1 rounded"
              type="password"
            />
            {errors.password && touched.password ? (
              <ErrorText message={errors.password} />
            ) : null}
          </div>
          <div className="flex gap-2 flex-col">
            <label htmlFor="passwordConfirmation">Confirm Password</label>
            <Field
              name="passwordConfirmation"
              id="passwordConfirmation"
              className="border px-2 py-1 rounded"
              type="password"
            />
            {errors.passwordConfirmation && touched.passwordConfirmation ? (
              <ErrorText message={errors.passwordConfirmation} />
            ) : null}
          </div>
          {signUpMessage ? <div className="text-white bg-green-600 p-2 w-full">{signUpMessage}</div> : null}
          {errorMessage ? <ErrorText message={errorMessage} /> : null}
          <button
            className="px-4 py-2 bg-blue-700 text-white rounded w-full"
            type="submit"
          >
            Sign Up
          </button>
        </Form>
      )}
    </Formik>
  );
};
