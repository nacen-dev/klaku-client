import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SignupForm } from "./SignupForm";

describe("Signup Form", () => {
  const submit = jest.fn();

  it("should have a email, first name, last name, password, confirm password fields, and signup button", () => {
    render(<SignupForm submit={submit} />);

    const email = screen.getByLabelText(/email/i);
    const firstName = screen.getByLabelText(/first name/i);
    const lastName = screen.getByLabelText(/last name/i);
    const password = screen.getAllByLabelText(/password/i)[0];
    const passwordConfirmation = screen.getAllByLabelText(/password/i)[1];
    const submitButton = screen.getByRole("button", { name: /sign up/i });

    expect(email).toBeInTheDocument();
    expect(firstName).toBeInTheDocument();
    expect(lastName).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(passwordConfirmation).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it("should allow the user to signup with their information", async () => {
    render(<SignupForm submit={submit} />);

    const email = screen.getByLabelText(/email/i);
    const firstName = screen.getByLabelText(/first name/i);
    const lastName = screen.getByLabelText(/last name/i);
    const password = screen.getAllByLabelText(/password/i)[0];
    const passwordConfirmation = screen.getAllByLabelText(/password/i)[1];
    const submitButton = screen.getByRole("button", { name: /sign up/i });

    const user = userEvent.setup();

    await user.type(firstName, "nacen");
    await user.type(lastName, "dev");
    await user.type(email, "nacen@test.com");
    await user.type(password, "123456");
    await user.type(passwordConfirmation, "123456");
    await user.click(submitButton);

    await waitFor(() =>
      expect(submit).toHaveBeenCalledWith({
        firstName: "nacen",
        lastName: "dev",
        email: "nacen@test.com",
        password: "123456",
        passwordConfirmation: "123456",
      })
    );
  });
});
