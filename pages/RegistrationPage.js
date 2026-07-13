class RegistrationPage {

    constructor(page) {

        this.page = page;

        this.registerLink = page.locator('text=Register');

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
        this.confirmPassword = page.locator('#repeatedPassword');

        this.registerButton = page.locator('input[value="Register"]');
    }

    async navigate() {
        await this.page.goto('https://parabank.parasoft.com/parabank/index.htm');
    }

    async openRegistration() {
        await this.registerLink.click();
    }

    async register(user) {

        await this.firstName.fill(user.firstName);
        await this.lastName.fill(user.lastName);
        await this.address.fill(user.address);
        await this.city.fill(user.city);
        await this.state.fill(user.state);
        await this.zipCode.fill(user.zipCode);
        await this.phone.fill(user.phone);
        await this.ssn.fill(user.ssn);

        await this.username.fill(user.username);
        await this.password.fill(user.password);
        await this.confirmPassword.fill(user.password);

        await this.registerButton.click();
    }

}

module.exports = RegistrationPage;