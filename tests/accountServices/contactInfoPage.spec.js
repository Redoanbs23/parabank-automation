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
    await page.waitForSelector("text=Account Services");
  });

  test("TC0157 - Update all contact fields with valid data", async ({
    page,
  }) => {
    await contactInfoPage.clickUpdateProfileLink();
    await expect(contactInfoPage.firstNameField).not.toHaveValue("");
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
    await page.waitForLoadState("networkidle");
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
    await page.waitForLoadState("networkidle");
    await contactInfoPage.addressField.clear();
    await contactInfoPage.updateBtn.click();
    await expect(contactInfoPage.addressError).toBeVisible();
    await expect(contactInfoPage.addressError).toHaveText(
      "Address is required.",
    );
  });

  test("TC0160 - Phone field accepts invalid format without validation error", async ({
    page,
  }) => {
    // BUG: ParaBank accepts any string in the phone field without format validation.
    // Expected: invalid phone format (e.g. 'abc-xyz') should show a validation error.
    // Actual: update succeeds regardless of phone format.
    // Extremely long strings or HTML injection trigger an internal server error instead.
    await contactInfoPage.clickUpdateProfileLink();
    await page.waitForLoadState("networkidle");
    await contactInfoPage.updateContactInfo({
      firstName: "John",
      lastName: "Doe",
      address: "123 Main St",
      city: "Dhaka",
      state: "DH",
      zip: "1200",
      phone: "abc-xyz",
    });
    await expect(contactInfoPage.successMessage).toHaveText("Profile Updated");
  });

  test("TC0161 - Special characters accepted in name and address fields", async ({
    page,
  }) => {
    // Observation: ParaBank accepts special characters in name/address fields.
    // No explicit rejection behavior found. Asserting actual behavior (success).
    await contactInfoPage.clickUpdateProfileLink();
    await page.waitForLoadState("networkidle");
    await contactInfoPage.updateContactInfo({
      firstName: "O'Brien",
      lastName: "Smith-Jones",
      address: "123 & Main St",
      city: "Test City",
      state: "TC",
      zip: "12345",
      phone: "01200000000",
    });
    await expect(contactInfoPage.successMessage).toHaveText("Profile Updated");
  });

  test("TC0162 - Very long input triggers internal server error (bug)", async ({
    page,
  }) => {
    // BUG: entering 200+ characters in a field triggers "An internal error has occurred"
    // instead of a proper validation error message.
    // Expected: a user-friendly validation error limiting input length.
    // Actual: internal server error page renders.
    const longString = "a".repeat(201);
    await contactInfoPage.clickUpdateProfileLink();
    await page.waitForLoadState("networkidle");
    await contactInfoPage.firstNameField.clear();
    await contactInfoPage.firstNameField.fill(longString);
    await contactInfoPage.updateBtn.click();
    await expect(page.locator("#updateProfileError h1")).toHaveText("Error!");
    await expect(page.locator("#updateProfileError .error")).toHaveText(
      "An internal error has occurred and has been logged.",
    );
  });

  test("TC0163 - Submitting unchanged values shows success confirmation", async ({
    page,
  }) => {
    await contactInfoPage.clickUpdateProfileLink();
    await page.waitForLoadState("networkidle");
    await contactInfoPage.updateBtn.click();
    await expect(contactInfoPage.successMessage).toHaveText("Profile Updated");
  });

  test("TC0164 - Unicode characters save and render correctly", async ({
    page,
  }) => {
    await contactInfoPage.clickUpdateProfileLink();
    await page.waitForLoadState("networkidle");
    await contactInfoPage.updateContactInfo({
      firstName: "Thomas",
      lastName: "Müller",
      address: "456 Ångström Ave",
      city: "München",
      state: "BY",
      zip: "80331",
      phone: "01200000000",
    });
    await expect(contactInfoPage.successMessage).toHaveText("Profile Updated");
    await contactInfoPage.clickUpdateProfileLink();
    await page.waitForLoadState("networkidle");
    await expect(contactInfoPage.lastNameField).toHaveValue("Müller");
  });

  test("TC0165 - Updated values persist after page reload", async ({
    page,
  }) => {
    await contactInfoPage.clickUpdateProfileLink();
    await page.waitForLoadState("networkidle");
    await contactInfoPage.updateContactInfo({
      firstName: "Persisted",
      lastName: "User",
      address: "789 Persist Lane",
      city: "Testville",
      state: "TS",
      zip: "99999",
      phone: "01900000000",
    });
    await expect(contactInfoPage.successMessage).toHaveText("Profile Updated");
    await page.reload();
    await contactInfoPage.clickUpdateProfileLink();
    await page.waitForLoadState("networkidle");
    await expect(contactInfoPage.firstNameField).toHaveValue("Persisted");
  });

  test("TC0166 - Behavior when Zip Code contains letters", async ({ page }) => {
    await contactInfoPage.clickUpdateProfileLink();
    await page.waitForLoadState("networkidle");
    await contactInfoPage.zipField.clear();
    await contactInfoPage.zipField.fill("ABCDE");
    await contactInfoPage.updateBtn.click();
    // observe actual behavior — update assertion after manual check
    await expect(contactInfoPage.zipError).toBeVisible();
  });

  test("TC0167 - Phone field accepts standard numeric format", async ({
    page,
  }) => {
    await contactInfoPage.clickUpdateProfileLink();
    await page.waitForLoadState("networkidle");
    await contactInfoPage.updateContactInfo({
      firstName: "John",
      lastName: "Doe",
      address: "123 Main St",
      city: "Dhaka",
      state: "DH",
      zip: "1200",
      phone: "01700000000",
    });
    await expect(contactInfoPage.successMessage).toHaveText("Profile Updated");
  });

  test("TC0168a - Required field error when State is empty", async ({
    page,
  }) => {
    await contactInfoPage.clickUpdateProfileLink();
    await page.waitForLoadState("networkidle");
    await contactInfoPage.stateField.clear();
    await contactInfoPage.updateBtn.click();
    await expect(contactInfoPage.stateError).toBeVisible();
    await expect(contactInfoPage.stateError).toHaveText("State is required.");
  });

  test("TC0168b - Required field error when Zip is empty", async ({ page }) => {
    await contactInfoPage.clickUpdateProfileLink();
    await page.waitForLoadState("networkidle");
    await contactInfoPage.zipField.clear();
    await contactInfoPage.updateBtn.click();
    await expect(contactInfoPage.zipError).toBeVisible();
    await expect(contactInfoPage.zipError).toHaveText("Zip Code is required.");
  });

  test("TC0168c - Phone is not a required field, update succeeds when empty", async ({
    page,
  }) => {
    await contactInfoPage.clickUpdateProfileLink();
    await page.waitForLoadState("networkidle");
    await contactInfoPage.phoneField.clear();
    await contactInfoPage.updateBtn.click();
    await expect(contactInfoPage.successMessage).toHaveText("Profile Updated");
  });
});
