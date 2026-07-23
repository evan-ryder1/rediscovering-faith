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

  it("lets a signed-in listener reply and react to an existing comment", async () => {
    const user = userEvent.setup();

    renderWithProviders(
      <>
        <AuthForm mode="sign-up" />
        <EpisodeTranscriptComments episodeId={episodeId} segments={segments} />
      </>,
    );

    await waitFor(() => expect(screen.getByLabelText("Name")).toBeEnabled());

    await user.clear(screen.getByLabelText("Name"));
    await user.type(screen.getByLabelText("Name"), "Taylor Morgan");
    await user.clear(screen.getByLabelText("Email"));
    await user.type(screen.getByLabelText("Email"), "taylor@example.com");
    await user.type(screen.getByLabelText("Password"), "faith-community");
    await user.click(screen.getByRole("button", { name: "Create Account" }));

    const existingComment = screen
      .getByText(/honesty not being punished feels like the heart of the app/i)
      .closest("article");

    expect(existingComment).toBeInTheDocument();

    await user.click(within(existingComment!).getByRole("button", { name: "React" }));

    expect(
      within(existingComment!).getByRole("button", { name: "Reacted" }),
    ).toHaveAttribute("aria-pressed", "true");
    expect(within(existingComment!).getByText("5 reactions")).toBeInTheDocument();

    await user.type(
      within(existingComment!).getByLabelText("Reply to Jordan Lee"),
      "This is the kind of follow-up conversation the app should encourage.",
    );
    await user.click(
      within(existingComment!).getByRole("button", { name: "Add Reply" }),
    );

    expect(
      within(existingComment!).getByText(
        "This is the kind of follow-up conversation the app should encourage.",
      ),
    ).toBeInTheDocument();
    expect(within(existingComment!).getByText("2 replies")).toBeInTheDocument();
  });

  it("lets a signed-in listener bookmark a transcript segment", async () => {
    const user = userEvent.setup();

    renderWithProviders(
      <>
        <AuthForm mode="sign-up" />
        <EpisodeTranscriptComments episodeId={episodeId} segments={segments} />
      </>,
    );

    await waitFor(() => expect(screen.getByLabelText("Name")).toBeEnabled());

    await user.clear(screen.getByLabelText("Name"));
    await user.type(screen.getByLabelText("Name"), "Riley Carter");
    await user.clear(screen.getByLabelText("Email"));
    await user.type(screen.getByLabelText("Email"), "riley@example.com");
    await user.type(screen.getByLabelText("Password"), "faith-community");
    await user.click(screen.getByRole("button", { name: "Create Account" }));

    const firstSegment = screen
      .getByText("Welcome back to Rediscovering Faith Conversations.", {
        exact: false,
      })
      .closest("li");

    expect(firstSegment).toBeInTheDocument();

    await user.click(within(firstSegment!).getByRole("button", { name: "Bookmark" }));

    expect(
      within(firstSegment!).getByRole("button", { name: "Bookmarked" }),
    ).toHaveAttribute("aria-pressed", "true");
  });
});
