import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/login/loginpage";
import { RegistrationPage } from "../../pages/registration/registrationpage";
import { OpenAccountsPage } from "../../pages/accountServices/openAccountsPage";
import { AccountsOverviewPage } from "../../pages/accountServices/accountsOverviewPage";

test.describe("Open New Account", () => {
  let username, password, loginPage, openAccountsPage, overviewPage;

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
    loginPage = new LoginPage(page);
    openAccountsPage = new OpenAccountsPage(page);
    overviewPage = new AccountsOverviewPage(page);
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

  test.skip("TC0148 - UI behavior when no funding account available", async ({
    page,
  }) => {
    // Not automatable: ParaBank always pre-selects a default funding account.
    // No UI state exists where funding account dropdown is empty.
  });

  test.skip("TC0149 - Behavior when opening account with 0-balance funding account", async ({
    page,
  }) => {
    // Not automatable: newly registered user starts with $515.50.
    // Reaching a 0-balance state requires manually draining the account across multiple sessions.
    // Pre-condition cannot be reliably established in an automated test.
    // Manual finding: ParaBank allows account opening even when balance goes negative — no minimum enforced.
  });

  test("TC0150 - New account appears in Accounts Overview immediately", async ({
    page,
  }) => {
    await openAccountsPage.clickOpenAccountLink();
    await openAccountsPage.openNewAccount("0", 0);

    const newId = await openAccountsPage.getNewAccountId();

    await overviewPage.clickAccountsOverviewLink();
    const accountIds = await overviewPage.getAccountIds();

    expect(accountIds).toContain(newId.trim());
  });

  test("TC0151 - Rapid clicking Open New Account creates multiple accounts (bug)", async ({
    page,
  }) => {
    await openAccountsPage.clickOpenAccountLink();
    await openAccountsPage.accountTypeDropdown.selectOption("0");
    await openAccountsPage.fundingAccountDropdown.selectOption({ index: 0 });

    // BUG: rapid double-click creates 2 accounts with unique IDs instead of 1
    // Expected: only 1 account should be created regardless of click speed
    // Actual: n rapid clicks = n accounts created
    await openAccountsPage.openNewAccountButton.dblclick();

    const newId = await openAccountsPage.getNewAccountId();
    await overviewPage.clickAccountsOverviewLink();
    const accountIds = await overviewPage.getAccountIds();

    // asserting actual behavior — both accounts appear in overview besides the default user account
    expect(accountIds.length).toBeGreaterThan(2);
  });

  test("TC0152 - New account ID on confirmation matches Accounts Overview", async ({
    page,
  }) => {
    await openAccountsPage.clickOpenAccountLink();
    await openAccountsPage.openNewAccount("1", 0);

    const confirmedId = await openAccountsPage.getNewAccountId();

    await overviewPage.clickAccountsOverviewLink();
    const accountIds = await overviewPage.getAccountIds();

    expect(accountIds).toContain(confirmedId.trim());
  });

  test("TC0153 - Clicking new account ID link navigates to correct account detail page", async ({
    page,
  }) => {
    await openAccountsPage.clickOpenAccountLink();
    await openAccountsPage.openNewAccount("0", 0);
    const newId = await openAccountsPage.getNewAccountId();
    await openAccountsPage.clickNewAccountLink();
    await expect(page).toHaveURL(
      new RegExp(`activity\\.htm\\?id=${newId.trim()}`),
    );
  });

  test("TC0154 - Opening a second CHECKING account succeeds", async ({
    page,
  }) => {
    // open first CHECKING
    await openAccountsPage.clickOpenAccountLink();
    await openAccountsPage.openNewAccount("0", 0);
    await expect(openAccountsPage.openAccountPageHeading).toHaveText(
      "Account Opened!",
    );

    // open second CHECKING using newly created account as funding source
    await openAccountsPage.clickOpenAccountLink();
    await openAccountsPage.openNewAccount("0", 0);
    await expect(openAccountsPage.openAccountPageHeading).toHaveText(
      "Account Opened!",
    );
  });

  test.skip("TC0155 - Opening account with funding account at exactly minimum balance", async ({
    page,
  }) => {
    // Not automatable: no minimum balance enforcement exists in ParaBank.
    // Manual finding: accounts can be opened even when funding account balance is negative.
    // Pre-condition of "exactly minimum balance" cannot be reliably established.
  });

  test.skip("TC0156 - Behavior when account type is not selected", async ({
    page,
  }) => {
    // Not automatable: ParaBank always pre-selects CHECKING by default.
    // No UI state exists where account type is unselected.
  });
});
