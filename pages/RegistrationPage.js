const { expect } = require('@playwright/test');

class RegistrationPage {

    constructor(page) {
        this.page = page;

        this.firstName = page.locator('input[name="customer.firstName"]');
        this.lastName = page.locator('input[name="customer.lastName"]');
        this.address = page.locator('input[name="customer.address.street"]');
        this.city = page.locator('input[name="customer.address.city"]');
        this.state = page.locator('input[name="customer.address.state"]');
        this.zipCode = page.locator('input[name="customer.address.zipCode"]');
        this.phone = page.locator('input[name="customer.phoneNumber"]');
        this.ssn = page.locator('input[name="customer.ssn"]');

        this.username = page.locator('input[name="customer.username"]');
        this.password = page.locator('input[name="customer.password"]');
        this.confirmPassword = page.locator('input[name="repeatedPassword"]');

        this.registerButton = page.locator('input[value="Register"]');
        this.resetButton = page.locator('input[value="Reset"]');
    }


    async open() {
        await this.page.goto('https://parabank.parasoft.com/parabank/register.htm');
    }


    async register(data) {

        if(data.firstName)
            await this.firstName.fill(data.firstName);

        if(data.lastName)
            await this.lastName.fill(data.lastName);

        if(data.address)
            await this.address.fill(data.address);

        if(data.city)
            await this.city.fill(data.city);

        if(data.state)
            await this.state.fill(data.state);

        if(data.zipCode)
            await this.zipCode.fill(data.zipCode);

        if(data.phone)
            await this.phone.fill(data.phone);

        if(data.ssn)
            await this.ssn.fill(data.ssn);

        if(data.username)
            await this.username.fill(data.username);

        if(data.password)
            await this.password.fill(data.password);

        if(data.confirmPassword)
            await this.confirmPassword.fill(data.confirmPassword);


        await this.registerButton.click();
    }


    async resetForm(){
        await this.resetButton.click();
    }

}

module.exports = { RegistrationPage };