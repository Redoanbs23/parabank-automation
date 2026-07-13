const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const TransferPage = require('../pages/TransferPage');
const loginData = require('../data/loginData.json');
const transferData = require('../data/transferFundsData.json');

test('Valid Transfer Funds', async ({ page }) => {

    // Login
    const loginPage = new LoginPage(page);

    await loginPage.navigate();

    await loginPage.login(
        loginData.validUser.username,
        loginData.validUser.password
    );

    await expect(page).toHaveURL(/overview/);

    // Transfer Funds
    const transferPage = new TransferPage(page);

    await transferPage.openTransferPage();

    await transferPage.transfer(
        transferData.validTransfer.amount
    );

    await expect(transferPage.successMessage).toContainText(
        'Transfer Complete!'
    );

});