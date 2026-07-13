const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const loginData = require('../data/loginData.json');

test('Valid Login', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.navigate();

    await loginPage.login(
        loginData.validUser.username,
        loginData.validUser.password
    );

    await expect(page).toHaveURL(/overview\.htm/);

});

test('Invalid Username', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.navigate();

    await loginPage.login(
        loginData.invalidUsername.username,
        loginData.invalidUsername.password
    );

    await expect(page.locator('.error')).toContainText(
        'The username and password could not be verified.'
    );

});

test('Invalid Password', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.navigate();

    await loginPage.login(
        loginData.invalidPassword.username,
        loginData.invalidPassword.password
    );

    await expect(page.locator('.error')).toContainText(
        'The username and password could not be verified.'
    );

});

test('Logout Successfully', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.navigate();

    await loginPage.login(
        loginData.validUser.username,
        loginData.validUser.password
    );

    await loginPage.logout();

    await expect(page.locator('input[name="username"]')).toBeVisible();

});