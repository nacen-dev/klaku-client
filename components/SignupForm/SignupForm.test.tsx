import { render, screen } from "@testing-library/react";
import { SignupForm } from "./SignupForm";

describe("Signup Form", () => {
  const submit = jest.fn();

  it("should have a username, first name, last name, password, confirm password fields, and signup button", () => {
    render(<SignupForm submit={submit} />);

    const password = screen.getAllByLabelText(/password/i)[0];
    const confirmPassword = screen.getAllByLabelText(/password/i)[1];

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(confirmPassword).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /signup/i })).toBeInTheDocument();
  });
});
