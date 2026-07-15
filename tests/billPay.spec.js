const { test, expect } = require('@playwright/test');

const { LoginPage } = require('../pages/login/loginpage');
const { BillPayPage } = require('../pages/BillPayPage');

const data = require('../data/billPayData.json');

let loginPage;
let billPayPage;

test.beforeEach(async ({ page }) => {

    loginPage = new LoginPage(page);
    billPayPage = new BillPayPage(page);

    await loginPage.goto();

    await loginPage.login("john", "demo");

});

// ======================================================
// TC0113 - Verify successful bill payment
// ======================================================
test("TC0113 - Verify successful bill payment", async () => {

    await billPayPage.openBillPayPage();

    await billPayPage.payBill(data.validBill);

    await expect(billPayPage.successMessage)
        .toContainText("Bill Payment Complete");

});

// ======================================================
// TC0114 - Verify Payee Name is required
// ======================================================
test("TC0114 - Verify Payee Name is required", async () => {

    await billPayPage.openBillPayPage();

    const bill = { ...data.validBill };

    bill.payeeName = "";

    await billPayPage.payBill(bill);

    await expect(billPayPage.errorMessage).toBeVisible();

});

// ======================================================
// TC0115 - Verify Address is required
// ======================================================
test("TC0115 - Verify Address is required", async () => {

    await billPayPage.openBillPayPage();

    const bill = { ...data.validBill };

    bill.address = "";

    await billPayPage.payBill(bill);

    await expect(billPayPage.errorMessage).toBeVisible();

});

// ======================================================
// TC0116 - Verify City is required
// ======================================================
test("TC0116 - Verify City is required", async () => {

    await billPayPage.openBillPayPage();

    const bill = { ...data.validBill };

    bill.city = "";

    await billPayPage.payBill(bill);

    await expect(billPayPage.errorMessage).toBeVisible();

});

// ======================================================
// TC0117 - Verify State is required
// ======================================================
test("TC0117 - Verify State is required", async () => {

    await billPayPage.openBillPayPage();

    const bill = { ...data.validBill };

    bill.state = "";

    await billPayPage.payBill(bill);

    await expect(billPayPage.errorMessage).toBeVisible();

});

// ======================================================
// TC0118 - Verify Zip Code is required
// ======================================================
test("TC0118 - Verify Zip Code is required", async () => {

    await billPayPage.openBillPayPage();

    const bill = { ...data.validBill };

    bill.zipCode = "";

    await billPayPage.payBill(bill);

    await expect(billPayPage.errorMessage).toBeVisible();

});

// ======================================================
// TC0119 - Verify Phone Number is required
// ======================================================
test("TC0119 - Verify Phone Number is required", async () => {

    await billPayPage.openBillPayPage();

    const bill = { ...data.validBill };

    bill.phone = "";

    await billPayPage.payBill(bill);

    await expect(billPayPage.errorMessage).toBeVisible();

});

// ======================================================
// TC0120 - Verify Account Number is required
// ======================================================
test("TC0120 - Verify Account Number is required", async () => {

    await billPayPage.openBillPayPage();

    const bill = { ...data.validBill };

    bill.account = "";

    await billPayPage.payBill(bill);

    await expect(billPayPage.errorMessage).toBeVisible();

});

// ======================================================
// TC0121 - Verify Verify Account Number is required
// ======================================================
test("TC0121 - Verify Verify Account Number is required", async () => {

    await billPayPage.openBillPayPage();

    const bill = { ...data.validBill };

    bill.verifyAccount = "";

    await billPayPage.payBill(bill);

    await expect(billPayPage.errorMessage).toBeVisible();

});

// ======================================================
// TC0122 - Verify Account Number mismatch
// ======================================================
test("TC0122 - Verify Account Number mismatch", async () => {

    await billPayPage.openBillPayPage();

    const bill = { ...data.validBill };

    bill.verifyAccount = "99999";

    await billPayPage.payBill(bill);

    await expect(billPayPage.errorMessage).toBeVisible();

});

// ======================================================
// TC0123 - Verify Amount is required
// ======================================================
test("TC0123 - Verify Amount is required", async () => {

    await billPayPage.openBillPayPage();

    const bill = { ...data.validBill };

    bill.amount = "";

    await billPayPage.payBill(bill);

    await expect(billPayPage.errorMessage).toBeVisible();

});

// ======================================================
// TC0124 - Verify Bill Payment with invalid amount
// ======================================================
test("TC0124 - Verify Bill Payment with invalid amount", async () => {

    await billPayPage.openBillPayPage();

    const bill = { ...data.validBill };

    bill.amount = "-100";

    await billPayPage.payBill(bill);

    await expect(billPayPage.errorMessage).toBeVisible();

});

// ======================================================
// TC0125 - Verify Bill Pay page title
// ======================================================
test("TC0125 - Verify Bill Pay page title", async ({ page }) => {

    await billPayPage.openBillPayPage();

    await expect(page).toHaveTitle(/ParaBank/);

});