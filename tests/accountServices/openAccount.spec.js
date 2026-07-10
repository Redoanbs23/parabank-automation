import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/login/loginpage";
import { OpenAccountsPage } from "../../pages/accountServices/openAccountsPage";

test.describe("Open New Account", () => {
  let loginPage, openAccountsPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    openAccountsPage = new OpenAccountsPage(page);
    await loginPage.goto();
    await loginPage.login("Bushra", "123");
  });
  test("TC0146 - Open a CHECKING account successfully", async ({ page }) => {
    await openAccountsPage.clickOpenAccountLink();
    await openAccountsPage.openNewAccount("0", 0);
    await expect(openAccountsPage.openAccountPageHeading).toHaveText(
      "Account Opened!",
    );
  });

  test("TC0147 - Open a SAVINGS account successfully", async ({ page }) => {
    await openAccountsPage.clickOpenAccountLink();
    await openAccountsPage.openNewAccount("1", 0);
    await expect(openAccountsPage.openAccountPageHeading).toHaveText(
      "Account Opened!",
    );
  });
});
