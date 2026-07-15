const { test, expect } = require('@playwright/test');
const { RegistrationPage } = require('../pages/registration/registrationpage');
const { LoginPage } = require('../pages/login/loginpage');
const LoanPage = require('../pages/LoanPage');

test.describe('Loan Test Cases', () => {

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

    test('Request Loan Successfully', async ({ page }) => {

        const loanPage = new LoanPage(page);

        await loanPage.openLoanPage();

        await loanPage.applyLoan({
            amount: '1000',
            downPayment: '100'
        });

        await page.waitForLoadState('networkidle');

        await expect(loanPage.successMessage)
            .toContainText('Loan Request Processed');

    });

});