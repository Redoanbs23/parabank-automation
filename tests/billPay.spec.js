const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const BillPayPage = require('../pages/BillPayPage');

const loginData = require('../data/loginData.json');
const billPayData = require('../data/billPayData.json');

test('Valid Bill Payment', async ({ page }) => {

    // Login
    const loginPage = new LoginPage(page);

    await loginPage.navigate();

    await loginPage.login(
        loginData.validUser.username,
        loginData.validUser.password
    );

    await expect(page).toHaveURL(/overview/);

    // Bill Pay
    const billPayPage = new BillPayPage(page);

    await billPayPage.openBillPay();

    await billPayPage.payBill(
        billPayData.validBill
    );

    // Wait for the result page
    await page.waitForLoadState('networkidle');

    // Verify Bill Payment Success
    await expect(billPayPage.successMessage).toBeVisible();

});