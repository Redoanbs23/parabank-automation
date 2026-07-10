const { test, expect } = require('@playwright/test');
const { RegistrationPage } = require('../../pages/registration/registrationpage');
const { LoginPage } = require('../../pages/login/loginPage');

test('Register a new user, then logout and login with same credentials', async ({ page }) => {
  const registrationPage = new RegistrationPage(page);
  const loginPage = new LoginPage(page);


  await registrationPage.goto();

  
  const uniqueId = Date.now();
  const username = `user${uniqueId}`;
  const password = `Pass${uniqueId}`;

  await registrationPage.registration(
    'John',
    'Doe',
    '123 Main St',
    'Dhaka',
    'Dhaka',
    '1200',
    '1234',
    '123456789',
    username,
    password,
    password
  );

  await expect(page.getByText('Your account was created successfully')).toBeVisible();

  await loginPage.logout();

  await loginPage.goto();
  await loginPage.login(username, password);

 
  await expect(page.getByRole('heading', { name: 'Accounts Overview' })).toBeVisible();
});

//Verify that a generic error is shown for an invalid username

test('Verify that a generic error is shown for an invalid username', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.login('abc', '123');

    await expect(loginPage.errorMessage)
        .toHaveText('The username and password could not be verified.');
});

//Verify that a generic error is shown for a valid username with an invalid password
test.only('Verify that a generic error is shown for a valid username with an invalid password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
     await page.waitForTimeout(2000);

    await loginPage.login('Bushra', '12356');
     await page.waitForTimeout(5000);

    await expect(loginPage.errorMessage)
        .toHaveText('The username and password could not be verified.');
});