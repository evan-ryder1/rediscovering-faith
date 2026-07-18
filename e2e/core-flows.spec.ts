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
});
