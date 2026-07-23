import { expect, test } from "@playwright/test";

test.describe("Rediscovering Faith core flows", () => {
  test("visitor can browse from podcasts to an episode transcript", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { name: "Listen deeper. Find community." }),
    ).toBeVisible();

    await page.getByRole("link", { name: "Browse Podcasts" }).click();
    await expect(page.getByRole("heading", { name: "Podcasts" })).toBeVisible();

    await page
      .getByRole("link", { name: /Rediscovering Faith Conversations/i })
      .click();
    await expect(
      page.getByRole("heading", { name: "Rediscovering Faith Conversations" }),
    ).toBeVisible();

    await page
      .getByRole("link", { name: "Open episode and transcript" })
      .first()
      .click();
    await expect(
      page.getByRole("heading", {
        name: "Finding Belonging After Spiritual Burnout",
      }),
    ).toBeVisible();
    await expect(page.getByText("Timestamped Transcript")).toBeVisible();
    await expect(page.getByText("0:00")).toBeVisible();
    await expect(page.getByText(/a podcast can start the conversation/i)).toBeVisible();
  });

  test("listener can sign up, see account state, and sign out", async ({ page }) => {
    await page.goto("/auth/sign-up");

    await page.getByLabel("Name").fill("Jordan Lee");
    await page.getByLabel("Email").fill("jordan@example.com");
    await page.getByLabel("Password").fill("faith-community");
    await page.getByRole("button", { name: "Create Account" }).click();

    await expect(page).toHaveURL(/\/account$/);
    await expect(page.getByText("Signed In")).toBeVisible();
    await expect(page.getByText("jordan@example.com")).toBeVisible();

    await page.getByRole("button", { name: "Sign Out" }).first().click();

    await expect(page.getByText("Signed Out")).toBeVisible();
    await expect(page.getByRole("link", { name: "Sign In" }).first()).toBeVisible();
  });

  test("signed-in listener can add a timestamped transcript comment", async ({
    page,
  }) => {
    await page.goto("/auth/sign-up");

    await page.getByLabel("Name").fill("Jordan Lee");
    await page.getByLabel("Email").fill("jordan-comments@example.com");
    await page.getByLabel("Password").fill("faith-community");
    await page.getByRole("button", { name: "Create Account" }).click();

    await page.goto("/episodes/finding-belonging-after-spiritual-burnout");

    const firstSegment = page
      .locator("li")
      .filter({
        hasText: "Welcome back to Rediscovering Faith Conversations.",
      })
      .first();

    await firstSegment
      .getByLabel("Comment on 0:00")
      .fill("This opening makes the community need clear.");
    await firstSegment.getByRole("button", { name: "Add Comment" }).click();

    await expect(
      firstSegment.getByText("This opening makes the community need clear."),
    ).toBeVisible();
    await expect(firstSegment.getByText("1 comment")).toBeVisible();
  });

  test("signed-in listener can reply and react to a comment", async ({ page }) => {
    await page.goto("/auth/sign-up");

    await page.getByLabel("Name").fill("Taylor Morgan");
    await page.getByLabel("Email").fill("taylor-comments@example.com");
    await page.getByLabel("Password").fill("faith-community");
    await page.getByRole("button", { name: "Create Account" }).click();

    await page.goto("/episodes/finding-belonging-after-spiritual-burnout");

    const existingComment = page
      .locator("article")
      .filter({
        hasText: "honesty not being punished feels like the heart of the app",
      })
      .first();

    await existingComment.getByRole("button", { name: "React" }).click();

    await expect(
      existingComment.getByRole("button", { name: "Reacted" }),
    ).toBeVisible();
    await expect(existingComment.getByText("5 reactions")).toBeVisible();

    await existingComment
      .getByLabel("Reply to Jordan Lee")
      .fill("This reply keeps the episode conversation moving.");
    await existingComment.getByRole("button", { name: "Add Reply" }).click();

    await expect(
      existingComment.getByText("This reply keeps the episode conversation moving."),
    ).toBeVisible();
    await expect(existingComment.getByText("2 replies")).toBeVisible();
  });

  test("signed-in listener can save an episode and bookmark a transcript segment", async ({
    page,
  }) => {
    await page.goto("/auth/sign-up");

    await page.getByLabel("Name").fill("Riley Carter");
    await page.getByLabel("Email").fill("riley-saves@example.com");
    await page.getByLabel("Password").fill("faith-community");
    await page.getByRole("button", { name: "Create Account" }).click();

    await page.goto("/episodes/finding-belonging-after-spiritual-burnout");

    await page.getByRole("button", { name: "Save Episode" }).click();
    await expect(
      page.getByRole("button", { name: "Saved Episode" }),
    ).toBeVisible();

    const firstSegment = page
      .locator("li")
      .filter({
        hasText: "Welcome back to Rediscovering Faith Conversations.",
      })
      .first();

    await firstSegment.getByRole("button", { name: "Bookmark" }).click();
    await expect(firstSegment.getByRole("button", { name: "Bookmarked" })).toBeVisible();

    await page.goto("/account");

    await expect(
      page.getByLabel("Saved episodes count").getByText("1"),
    ).toBeVisible();
    await expect(
      page.getByLabel("Transcript bookmarks count").getByText("1"),
    ).toBeVisible();
  });

  test("visitor can open the discussion board from an episode", async ({ page }) => {
    await page.goto("/episodes/finding-belonging-after-spiritual-burnout");

    await page.getByRole("link", { name: "View Discussions" }).click();

    await expect(page).toHaveURL(/\/discussions$/);
    await expect(
      page.getByRole("heading", { name: "Discussions" }),
    ).toBeVisible();
    await expect(
      page.getByText("What makes honesty feel safe in a faith community?"),
    ).toBeVisible();
  });
});
