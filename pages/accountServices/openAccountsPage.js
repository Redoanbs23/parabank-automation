export class OpenAccountsPage {
  constructor(page) {
    this.page = page;
    this.openNewAccountLink = this.page.getByRole("link", {
      name: "Open New Account",
    });
    this.accountTypeDropdown = this.page.locator("#type");
    this.fundingAccountDropdown = this.page.locator("#fromAccountId");
    this.openNewAccountButton = this.page.getByRole("button", {
      name: "Open New Account",
    });
    this.openAccountPageHeading = this.page.locator("#openAccountResult h1");
    this.newAccountID = this.page.locator("#newAccountId");
  }

  async clickOpenAccountLink() {
    await this.openNewAccountLink.click();
  }

  async openNewAccount(accountType, fundingAccount) {
    await this.accountTypeDropdown.selectOption(accountType);
    await this.fundingAccountDropdown.selectOption({ index: fundingAccount });
    await this.openNewAccountButton.click();
  }
}
