const { test, expect } = require('@playwright/test');

const LoginPage = require('../pages/LoginPage');
const LoanPage = require('../pages/LoanPage');

const loginData = require('../data/loginData.json');
const loanData = require('../data/loanData.json');

test('Request Loan Successfully', async ({ page }) => {

    // Login
    const loginPage = new LoginPage(page);

    await loginPage.navigate();

    await loginPage.login(
        loginData.validUser.username,
        loginData.validUser.password
    );

    await expect(page).toHaveURL(/overview/);

    // Loan
    const loanPage = new LoanPage(page);

    await loanPage.openLoanPage();

    await loanPage.applyLoan(
        loanData.validLoan
    );

    await page.waitForLoadState('networkidle');

    await expect(loanPage.successMessage).toContainText(
        'Loan Request Processed'
    );

});