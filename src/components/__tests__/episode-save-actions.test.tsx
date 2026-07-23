import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { AuthForm } from "@/components/auth-form";
import { AuthProvider } from "@/components/auth-provider";
import { CommunityProvider } from "@/components/community-provider";
import { EpisodeSaveActions } from "@/components/episode-save-actions";

const pushMock = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

function renderWithProviders(children: React.ReactNode) {
  return render(
    <AuthProvider>
      <CommunityProvider>{children}</CommunityProvider>
    </AuthProvider>,
  );
}

describe("EpisodeSaveActions", () => {
  beforeEach(() => {
    window.localStorage.clear();
    pushMock.mockClear();
  });

  it("prompts signed-out listeners to sign in before saving", () => {
    renderWithProviders(
      <EpisodeSaveActions episodeId="episode-belonging-after-burnout" />,
    );

    expect(screen.getByRole("link", { name: "Sign In To Save" })).toHaveAttribute(
      "href",
      "/auth/sign-in",
    );
    expect(screen.getByRole("link", { name: "View Discussions" })).toHaveAttribute(
      "href",
      "/discussions",
    );
  });

  it("lets a signed-in listener save an episode", async () => {
    const user = userEvent.setup();

    renderWithProviders(
      <>
        <AuthForm mode="sign-up" />
        <EpisodeSaveActions episodeId="episode-belonging-after-burnout" />
      </>,
    );

    await waitFor(() => expect(screen.getByLabelText("Name")).toBeEnabled());

    await user.type(screen.getByLabelText("Password"), "faith-community");
    await user.click(screen.getByRole("button", { name: "Create Account" }));
    await user.click(screen.getByRole("button", { name: "Save Episode" }));

    expect(screen.getByRole("button", { name: "Saved Episode" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });
});
