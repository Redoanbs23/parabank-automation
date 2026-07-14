const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/login/LoginPage');
const { TransferFundsPage } = require('../pages/TransferFundsPage');

let loginPage;
let transferPage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    transferPage = new TransferFundsPage(page);
    await loginPage.goto();
    await loginPage.login("john", "demo");
});

// ======================================================
// TC0096 - Verify successful transfer between two accounts
// ======================================================
test("TC0096 - Verify successful transfer between two accounts", async () => {
    await transferPage.openTransferPage();
    await transferPage.transfer("100");
    await expect(transferPage.successMessage)
        .toContainText("Transfer Complete!");
});

// ======================================================
// TC0097 - Verify successful transfer with another valid amount
// ======================================================
test("TC0097 - Verify successful transfer with another valid amount", async () => {
    await transferPage.openTransferPage();
    await transferPage.transfer("250");
    await expect(transferPage.successMessage)
        .toContainText("Transfer Complete!");
});

// ======================================================
// TC0098 - Verify transfer with zero amount
// ======================================================
test("TC0098 - Verify transfer with zero amount", async () => {
    await transferPage.openTransferPage();
    await transferPage.transfer("0");

    // NOTE: confirm actual ParaBank behavior before trusting this assertion —
    // ParaBank's server-side validation often accepts a zero-amount transfer
    // rather than rejecting it. Explore manually and adjust to the real result.
    await expect(transferPage.errorMessage).toBeVisible();
});

// ======================================================
// TC0099 - Verify transfer with negative amount
// ======================================================
test("TC0099 - Verify transfer with negative amount", async () => {
    await transferPage.openTransferPage();
    await transferPage.transfer("-100");

    // NOTE: confirm actual behavior — negative amounts may not be blocked server-side
    await expect(transferPage.errorMessage).toBeVisible();
});

// ======================================================
// TC0100 - Verify transfer with non-numeric amount
// ======================================================
test("TC0100 - Verify transfer with non-numeric amount", async () => {
    await transferPage.openTransferPage();
    await transferPage.transfer("abc");
    await expect(transferPage.errorMessage).toBeVisible();
});

// ======================================================
// TC0101 - Verify transfer with empty amount
// ======================================================
test("TC0101 - Verify transfer with empty amount", async () => {
    await transferPage.openTransferPage();
    await transferPage.transfer("");
    await expect(transferPage.errorMessage).toBeVisible();
});

// ======================================================
// TC0102 - Verify transfer with insufficient balance
// ======================================================
test("TC0102 - Verify transfer with insufficient balance", async () => {
    await transferPage.openTransferPage();
    await transferPage.transfer("99999999");

    // NOTE: ParaBank is known to allow overdraft by default in many deployments —
    // confirm the real behavior manually before trusting this assertion.
    await expect(transferPage.errorMessage).toBeVisible();
});

// ======================================================
// TC0103 - Verify transfer to same account
// ======================================================
test("TC0103 - Verify transfer to same account", async () => {
    await transferPage.openTransferPage();

    await transferPage.fromAccount.selectOption({ index: 0 });
    await transferPage.toAccount.selectOption({ index: 0 });

    await transferPage.transfer("100");

    // NOTE: confirm actual behavior — ParaBank may allow a same-account
    // "transfer" with no net balance change instead of showing an error.
    await expect(transferPage.errorMessage).toBeVisible();
});

// ======================================================
// TC0104 - Verify transfer with decimal amount
// ======================================================
test("TC0104 - Verify transfer with decimal amount", async () => {
    await transferPage.openTransferPage();
    await transferPage.transfer("100.50");
    await expect(transferPage.successMessage)
        .toContainText("Transfer Complete!");
});

// ======================================================
// TC0105 - Verify transfer with very large amount
// ======================================================
test("TC0105 - Verify transfer with very large amount", async () => {
    await transferPage.openTransferPage();
    await transferPage.transfer("999999999");

    // NOTE: this overlaps with TC0102 (insufficient balance) — both use a very
    // large amount and expect the same error. Keep only if you specifically want
    // to test numeric-overflow handling separately from insufficient-funds logic;
    // otherwise consider removing one to avoid a redundant test.
    await expect(transferPage.errorMessage).toBeVisible();
});

// ======================================================
// TC0106 - Verify transfer with leading zero amount
// ======================================================
test("TC0106 - Verify transfer with leading zero amount", async () => {
    await transferPage.openTransferPage();
    await transferPage.transfer("000100");
    await expect(transferPage.successMessage)
        .toContainText("Transfer Complete!");
});

// ======================================================
// TC0107 - Verify repeated valid transfers succeed consistently
// ======================================================
test("TC0107 - Verify repeated valid transfers succeed consistently", async () => {
    await transferPage.openTransferPage();
    await transferPage.transfer("100");
    await expect(transferPage.successMessage)
        .toContainText("Transfer Complete!");

    // Repeat with a fresh transfer to confirm the flow is stable on a second run
    await transferPage.openTransferPage();
    await transferPage.transfer("100");
    await expect(transferPage.successMessage)
        .toContainText("Transfer Complete!");
});

// ======================================================
// TC0108 - Verify duplicate transfer submission is prevented
// ======================================================
test("TC0108 - Verify duplicate transfer submission is prevented", async () => {
    await transferPage.openTransferPage();

    // NOTE: this test previously called transfer() (which fills + submits +
    // navigates to the confirmation page) and then clicked transferButton again —
    // that button no longer exists on the confirmation page, so the original
    // test would fail with a locator-not-found/timeout error rather than actually
    // verifying duplicate-submission behavior.
    //
    // Rewritten to properly test double-submit: fill the amount once, then click
    // Submit twice in rapid succession *before* navigation completes.
    // Adjust field/method names below to match your actual TransferFundsPage API.
    await transferPage.amountInput.fill("100");

    await Promise.all([
        transferPage.transferButton.click(),
        transferPage.transferButton.click()
    ]);

    await expect(transferPage.successMessage)
        .toContainText("Transfer Complete!");

    // Ideally also assert the account balance only decreased once (i.e. no
    // double-deduction) — add a balance check here once you have a helper
    // to read the current account balance from Accounts Overview.
});

// ======================================================
// TC0109 - Verify transfer confirmation page
// ======================================================
test("TC0109 - Verify transfer confirmation page", async () => {
    await transferPage.openTransferPage();
    await transferPage.transfer("100");
    await expect(transferPage.successMessage)
        .toContainText("Transfer Complete!");
});

// ======================================================
// TC0110 - Verify successful transfer with minimum amount
// ======================================================
test("TC0110 - Verify successful transfer with minimum amount", async () => {
    await transferPage.openTransferPage();
    await transferPage.transfer("1");
    await expect(transferPage.successMessage)
        .toContainText("Transfer Complete!");
});

// ======================================================
// TC0111 - Verify transfer with maximum valid amount
// ======================================================
test("TC0111 - Verify transfer with maximum valid amount", async () => {
    await transferPage.openTransferPage();
    await transferPage.transfer("5000");
    await expect(transferPage.successMessage)
        .toContainText("Transfer Complete!");
});

// ======================================================
// TC0112 - Verify Transfer Funds page title
// ======================================================
test("TC0112 - Verify Transfer Funds page title", async ({ page }) => {
    await transferPage.openTransferPage();
    await expect(page).toHaveTitle(/ParaBank/);
});