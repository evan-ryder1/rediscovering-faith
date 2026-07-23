import { render, screen } from "@testing-library/react";

import DiscussionsPage from "@/app/discussions/page";

describe("DiscussionsPage", () => {
  it("renders seeded discussion prompts with episode links", () => {
    render(<DiscussionsPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Discussions" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "What makes honesty feel safe in a faith community?",
      }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "Open Episode" })[0]).toHaveAttribute(
      "href",
      "/episodes/finding-belonging-after-spiritual-burnout",
    );
    expect(screen.getByText("Timestamp 0:19")).toBeInTheDocument();
  });
});
