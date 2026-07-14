const { test, expect } = require('@playwright/test');
const { RegistrationPage } = require('../../pages/registration/registrationpage');
const { LoginPage } = require('../../pages/login/loginpage');

test.describe('Login scenarios after fresh registration', () => {
  let username, password;

  test.beforeEach(async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    const loginPage = new LoginPage(page);

    await registrationPage.goto();

    const uniqueId = Date.now();
    username = `user${uniqueId}`;
    password = `Pass${uniqueId}`;

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
   
  });

  // Verify valid username and password
  test('Valid username and valid password - should login successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(username, password);

    await expect(page.getByRole('heading', { name: 'Accounts Overview' })).toBeVisible();
  });

  // Verify with invalid username and valid password
test('Invalid username and valid password - should show error', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();

  console.log('Invalid username used:', 'nonexistentuser999');

  await loginPage.login('nonexistentuser999', password);

  await expect(loginPage.errorMessage).toBeVisible();
  const errorText = await loginPage.errorMessage.textContent();
  console.log('ACTUAL ERROR MESSAGE:', errorText);
});

// Verify with valid username and invalid password
test('Valid username and invalid password - should show error', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();

  console.log('Username used:', username);
  console.log('Invalid password used:', 'WrongPass123');

  await loginPage.login(username, 'WrongPass123');

  await expect(loginPage.errorMessage).toBeVisible();
  const errorText = await loginPage.errorMessage.textContent();
  console.log('ACTUAL ERROR MESSAGE:', errorText);

  await expect(page.getByRole('heading', { name: 'Accounts Overview' })).not.toBeVisible();
});
//Verify with both username and password are invalid
test('Verify that a generic error is shown when both username and password are invalid', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();

  console.log('Username used:','nonexistentuser999');
  console.log('Invalid password used:', 'WrongPass123');

  await loginPage.login('nonexistentuser999', 'WrongPass123');

  await expect(loginPage.errorMessage).toBeVisible();
  const errorText = await loginPage.errorMessage.textContent();
  console.log('ACTUAL ERROR MESSAGE:', errorText);

  await expect(page.getByRole('heading', { name: 'Accounts Overview' })).not.toBeVisible();
});
//Verify that an error is shown when username is left empty


test('Verify that a username is empty', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();

  console.log('Username used:','');
  console.log('Invalid password used:',password);

  await loginPage.login('',password);

  await expect(loginPage.errorMessage).toBeVisible();
  const errorText = await loginPage.errorMessage.textContent();
  console.log('ACTUAL ERROR MESSAGE:', errorText);

  await expect(page.getByRole('heading', { name: 'Accounts Overview' })).not.toBeVisible();
});

//Verify that an error is shown when password is left empty
test('Verify that a password is empty', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();

  console.log('Username used:',username);
  console.log('Invalid password used:','');

  await loginPage.login(username,'');

  await expect(loginPage.errorMessage).toBeVisible();
  const errorText = await loginPage.errorMessage.textContent();
  console.log('ACTUAL ERROR MESSAGE:', errorText);

  await expect(page.getByRole('heading', { name: 'Accounts Overview' })).not.toBeVisible();
});


}); 