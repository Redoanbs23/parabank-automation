class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput=page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.getByRole('button',{ name: 'Log In' });
  
  }

  async goto() {
    await this.page.goto('https://parabank.parasoft.com/');
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}

module.exports = { LoginPage };