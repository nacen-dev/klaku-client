import { screen, render } from "@testing-library/react";

import { LoginForm } from "./LoginForm";

describe("Login Form", () => {
  const login = jest.fn();
  it("has email, password field and login button", () => {
    render(<LoginForm login={login}/>);

    const emailField = screen.getByLabelText(/email/i);
    const passwordField = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole("button", { name: /login/i });
  
    expect(emailField).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    
  });

  
});
