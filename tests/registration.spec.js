const { test, expect } = require('@playwright/test');
const RegistrationPage = require('../pages/RegistrationPage');

let registerPage;

// Base valid data reused across tests — only the field under test is overridden
const baseUser = {
  firstName: 'Test',
  lastName: 'User',
  address: 'Dhaka',
  city: 'Dhaka',
  state: 'Dhaka',
  zipCode: '1212',
  phone: '01700000000',
  ssn: '123456',
  password: 'password123',
  confirmPassword: 'password123'
};

test.beforeEach(async ({ page }) => {
  registerPage = new RegistrationPage(page);
  await registerPage.open();
});

// ======================================================
// TC0001 - Verify successful registration with valid data
// ======================================================
test('TC0001 - Verify successful registration with valid data', async ({ page }) => {
  const username = `automation${Date.now()}`;

  await registerPage.register({
    ...baseUser,
    firstName: 'Automation',
    lastName: 'Tester',
    username
  });

  await expect(page.getByText('Your account was created successfully')).toBeVisible();
});

// ======================================================
// TC0002 - Verify all mandatory field validations (empty form submit)
// ======================================================
test('TC0002 - Verify all mandatory field validations on empty form submit', async ({ page }) => {
  await registerPage.register({
    firstName: '', lastName: '', address: '', city: '', state: '',
    zipCode: '', phone: '', ssn: '', username: '', password: '', confirmPassword: ''
  });

  await expect(page.getByText('First name is required.')).toBeVisible();
  await expect(page.getByText('Last name is required.')).toBeVisible();
  await expect(page.getByText('Address is required.')).toBeVisible();
  await expect(page.getByText('City is required.')).toBeVisible();
  await expect(page.getByText('State is required.')).toBeVisible();
  await expect(page.getByText('Zip Code is required.')).toBeVisible();
  await expect(page.getByText('Phone number is required.')).toBeVisible();
  await expect(page.getByText('SSN is required.')).toBeVisible();
  await expect(page.getByText('Username is required.')).toBeVisible();
  await expect(page.getByText('Password is required.')).toBeVisible();
});

// ======================================================
// TC0003 - Verify Username is required
// ======================================================
test('TC0003 - Verify Username is required', async ({ page }) => {
  await registerPage.register({ ...baseUser, username: '' });
  await expect(page.getByText('Username is required.')).toBeVisible();
});

// ======================================================
// TC0004 - Verify Password is required
// ======================================================
test('TC0004 - Verify Password is required', async ({ page }) => {
  await registerPage.register({
    ...baseUser,
    username: `user${Date.now()}`,
    password: ''
  });
  await expect(page.getByText('Password is required.')).toBeVisible();
});

// ======================================================
// TC0005 - Verify Password and Confirm Password mismatch
// ======================================================
test('TC0005 - Verify Password and Confirm Password mismatch', async ({ page }) => {
  await registerPage.register({
    ...baseUser,
    username: `user${Date.now()}`,
    password: 'password123',
    confirmPassword: 'wrong123'
  });
  await expect(page.getByText('Passwords do not match.')).toBeVisible();
});

// ======================================================
// TC0006 - Verify duplicate username validation
// ======================================================
test('TC0006 - Verify duplicate username validation', async ({ page }) => {
  // NOTE: replace 'existingUser' with a username that is guaranteed to
  // already exist in the target environment (e.g. seeded test data)
  await registerPage.register({
    ...baseUser,
    username: 'existingUser'
  });
  await expect(page.getByText('This username already exists.')).toBeVisible();
});

// ======================================================
// TC0007 - Verify invalid First Name validation
// ======================================================
test('TC0007 - Verify invalid First Name validation', async ({ page }) => {
  await registerPage.register({
    ...baseUser,
    firstName: '',
    username: `user${Date.now()}`
  });
  await expect(page.getByText('First name is required.')).toBeVisible();
});

// ======================================================
// TC0008 - Verify invalid Last Name validation
// ======================================================
test('TC0008 - Verify invalid Last Name validation', async ({ page }) => {
  await registerPage.register({
    ...baseUser,
    lastName: '',
    username: `user${Date.now()}`
  });
  await expect(page.getByText('Last name is required.')).toBeVisible();
});

// ======================================================
// TC0009 - Verify Address mandatory validation
// ======================================================
test('TC0009 - Verify Address mandatory validation', async ({ page }) => {
  await registerPage.register({
    ...baseUser,
    address: '',
    username: `user${Date.now()}`
  });
  await expect(page.getByText('Address is required.')).toBeVisible();
});

// ======================================================
// TC0010 - Verify City mandatory validation
// ======================================================
test('TC0010 - Verify City mandatory validation', async ({ page }) => {
  await registerPage.register({
    ...baseUser,
    city: '',
    username: `user${Date.now()}`
  });
  await expect(page.getByText('City is required.')).toBeVisible();
});

// ======================================================
// TC0011 - Verify State mandatory validation
// ======================================================
test('TC0011 - Verify State mandatory validation', async ({ page }) => {
  await registerPage.register({
    ...baseUser,
    state: '',
    username: `user${Date.now()}`
  });
  await expect(page.getByText('State is required.')).toBeVisible();
});

// ======================================================
// TC0012 - Verify Zip Code mandatory validation
// ======================================================
test('TC0012 - Verify Zip Code mandatory validation', async ({ page }) => {
  await registerPage.register({
    ...baseUser,
    zipCode: '',
    username: `user${Date.now()}`
  });
  await expect(page.getByText('Zip Code is required.')).toBeVisible();
});

// ======================================================
// TC0013 - Verify Phone Number mandatory validation
// ======================================================
test('TC0013 - Verify Phone Number mandatory validation', async ({ page }) => {
  await registerPage.register({
    ...baseUser,
    phone: '',
    username: `user${Date.now()}`
  });
  await expect(page.getByText('Phone number is required.')).toBeVisible();
});

// ======================================================
// TC0014 - Verify SSN mandatory validation
// ======================================================
test('TC0014 - Verify SSN mandatory validation', async ({ page }) => {
  await registerPage.register({
    ...baseUser,
    ssn: '',
    username: `user${Date.now()}`
  });
  await expect(page.getByText('SSN is required.')).toBeVisible();
});

// ======================================================
// TC0015 - Verify Confirm Password mandatory validation
// ======================================================
test('TC0015 - Verify Confirm Password mandatory validation', async ({ page }) => {
  await registerPage.register({
    ...baseUser,
    username: `user${Date.now()}`,
    confirmPassword: ''
  });
  await expect(page.getByText('Password confirmation is required.')).toBeVisible();
});

// ======================================================
// TC0016 - Verify invalid Zip Code format (non-numeric)
// ======================================================
test('TC0016 - Verify invalid Zip Code format', async ({ page }) => {
  await registerPage.register({
    ...baseUser,
    username: `zip${Date.now()}`,
    zipCode: 'ABCD'
  });

  // NOTE: confirm actual ParaBank behavior before finalizing this assertion —
  // it may silently accept non-numeric zip codes rather than reject them.
  await expect(page).not.toHaveURL(/register.htm$/);
});

// ======================================================
// TC0017 - Verify invalid Phone format (non-numeric)
// ======================================================
test('TC0017 - Verify invalid Phone format', async ({ page }) => {
  await registerPage.register({
    ...baseUser,
    username: `phone${Date.now()}`,
    phone: 'ABCDEF'
  });

  // NOTE: confirm actual ParaBank behavior before finalizing this assertion
  await expect(page).not.toHaveURL(/register.htm$/);
});

// ======================================================
// TC0018 - Verify Username with special characters
// ======================================================
test('TC0018 - Verify Username with special characters', async ({ page }) => {
  await registerPage.register({
    ...baseUser,
    username: `user@#$${Date.now()}`
  });

  // NOTE: confirm actual ParaBank behavior — it may accept special characters
  // rather than show an "invalid" message. Adjust assertion after exploration.
  await expect(page.getByText(/invalid/i)).toBeVisible();
});

// ======================================================
// TC0019 - Verify Username with leading/trailing spaces
// ======================================================
test('TC0019 - Verify Username with leading and trailing spaces', async ({ page }) => {
  await registerPage.register({
    ...baseUser,
    username: `   user${Date.now()}   `
  });

  // NOTE: confirm whether ParaBank trims spaces server-side or rejects the value
  await expect(page).not.toHaveURL(/register.htm$/);
});

// ======================================================
// TC0020 - Verify Username more than 255 characters
// ======================================================
test('TC0020 - Verify Username more than 255 characters', async ({ page }) => {
  const longUsername = 'A'.repeat(260);

  await registerPage.register({
    ...baseUser,
    username: longUsername
  });

  // NOTE: confirm actual truncation/rejection behavior
  await expect(page).not.toHaveURL(/register.htm$/);
});

// ======================================================
// TC0021 - Verify SQL Injection in Username field
// ======================================================
test('TC0021 - Verify SQL Injection in Username field', async ({ page }) => {
  await registerPage.register({
    ...baseUser,
    username: "' OR '1'='1"
  });

  // Expected: app should reject/escape gracefully, not error out or log in unexpectedly
  await expect(page).not.toHaveURL(/register.htm$/);
});

// ======================================================
// TC0022 - Verify password minimum length validation
// ======================================================
test('TC0022 - Verify password minimum length validation', async ({ page }) => {
  await registerPage.register({
    ...baseUser,
    username: `user${Date.now()}`,
    password: '123',
    confirmPassword: '123'
  });

  // NOTE: confirm actual minimum-length rule (if any) before finalizing this assertion
  await expect(page.getByText(/password/i)).toBeVisible();
});

// ======================================================
// TC0023 - Verify reset button clears fields
// ======================================================
test('TC0023 - Verify reset button clears fields', async ({ page }) => {
  await page.fill('input[name="customer.firstName"]', 'Test');
  await page.click('input[type="reset"]');

  await expect(page.locator('input[name="customer.firstName"]')).toHaveValue('');
});

// ======================================================
// TC0024 - Verify registration page title
// ======================================================
test('TC0024 - Verify registration page title', async ({ page }) => {
  await expect(page).toHaveTitle(/ParaBank/);
});