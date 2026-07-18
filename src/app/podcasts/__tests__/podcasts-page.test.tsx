import { render, screen } from "@testing-library/react";

import PodcastsPage from "@/app/podcasts/page";

describe("PodcastsPage", () => {
  it("renders the branded podcast library and all sample podcasts", () => {
    render(<PodcastsPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Podcasts" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /rediscovering faith conversations/i }),
    ).toHaveAttribute("href", "/podcasts/rediscovering-faith-conversations");
    expect(
      screen.getByRole("link", { name: /table talk theology/i }),
    ).toHaveAttribute("href", "/podcasts/table-talk-theology");
    expect(
      screen.getByRole("link", { name: /neighborhood prayer/i }),
    ).toHaveAttribute("href", "/podcasts/neighborhood-prayer");
  });

  it("shows episode and transcript counts for podcast discovery", () => {
    render(<PodcastsPage />);

    expect(screen.getAllByText("Episodes")).toHaveLength(3);
    expect(screen.getAllByText("Segments")).toHaveLength(3);
    expect(screen.getByText("Podcast to episode to transcript")).toBeInTheDocument();
  });
});
