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
    this.updateBtn = this.page.locator('input[value="Update Profile"]');
    this.successMessage = this.page.locator("#updateProfileResult h1");
  }

  async clickUpdateProfileLink() {
    await this.updateProfileLink.click();
  }

  async updateContactInfo(data) {
    await this.firstNameField.clear();
    await this.firstNameField.fill(data.firstName);
    await this.lastNameField.clear();
    await this.lastNameField.fill(data.lastName);
    await this.addressField.clear();
    await this.addressField.fill(data.address);
    await this.cityField.clear();
    await this.cityField.fill(data.city);
    await this.stateField.clear();
    await this.stateField.fill(data.state);
    await this.zipField.clear();
    await this.zipField.fill(data.zip);
    await this.phoneField.clear();
    await this.phoneField.fill(data.phone);
    await this.updateBtn.click();
  }
}
