class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput=page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.getByRole('button',{ name: 'Log In' });
    this.logoutLink=page.getByRole('link', { name: 'Log Out' });
  
  }

  async goto() {
    await this.page.goto('https://parabank.parasoft.com/');
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async logout() {
    await this.logoutLink.click();
  }
}

module.exports = { LoginPage };