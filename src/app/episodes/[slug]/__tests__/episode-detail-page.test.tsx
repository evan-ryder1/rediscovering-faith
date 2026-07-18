import { render, screen } from "@testing-library/react";
import { notFound } from "next/navigation";

import EpisodeDetailPage from "@/app/episodes/[slug]/page";

jest.mock("next/navigation", () => ({
  notFound: jest.fn(() => {
    throw new Error("NEXT_NOT_FOUND");
  }),
}));

describe("EpisodeDetailPage", () => {
  it("renders episode metadata, audio placeholder, and transcript segments", async () => {
    const page = await EpisodeDetailPage({
      params: Promise.resolve({
        slug: "finding-belonging-after-spiritual-burnout",
      }),
    });

    render(page);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Finding Belonging After Spiritual Burnout",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("Rediscovering Faith Conversations")).toBeInTheDocument();
    expect(screen.getByText("Episode Player")).toBeInTheDocument();
    expect(screen.getByText("Timestamped Transcript")).toBeInTheDocument();
    expect(screen.getByText("0:00")).toBeInTheDocument();
    expect(screen.getByText("2:23")).toBeInTheDocument();
    expect(screen.getByText(/a podcast can start the conversation/i)).toBeInTheDocument();
  });

  it("delegates unknown episode slugs to Next notFound", async () => {
    await expect(
      EpisodeDetailPage({
        params: Promise.resolve({
          slug: "missing-episode",
        }),
      }),
    ).rejects.toThrow("NEXT_NOT_FOUND");

    expect(notFound).toHaveBeenCalled();
  });
});
