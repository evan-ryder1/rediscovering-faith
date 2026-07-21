import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { AccountPanel } from "@/components/account-panel";
import { AuthForm } from "@/components/auth-form";
import { AuthNav } from "@/components/auth-nav";
import { AuthProvider } from "@/components/auth-provider";

const pushMock = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

function renderWithAuth(children: React.ReactNode) {
  return render(<AuthProvider>{children}</AuthProvider>);
}

describe("local auth flow", () => {
  beforeEach(() => {
    window.localStorage.clear();
    pushMock.mockClear();
  });

  it("signs up a listener, updates navigation, and routes to account", async () => {
    const user = userEvent.setup();

    renderWithAuth(
      <>
        <AuthNav />
        <AuthForm mode="sign-up" />
      </>,
    );

    await waitFor(() => expect(screen.getByLabelText("Name")).toBeEnabled());

    await user.clear(screen.getByLabelText("Name"));
    await user.type(screen.getByLabelText("Name"), "Jordan Lee");
    await user.clear(screen.getByLabelText("Email"));
    await user.type(screen.getByLabelText("Email"), "jordan@example.com");
    await user.type(screen.getByLabelText("Password"), "faith-community");
    await user.click(screen.getByRole("button", { name: "Create Account" }));

    expect(pushMock).toHaveBeenCalledWith("/account");
    expect(screen.getByRole("link", { name: "Jordan Lee" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign Out" })).toBeInTheDocument();
  });

  it("renders signed-out and signed-in account states", async () => {
    const user = userEvent.setup();

    renderWithAuth(
      <>
        <AuthForm mode="sign-in" />
        <AccountPanel />
      </>,
    );

    expect(screen.getByText("Signed Out")).toBeInTheDocument();

    await waitFor(() => expect(screen.getByLabelText("Email")).toBeEnabled());

    await user.clear(screen.getByLabelText("Email"));
    await user.type(screen.getByLabelText("Email"), "evan@example.com");
    await user.type(screen.getByLabelText("Password"), "password");
    await user.click(screen.getByRole("button", { name: "Sign In" }));

    expect(screen.getByText("Signed In")).toBeInTheDocument();
    expect(screen.getByText("evan@example.com")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Sign Out" }));

    expect(screen.getByText("Signed Out")).toBeInTheDocument();
  });
});
