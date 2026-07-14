const { test, expect } = require('@playwright/test');

const LoginPage = require('../pages/LoginPage');
const AccountOverviewPage = require('../pages/AccountOverviewPage');

const loginData = require('../data/loginData.json');

test('View Account Overview', async ({ page }) => {

    // Login

    const loginPage = new LoginPage(page);

    await loginPage.navigate();

    await loginPage.login(
        loginData.validUser.username,
        loginData.validUser.password
    );

    await expect(page).toHaveURL(/overview/);

    // Account Overview

    const accountOverviewPage = new AccountOverviewPage(page);

    await accountOverviewPage.openAccountOverview();

    await expect(accountOverviewPage.accountsTable).toBeVisible();

    await expect(accountOverviewPage.firstAccount).toBeVisible();

});