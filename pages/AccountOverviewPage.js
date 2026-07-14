class AccountOverviewPage {

    constructor(page) {

        this.page = page;

        this.accountOverviewLink = page.locator('text=Accounts Overview');

        this.accountsTable = page.locator('#accountTable');

        this.firstAccount = page.locator('#accountTable tbody tr:first-child td:first-child a');

    }

    async openAccountOverview() {

        await this.accountOverviewLink.click();

    }

    async openFirstAccount() {

        await this.firstAccount.click();

    }

}

module.exports = AccountOverviewPage;