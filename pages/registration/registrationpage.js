class RegistrationPage {
  constructor(page) {
    this.page = page;
    this.firstnameInput=page.locator('input[name="customer.firstName"]');
    this.lastnameInput = page.locator('input[name="customer.lastName"]');
    this.addressInput=page.locator('input[name="customer.address.street"]');
    this.cityInput=page.locator('input[name="customer.address.city"]');
    this.stateInput=page.locator('input[name="customer.address.state"]');
    this.zipcodeInput=page.locator('input[name="customer.address.zipCode"]');
    this.phoneInput=page.locator('input[name="customer.phoneNumber"]');
    this.ssnInput=page.locator('input[name="customer.ssn"]');
    this.usernameInput=page.locator('input[name="customer.username"]');
    this.passwordInput=page.locator('input[name="customer.password"]');
    this.confirmpasswordInput=page.locator('#repeatedPassword');
    this.registrationButton = page.getByRole('button',{ name: 'Register' });
  
  }

  async goto() {
    await this.page.goto('https://parabank.parasoft.com/parabank/register.htm');
  }

  async registration(firstname,lastname,address,city,state,zipcode,phone,ssn,username, password,repeatedPassword) {
    await this.firstnameInput.fill(firstname);
    await this.lastnameInput.fill(lastname);
    await this.addressInput.fill(address);
    await this.cityInput.fill(city);
    await this.stateInput.fill(state);
    await this.zipcodeInput.fill(zipcode);
    await this.phoneInput.fill(phone);
    await this.ssnInput.fill(ssn);
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.confirmpasswordInput.fill(repeatedPassword);
    await this.registrationButton.click();
  }
}

module.exports = { RegistrationPage };