const { test, expect } = require('@playwright/test');
const { RegistrationPage } = require('../pages/registration/registrationpage');
const { LoginPage } = require('../pages/login/loginpage');
const { TransferFundsPage } = require('../pages/TransferFundsPage');

let username;
let password;

let registrationPage;
let loginPage;
let transferPage;

test.beforeEach(async ({ page }) => {

    registrationPage = new RegistrationPage(page);
    loginPage = new LoginPage(page);
    transferPage = new TransferFundsPage(page);

    await registrationPage.goto();

    const uniqueId = Date.now();

    username = `user${uniqueId}`;
    password = `Pass${uniqueId}`;

    await registrationPage.registration(
        'John',
        'Doe',
        '123 Main St',
        'Dhaka',
        'Dhaka',
        '1200',
        '123456789',
        '123456789',
        username,
        password,
        password
    );

    await expect(
        page.getByText('Your account was created successfully')
    ).toBeVisible();

    await loginPage.logout();

    await loginPage.goto();

    await loginPage.login(username, password);

    await expect(
        page.getByRole('heading', { name: 'Accounts Overview' })
    ).toBeVisible();

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

    await expect(transferPage.errorMessage).toBeVisible();

});

// ======================================================
// TC0099 - Verify transfer with negative amount
// ======================================================

test("TC0099 - Verify transfer with negative amount", async () => {

    await transferPage.openTransferPage();

    await transferPage.transfer("-100");

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

    await expect(transferPage.errorMessage).toBeVisible();

});

// ======================================================
// TC0103 - Verify transfer to same account
// ======================================================

test("TC0103 - Verify transfer to same account", async () => {

    await transferPage.openTransferPage();

    await transferPage.fromAccount.selectOption({ index: 0 });
    await transferPage.toAccount.selectOption({ index: 0 });

    await transferPage.amountInput.fill("100");

    await transferPage.transferButton.click();

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

    await transferPage.amountInput.fill("100");

    await Promise.all([
        transferPage.transferButton.click(),
        transferPage.transferButton.click()
    ]);

    await expect(transferPage.successMessage)
        .toContainText("Transfer Complete!");

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