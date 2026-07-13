const { test, expect } = require('@playwright/test');

const LoginPage = require('../pages/LoginPage');
const FindTransactionPage = require('../pages/FindTransactionPage');

const loginData = require('../data/loginData.json');
const transactionData = require('../data/findTransactionData.json');

test('Find Transaction By Amount', async ({ page }) => {

    // Login
    const loginPage = new LoginPage(page);

    await loginPage.navigate();

    await loginPage.login(
        loginData.validUser.username,
        loginData.validUser.password
    );

    await expect(page).toHaveURL(/overview/);

    // Open Find Transactions
    const findTransactionPage = new FindTransactionPage(page);

    await findTransactionPage.openFindTransaction();

    // Search by Amount
    await findTransactionPage.searchByAmount(
        transactionData.transaction.amount
    );

    // Verify result table is visible
    await expect(findTransactionPage.resultTable).toBeVisible();

});