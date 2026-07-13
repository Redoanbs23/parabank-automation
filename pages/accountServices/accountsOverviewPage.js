export class AccountsOverviewPage {
  constructor(page) {
    this.page = page;
    this.accountRows = this.page.locator("table#accountTable tbody tr");
    this.accountsOverviewLink = this.page.getByRole("link", {
      name: "Accounts Overview",
    });
  }

  async clickAccountsOverviewLink() {
    await this.accountsOverviewLink.click();
  }

  async getAccountIds() {
    await this.page.waitForSelector(
      "table#accountTable tbody tr td:first-child a",
    );
    const links = this.page.locator(
      "table#accountTable tbody tr td:first-child a",
    );
    return await links.allTextContents();
  }
}
