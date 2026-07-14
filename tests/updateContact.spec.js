const { test, expect } = require('@playwright/test');

const LoginPage = require('../pages/LoginPage');
const UpdateContactPage = require('../pages/UpdateContactPage');

const loginData = require('../data/loginData.json');
const updateContactData = require('../data/updateContactData.json');

test('Update Contact Information', async ({ page }) => {

    // Login
    const loginPage = new LoginPage(page);

    await loginPage.navigate();

    await loginPage.login(
        loginData.validUser.username,
        loginData.validUser.password
    );

    await expect(page).toHaveURL(/overview/);

    // Update Contact Info
    const updateContactPage = new UpdateContactPage(page);

    await updateContactPage.openUpdateContactPage();

    await updateContactPage.updateContact(
        updateContactData.validContact
    );

    await expect(updateContactPage.successMessage).toContainText(
        'Profile Updated'
    );

});