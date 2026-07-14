import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';


test.describe("Find Transactions Test Cases", () => {

    let loginPage;


    test.beforeEach(async ({ page }) => {

        loginPage = new LoginPage(page);

        await loginPage.open();

        await loginPage.login(
            "validUsername",
            "validPassword"
        );

    });


    test("TC0030 - Verify Find Transactions with valid transaction ID", async ({ page }) => {


        await page.getByText("Find Transactions").click();


        await page.getByLabel("Transaction ID:").fill("12345");


        await page.getByRole("button", {
            name: "Find Transactions"
        }).click();


        await expect(
            page.locator("h1")
        ).toContainText("Transaction Results");


    });



    test("TC0031 - Verify Find Transactions with date filter", async ({ page }) => {


        await page.getByText("Find Transactions").click();


        await page.getByLabel("From Date:")
            .fill("01-01-2026");


        await page.getByLabel("To Date:")
            .fill("31-12-2026");


        await page.getByRole("button", {
            name: "Find Transactions"
        }).click();


        await expect(
            page.locator("h1")
        ).toContainText("Transaction Results");


    });


});