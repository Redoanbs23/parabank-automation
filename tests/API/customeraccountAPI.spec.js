const { test, expect } = require('@playwright/test');
const { RegistrationPage } = require('../../pages/registration/registrationpage');

const base_url = 'https://parabank.parasoft.com/parabank/services/bank';

test.describe('Account Service API', () => {
  let username, password;

  test.beforeEach(async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    await registrationPage.goto();

    const uniqueId = Date.now();
    username = `user${uniqueId}`;
    password = `Pass${uniqueId}`;

    await registrationPage.registration(
      'John', 'Doe', '123 Main St', 'Dhaka', 'Dhaka', '1200', '1234',
      '123456789', username, password, password
    );

    await expect(page.getByText('Your account was created successfully')).toBeVisible();
  });

  //Verify that GET customer accounts returns 200 OK with a valid array of accounts for a valid customerId

  test('Verify that GET customer accounts returns 200 OK with a valid array of accounts for a valid customerId', async ({ request }) => {
    const loginResponse = await request.get(`${base_url}/login/${username}/${password}`, {
      headers: { 'Accept': 'application/json' }
    });
    expect(loginResponse.status()).toBe(200);

    const customer = await loginResponse.json();
    const customerId = customer.id;
    expect(customerId).toBeTruthy();

    const response = await request.get(`${base_url}/customers/${customerId}/accounts`, {
      headers: { 'Accept': 'application/json' }
    });
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBeGreaterThan(0);

    for (const account of body) {
      expect(account).toHaveProperty('id');
      expect(account).toHaveProperty('customerId', customerId);
      expect(account).toHaveProperty('type');
      expect(account).toHaveProperty('balance');
    }
  });

test('Verify that GET account details returns 200 OK with the correct account object for a valid accountId', async ({ request }) => {

   
    const loginResponse = await request.get(`${base_url}/login/${username}/${password}`, {
      headers: { 'Accept': 'application/json' }
    });
    expect(loginResponse.status()).toBe(200);

    const customer = await loginResponse.json();
    const customerId = customer.id;
    console.log('Customer ID:', customerId);

    
    const accountsResponse = await request.get(`${base_url}/customers/${customerId}/accounts`, {
      headers: { 'Accept': 'application/json' }
    });
    expect(accountsResponse.status()).toBe(200);

    const accounts = await accountsResponse.json();
    expect(accounts.length).toBeGreaterThan(0);

    const accountId = accounts[0].id;
    console.log('Valid Account ID:', accountId);

    const response = await request.get(`${base_url}/accounts/${accountId}`, {
      headers: { 'Accept': 'application/json' }
    });
    expect(response.status()).toBe(200);

    const body = await response.json();
    console.log('Account details:', body);

   
    expect(body).toHaveProperty('id', accountId);
    expect(body).toHaveProperty('customerId', customerId);
    expect(body).toHaveProperty('type');
    expect(body).toHaveProperty('balance');
    expect(typeof body.balance).toBe('number');
  });




test('Verify the actual response when GET accounts is called with a non-existent customerId', async ({ request }) => {

  
  const nonExistentCustomerId = 999999999;

  const response = await request.get(`${base_url}/customers/${nonExistentCustomerId}/accounts`, {
    headers: { 'Accept': 'application/json' }
  });

  console.log('Status Code:', response.status());

 
  const rawBody = await response.text();
  console.log('Raw Response Body:', rawBody);

  
  try {
    const parsedBody = JSON.parse(rawBody);
    console.log('Parsed Response Body:', parsedBody);
  } catch (e) {
    console.log('Response is not valid JSON (likely XML, HTML, or empty)');
  }

  
expect(response.status()).toBe(400);

  
});




test('Verify the actual response when GET account is called with a non-existent accountId', async ({ request }) => {

  
  const nonExistentaccountId = 111111111;

  const response = await request.get(`${base_url}/customers/${nonExistentaccountId}/accounts`, {
    headers: { 'Accept': 'application/json' }
  });

  console.log('Status Code:', response.status());

 
  const rawBody = await response.text();
  console.log('Raw Response Body:', rawBody);

  
  try {
    const parsedBody = JSON.parse(rawBody);
    console.log('Parsed Response Body:', parsedBody);
  } catch (e) {
    console.log('Response is not valid JSON (likely XML, HTML, or empty)');
  }

  
expect(response.status()).toBe(400);

  
});


test.only('Verify that GET account with a negative ID is handled gracefully', async ({ request }) => {

  const negativeAccountId = -100000;

  const response = await request.get(
    `${base_url}/accounts/${negativeAccountId}`,
    {
      headers: {
        'Accept': 'application/json'
      }
    }
  );

  console.log('Status Code:', response.status());

  const rawBody = await response.text();
  console.log('Raw Response Body:', rawBody);

  try {
    const parsedBody = JSON.parse(rawBody);
    console.log('Parsed Response Body:', parsedBody);
  } catch (e) {
    console.log('Response is not valid JSON (likely XML, HTML, or empty)');
  }

  
  expect(response.status()).toBe(400);
});

});
