const {test, expect} = require('@playwright/test');
const {RegistrationPage} = require('../../pages/registration/registrationpage');

test.describe('Registration Functionality', () => {

  test('Registration with Valid Credentials', async ({page}) => {
    const registrationPage = new RegistrationPage(page);
    await registrationPage.goto();

    const uniqueId = Date.now();
  const username = `user${uniqueId}`;
  const password = `Pass${uniqueId}`;

    await page.waitForTimeout(2000);
    await registrationPage.registration('Bushra', 'Roja','dhaka','Dhaka','Dhaka','123','01234567','2233',username,password,password);
     await page.waitForTimeout(5000);
    await expect(page).toHaveURL('https://parabank.parasoft.com/parabank/register.htm');
  });
  //Verify  required-field error is shown when Username is left empty

  test('Verify that a required-field error is shown when Username is left empty', async ({page}) => {
    const registrationPage = new RegistrationPage(page);
    await registrationPage.goto();

    const uniqueId = Date.now();

  const password = `Pass${uniqueId}`;

    await page.waitForTimeout(2000);
    await registrationPage.registration('Bushra', 'Roja','dhaka','Dhaka','Dhaka','123','01234567','2233','',password,password);
     await page.waitForTimeout(5000);
    await expect(page).toHaveURL('https://parabank.parasoft.com/parabank/register.htm');
  });
//Verify required-field error is shown when Password is left empty
 test('Verify that a required-field error is shown when Password is left empty', async ({page}) => {
    const registrationPage = new RegistrationPage(page);
    await registrationPage.goto();

    const uniqueId = Date.now();
  
  const username = `Pass${uniqueId}`;

    await page.waitForTimeout(2000);
    await registrationPage.registration('Bushra', 'Roja','dhaka','Dhaka','Dhaka','123','01234567','2233',username,'','');
     await page.waitForTimeout(5000);
    await expect(page).toHaveURL('https://parabank.parasoft.com/parabank/register.htm');
  });

//Verify that a 'Passwords do not match' error is shown when Confirm Password differs from Password
 test('Verify that a Passwords do not match error is shown when Confirm Password differs from Password', async ({page}) => {
    const registrationPage = new RegistrationPage(page);
    await registrationPage.goto();

    const uniqueId = Date.now();
  
  const username = `Pass${uniqueId}`;
  const password = `Pass${uniqueId}`;

    await page.waitForTimeout(2000);
    await registrationPage.registration('Bushra', 'Roja','dhaka','Dhaka','Dhaka','123','01234567','2233',username,password,'test123');
     await page.waitForTimeout(5000);
    await expect(page).toHaveURL('https://parabank.parasoft.com/parabank/register.htm');
  });


  //Verify that a 'username already exists' error is shown when registering with a duplicate username
 test('Verify that a username already exists error is shown when registering with a duplicate username', async ({page}) => {
    const registrationPage = new RegistrationPage(page);
    await registrationPage.goto();

    const uniqueId = Date.now();
  
  const username = `Pass${uniqueId}`;
  const password = `Pass${uniqueId}`;

    await page.waitForTimeout(2000);
    await registrationPage.registration('Bushra', 'Roja','dhaka','Dhaka','Dhaka','123','01234567','2233','Tomal',password,password);
     await page.waitForTimeout(5000);
    await expect(page).toHaveURL('https://parabank.parasoft.com/parabank/register.htm');
  });


});