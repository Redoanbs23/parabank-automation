const { test, expect } = require('@playwright/test');
const { RegistrationPage } = require('../pages/registration/registrationpage');
const { LoginPage } = require('../pages/login/loginpage');

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

    // ======================================================
    // TC0030 - Verify Find Transactions with valid transaction ID
    // ======================================================

    test('TC0030 - Verify Find Transactions with valid transaction ID', async ({ page }) => {

        await page.getByRole('link', { name: 'Find Transactions' }).click();

        await page.getByLabel('Transaction ID:').fill('12345');

        await page.getByRole('button', {
            name: 'Find Transactions'
        }).click();

        await expect(page.locator('h1'))
            .toContainText('Transaction Results');

    });

    // ======================================================
    // TC0031 - Verify Find Transactions with date filter
    // ======================================================

    test('TC0031 - Verify Find Transactions with date filter', async ({ page }) => {

        await page.getByRole('link', { name: 'Find Transactions' }).click();

        await page.getByLabel('From Date:')
            .fill('01-01-2026');

        await page.getByLabel('To Date:')
            .fill('31-12-2026');

        await page.getByRole('button', {
            name: 'Find Transactions'
        }).click();

        await expect(page.locator('h1'))
            .toContainText('Transaction Results');

    });

});