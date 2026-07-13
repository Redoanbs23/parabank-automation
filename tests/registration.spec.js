const { test, expect } = require('@playwright/test');
const RegistrationPage = require('../pages/RegistrationPage');
const registrationData = require('../data/registrationData.json');

test('Valid Registration', async ({ page }) => {

    const registrationPage = new RegistrationPage(page);

    await registrationPage.navigate();

    await registrationPage.openRegistration();

    await registrationPage.register(registrationData.validUser);

    await expect(page.locator('h1')).toContainText('Welcome');

});