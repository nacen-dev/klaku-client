import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SignupForm } from "./SignupForm";

describe("Signup Form", () => {
  const submit = jest.fn();

  it("should have a email, first name, last name, password, confirm password fields, and signup button", () => {
    render(<SignupForm submit={submit} />);

    const password = screen.getAllByLabelText(/password/i)[0];
    const confirmPassword = screen.getAllByLabelText(/password/i)[1];

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(confirmPassword).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /signup/i })).toBeInTheDocument();
  });

  it("should allow the user to signup with their information", () => {
    render(<SignupForm submit={submit} />);

    const email = screen.getByLabelText(/email/i);
    const firstName = screen.getByLabelText(/first name/i);
    const lastName = screen.getByLabelText(/last name/i);
    const password = screen.getAllByLabelText(/password/i)[0];
    const confirmPassword = screen.getAllByLabelText(/password/i)[1];
    const submitButton = screen.getByRole("button", { name: /signup/i });

    const user = userEvent.setup();

    user.type(firstName, "nacen");
    user.type(lastName, "dev");
    user.type(email, "nacen@test.com");
    user.type(password, "123456");
    user.type(confirmPassword, "123456");
    user.click(submitButton);

    expect(submit).toHaveBeenCalledWith({
      firstName: "nacen",
      lastName: "dev",
      email: "nacen@test.com",
      password: "123456",
      confirmPassword: "123456"
    });
  });
});
