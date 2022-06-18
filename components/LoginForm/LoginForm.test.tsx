import { screen, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { LoginForm } from "./LoginForm";

describe("Login Form", () => {
  const login = jest.fn();
  it("has email, password field and login button", () => {
    render(<LoginForm login={login} />);

    const emailField = screen.getByLabelText(/email/i);
    const passwordField = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole("button", { name: /login/i });

    expect(emailField).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  it("should allow the user to login with their information", async () => {
    render(<LoginForm login={login} />);

    const email = screen.getByLabelText(/email/i);
    const password = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole("button", { name: /login/i });

    const user = userEvent.setup();

    await user.type(email, "nacen@test.com");
    await user.type(password, "123456");
    await user.click(loginButton);

    await waitFor(() =>
      expect(login).toHaveBeenCalledWith({
        email: "nacen@test.com",
        password: "123456",
      })
    );
  });
});
