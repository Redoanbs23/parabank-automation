class LoginPage {

    constructor(page) {
        this.page = page;

        this.usernameTextbox = page.locator('input[name="username"]');
        this.passwordTextbox = page.locator('input[name="password"]');
        this.loginButton = page.locator('input[value="Log In"]');
        this.logoutLink = page.locator('text=Log Out');
    }

    async navigate() {
        await this.page.goto('https://parabank.parasoft.com/parabank/index.htm');
        await this.page.waitForLoadState('domcontentloaded');
    }

    async login(username, password) {

        await this.usernameTextbox.waitFor({ state: 'visible' });

        await this.usernameTextbox.fill(username);

        await this.passwordTextbox.fill(password);

        await this.page.waitForTimeout(1000);

        await this.loginButton.click();
    }

    async logout() {

        await this.logoutLink.waitFor({ state: 'visible' });

        await this.logoutLink.click();

    }

}

module.exports = LoginPage;