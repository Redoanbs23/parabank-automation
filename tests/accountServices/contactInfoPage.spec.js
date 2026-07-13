import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/login/loginpage";
import { RegistrationPage } from "../../pages/registration/registrationpage";
import { OpenAccountsPage } from "../../pages/accountServices/openAccountsPage";
import { ContactInfoPage } from "../../pages/accountServices/contactInfoPage";

test.describe("Update Contact Info", () => {
  let username, password, loginPage, contactInfoPage;

  test.beforeAll(async ({ browser }) => {
    const page = await browser.newPage();
    const registrationPage = new RegistrationPage(page);

    await registrationPage.goto();

    const uniqueId = Date.now();
    username = `user${uniqueId}`;
    password = `Pass${uniqueId}`;

    await registrationPage.registration(
      "John",
      "Doe",
      "123 Main St",
      "Dhaka",
      "Dhaka",
      "1200",
      "1234",
      "123456789",
      username,
      password,
      password,
    );
    await page.close();
  });

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    contactInfoPage = new ContactInfoPage(page);
    await loginPage.goto();
    await loginPage.login(username, password);
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

  test("TC0158 - Required field error when First Name is cleared", async ({
    page,
  }) => {
    await contactInfoPage.clickUpdateProfileLink();
    await contactInfoPage.firstNameField.clear();
    await contactInfoPage.updateBtn.click();
    await expect(contactInfoPage.firstNameError).toBeVisible();
    await expect(contactInfoPage.firstNameError).toHaveText(
      "First name is required.",
    );
  });

  test("TC0159 - Required field error when Address is cleared", async ({
    page,
  }) => {
    await contactInfoPage.clickUpdateProfileLink();
    await contactInfoPage.addressField.clear();
    await contactInfoPage.updateBtn.click();
    await expect(contactInfoPage.addressError).toBeVisible();
    await expect(contactInfoPage.addressError).toHaveText(
      "Address is required.",
    );
  });
});
