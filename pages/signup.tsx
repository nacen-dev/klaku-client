import type { NextPage } from "next";
import { registerUser, signUpFormData } from "../axios/userApi";
import { SignupForm } from "../components/SignupForm/SignupForm";

const Signup: NextPage = () => {
  return (
    <div>
      <SignupForm submit={registerUser} />
    </div>
  );
};

export default Signup;
