const { test, expect } = require('@playwright/test');
const { RegistrationPage } = require('../../pages/registration/registrationpage');
const { LoginPage } = require('../../pages/login/loginpage');

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

