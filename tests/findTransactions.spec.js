const { test, expect } = require('@playwright/test');
const { RegistrationPage } = require('../pages/registration/registrationpage');
const { LoginPage } = require('../pages/login/loginpage');
const FindTransactionPage = require('../pages/FindTransactionPage');

test.describe('Find Transactions Test Cases', () => {

    let username;
    let password;

    test.beforeEach(async ({ page }) => {

        const registrationPage = new RegistrationPage(page);
        const loginPage = new LoginPage(page);

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

    // TC0030
    test('TC0030 - Verify Find Transaction by Transaction ID', async ({ page }) => {

        const findTransactionPage = new FindTransactionPage(page);

        await findTransactionPage.openFindTransaction();

        await findTransactionPage.searchByTransactionId('12345');

        await expect(findTransactionPage.resultTable).toBeVisible();

    });

    // TC0031
    test('TC0031 - Verify Find Transaction by Date', async ({ page }) => {

        const findTransactionPage = new FindTransactionPage(page);

        await findTransactionPage.openFindTransaction();

        await findTransactionPage.searchByDate('07-15-2026');

        await expect(findTransactionPage.resultTable).toBeVisible();

    });

});