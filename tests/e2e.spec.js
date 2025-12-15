import { test, expect } from "@playwright/test";

test("login (test) -> search -> save -> favorites", async ({ page }) => {
  await page.goto("/login");
  await page.getByRole("button", { name: "Dev/Test Login" }).click();
  await expect(page).toHaveURL(/\/search/);

  await page.getByPlaceholder("Search movies...").fill("inception");
  await page.getByRole("button", { name: "Go" }).click();

  await page.getByRole("button", { name: "Save" }).first().click();

  await page.goto("/favorites");
  await expect(page.getByText("Favorites")).toBeVisible();
});
