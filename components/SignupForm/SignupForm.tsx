import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { FormErrorDisplay } from "../FormErrorDisplay/FormErrorDisplay";
import { signUpFormData } from "../../axios/userApi";

interface Props {
  submit: (userData: signUpFormData) => Promise<any>;
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

export const SignupForm = ({ submit }: Props) => {
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
        console.log(submit(values));
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <div className="flex gap-2 flex-col">
            <label htmlFor="email">Email</label>
            <Field name="email" id="email" className="border" />
            {errors.email && touched.email ? (
              <FormErrorDisplay message={errors.email} />
            ) : null}
          </div>
          <div>
            <label htmlFor="firstName">First Name</label>
            <Field name="firstName" id="firstName" />
            {errors.firstName && touched.firstName ? (
              <FormErrorDisplay message={errors.firstName} />
            ) : null}
          </div>
          <div>
            <label htmlFor="lastName">Last Name</label>
            <Field name="lastName" />
            {errors.lastName && touched.lastName ? (
              <FormErrorDisplay message={errors.lastName} />
            ) : null}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <Field name="password" />
            {errors.password && touched.password ? (
              <FormErrorDisplay message={errors.password} />
            ) : null}
          </div>
          <div>
            <label htmlFor="passwordConfirmation">Confirm Password</label>
            <Field name="passwordConfirmation" />
            {errors.passwordConfirmation && touched.passwordConfirmation ? (
              <FormErrorDisplay message={errors.passwordConfirmation} />
            ) : null}
          </div>
          <button
            className="border px-4 py-2 bg-blue-700 text-white rounded"
            type="submit"
          >
            Sign Up
          </button>
        </Form>
      )}
    </Formik>
  );
};
