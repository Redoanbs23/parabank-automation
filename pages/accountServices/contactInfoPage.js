export class ContactInfoPage {
  constructor(page) {
    this.page = page;
    this.updateProfileLink = this.page.getByRole("link", {
      name: "Update Contact Info",
    });
    this.firstNameField = this.page.locator('input[id="customer.firstName"]');
    this.lastNameField = this.page.locator('input[id="customer.lastName"]');
    this.addressField = this.page.locator(
      'input[id="customer.address.street"]',
    );
    this.cityField = this.page.locator('input[id="customer.address.city"]');
    this.stateField = this.page.locator('input[id="customer.address.state"]');
    this.zipField = this.page.locator('input[id="customer.address.zipCode"]');
    this.phoneField = this.page.locator('input[id="customer.phoneNumber"]');
    this.updateBtn = this.page.getByRole("button", { name: "Update Profile" });
    this.successMessage = this.page.locator("#updateProfileResult h1");

    this.firstNameError = this.page.locator('span[id="firstName-error"]');
    this.addressError = this.page.locator('span[id="street-error"]');
    this.phoneError = this.page.locator('span[id="phoneNumber-error"]');
    this.zipError = this.page.locator('span[id="zipCode-error"]');
    this.stateError = this.page.locator('span[id="state-error"]');
  }

  async clickUpdateProfileLink() {
    await this.updateProfileLink.click();
  }

  async updateContactInfo(data) {
    await this.firstNameField.fill(data.firstName);
    await this.lastNameField.fill(data.lastName);
    await this.addressField.fill(data.address);
    await this.cityField.fill(data.city);
    await this.stateField.fill(data.state);
    await this.zipField.fill(data.zip);
    await this.phoneField.fill(data.phone);
    await this.updateBtn.click();
  }
}
