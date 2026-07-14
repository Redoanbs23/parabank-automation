class UpdateContactPage {

    constructor(page) {

        this.page = page;

        this.updateContactLink = page.locator('text=Update Contact Info');

        this.firstNameTextbox = page.locator('#customer\\.firstName');
        this.lastNameTextbox = page.locator('#customer\\.lastName');
        this.addressTextbox = page.locator('#customer\\.address\\.street');
        this.cityTextbox = page.locator('#customer\\.address\\.city');
        this.stateTextbox = page.locator('#customer\\.address\\.state');
        this.zipCodeTextbox = page.locator('#customer\\.address\\.zipCode');
        this.phoneTextbox = page.locator('#customer\\.phoneNumber');

        this.updateProfileButton = page.locator('input[value="Update Profile"]');

        this.successMessage = page.locator('#updateProfileResult h1');
    }

    async openUpdateContactPage() {

        await this.updateContactLink.click();

    }

    async updateContact(data) {

        await this.firstNameTextbox.fill(data.firstName);
        await this.lastNameTextbox.fill(data.lastName);
        await this.addressTextbox.fill(data.address);
        await this.cityTextbox.fill(data.city);
        await this.stateTextbox.fill(data.state);
        await this.zipCodeTextbox.fill(data.zipCode);
        await this.phoneTextbox.fill(data.phone);

        await this.updateProfileButton.click();

    }

}

module.exports = UpdateContactPage;