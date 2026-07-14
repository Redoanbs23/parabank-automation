class TransferFundsPage {

    constructor(page) {

        this.page = page;

        // Menu
        this.transferFundsLink = page.getByRole('link', { name: 'Transfer Funds' });

        // Fields
        this.amount = page.locator('#amount');
        this.fromAccount = page.locator('#fromAccountId');
        this.toAccount = page.locator('#toAccountId');

        // Button
        this.transferButton = page.getByRole('button', { name: 'Transfer' });

        // Success Message
        this.successMessage = page.locator('#showResult h1');

        // Error Message (validation)
        this.errorMessage = page.locator('.error');
    }

    async openTransferPage() {
        await this.transferFundsLink.click();
    }

    async transfer(amount) {

        await this.fromAccount.selectOption({ index: 0 });

        await this.toAccount.selectOption({ index: 1 });

        await this.amount.fill(amount);

        await this.transferButton.click();

    }

}

module.exports = { TransferFundsPage };