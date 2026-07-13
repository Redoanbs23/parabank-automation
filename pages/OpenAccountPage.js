class OpenAccountPage {

    constructor(page) {

        this.page = page;

        this.openNewAccountLink = page.locator('text=Open New Account');

        this.accountTypeDropdown = page.locator('#type');

        this.fromAccountDropdown = page.locator('#fromAccountId');

        this.openNewAccountButton = page.locator('input[value="Open New Account"]');

        this.successMessage = page.locator('#openAccountResult h1');

        this.newAccountNumber = page.locator('#newAccountId');
    }

    async openAccountPage() {

        await this.openNewAccountLink.click();

        await this.fromAccountDropdown.waitFor();

    }

    async createAccount(accountType) {

        await this.accountTypeDropdown.selectOption(accountType);

        await this.page.waitForTimeout(1000);

        await this.openNewAccountButton.click();

    }

}

module.exports = OpenAccountPage;