import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/login/loginpage";
import { ContactInfoPage } from "../../pages/accountServices/contactInfoPage";

test.describe("Update Contact Info", () => {
  let loginPage, openAccountsPage, contactInfoPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    contactInfoPage = new ContactInfoPage(page);
    await loginPage.goto();
    await loginPage.login("Bushra", "123");
  });
  test("TC0157 - Update all contact fields with valid data", async ({
    page,
  }) => {
    await contactInfoPage.clickUpdateProfileLink();

    await contactInfoPage.updateContactInfo({
      firstName: "nobody",
      lastName: "1234",
      address: "5 Yemen Road",
      city: "Yemen",
      state: "YMN",
      zip: "1415",
      phone: "01200000000",
    });
    await expect(contactInfoPage.successMessage).toHaveText("Profile Updated");
  });
});
