const {test, expect} = require('@playwright/test');
const {LoginPage} = require('../../pages/login/loginpage');

test.describe('Login Functionality', () => {

  test('Login with Valid Credentials', async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('Bushra', '123');
    await expect(page).toHaveURL('https://parabank.parasoft.com/parabank/overview.htm');
  });

});