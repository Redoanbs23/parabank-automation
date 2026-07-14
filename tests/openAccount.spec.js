const { test, expect } = require('@playwright/test');

const LoginPage = require('../pages/LoginPage');
const OpenAccountPage = require('../pages/OpenAccountPage');

const loginData = require('../data/loginData.json');
const accountData = require('../data/openAccountData.json');

test('Open Savings Account', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.navigate();

    await loginPage.login(
        loginData.validUser.username,
        loginData.validUser.password
    );

    await expect(page).toHaveURL(/overview/);

    const openAccountPage = new OpenAccountPage(page);

    await openAccountPage.openAccountPage();

    await openAccountPage.createAccount(
        accountData.savings.accountType
    );

    await page.waitForLoadState('networkidle');

    await expect(openAccountPage.successMessage).toContainText('Account Opened!');

    await expect(openAccountPage.newAccountNumber).toBeVisible();

});

test('Open Checking Account', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.navigate();

    await loginPage.login(
        loginData.validUser.username,
        loginData.validUser.password
    );

    await expect(page).toHaveURL(/overview/);

    const openAccountPage = new OpenAccountPage(page);

    await openAccountPage.openAccountPage();

    await openAccountPage.createAccount(
        accountData.checking.accountType
    );

    await page.waitForLoadState('networkidle');

    await expect(openAccountPage.successMessage).toContainText('Account Opened!');

    await expect(openAccountPage.newAccountNumber).toBeVisible();

});