import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { AuthForm } from "@/components/auth-form";
import { AuthProvider } from "@/components/auth-provider";
import { CommunityProvider } from "@/components/community-provider";
import { EpisodeTranscriptComments } from "@/components/episode-transcript-comments";
import { getTranscriptForEpisode } from "@/data/sample-content";

const pushMock = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

const episodeId = "episode-belonging-after-burnout";
const segments = getTranscriptForEpisode(episodeId).slice(0, 2);

function renderWithProviders(children: React.ReactNode) {
  return render(
    <AuthProvider>
      <CommunityProvider>{children}</CommunityProvider>
    </AuthProvider>,
  );
}

describe("EpisodeTranscriptComments", () => {
  beforeEach(() => {
    window.localStorage.clear();
    pushMock.mockClear();
  });

  it("shows a signed-out visitor the transcript and sign-in prompt", () => {
    renderWithProviders(
      <EpisodeTranscriptComments episodeId={episodeId} segments={segments} />,
    );

    expect(screen.getByText("0:00")).toBeInTheDocument();
    expect(screen.getByText("0 comments")).toBeInTheDocument();
    expect(screen.getByText(/1 comment across 2 transcript segments/i)).toBeInTheDocument();
    expect(screen.getByText("1 comment")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Sign in to comment" }),
    ).toHaveAttribute("href", "/auth/sign-in");
    expect(
      screen.queryByRole("button", { name: "Add Comment" }),
    ).not.toBeInTheDocument();
  });

  it("lets a signed-in listener add a comment to one transcript segment", async () => {
    const user = userEvent.setup();

    renderWithProviders(
      <>
        <AuthForm mode="sign-up" />
        <EpisodeTranscriptComments episodeId={episodeId} segments={segments} />
      </>,
    );

    await waitFor(() => expect(screen.getByLabelText("Name")).toBeEnabled());

    await user.clear(screen.getByLabelText("Name"));
    await user.type(screen.getByLabelText("Name"), "Jordan Lee");
    await user.type(screen.getByLabelText("Password"), "faith-community");
    await user.click(screen.getByRole("button", { name: "Create Account" }));

    const firstSegment = screen
      .getByText("Welcome back to Rediscovering Faith Conversations.", {
        exact: false,
      })
      .closest("li");

    expect(firstSegment).toBeInTheDocument();

    await user.type(
      within(firstSegment!).getByLabelText("Comment on 0:00"),
      "This opening makes the need for community really clear.",
    );
    await user.click(
      within(firstSegment!).getByRole("button", { name: "Add Comment" }),
    );

    expect(
      within(firstSegment!).getByText(
        "This opening makes the need for community really clear.",
      ),
    ).toBeInTheDocument();
    expect(within(firstSegment!).getByText("1 comment")).toBeInTheDocument();
    expect(within(firstSegment!).getByText("Jordan Lee")).toBeInTheDocument();
  });
});
