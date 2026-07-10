import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/login/loginpage";
import { RegistrationPage } from "../../pages/registration/registrationpage";
import { OpenAccountsPage } from "../../pages/accountServices/openAccountsPage";

test.describe("Open New Account", () => {
  let username, password, openAccountsPage;

  test.beforeAll(async ({ browser }) => {
    const page = await browser.newPage();
    const registrationPage = new RegistrationPage(page);

    await registrationPage.goto();

    const uniqueId = Date.now();
    username = `user${uniqueId}`;
    password = `Pass${uniqueId}`;

    await registrationPage.registration(
      "John",
      "Doe",
      "123 Main St",
      "Dhaka",
      "Dhaka",
      "1200",
      "1234",
      "123456789",
      username,
      password,
      password,
    );
    await page.close();
  });

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    openAccountsPage = new OpenAccountsPage(page);
    await loginPage.goto();
    await loginPage.login(username, password);
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
