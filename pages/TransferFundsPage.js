class TransferFundsPage {

    constructor(page) {

        this.page = page;

        // Menu
        this.transferFundsLink = page.getByRole('link', { name: 'Transfer Funds' });

        // Form
        this.amountInput = page.locator('#amount');
        this.fromAccount = page.locator('#fromAccountId');
        this.toAccount = page.locator('#toAccountId');

        // Button
        this.transferButton = page.locator('input[value="Transfer"]');

        // Result
        this.successMessage = page.locator('#showResult h1');
        this.errorMessage = page.locator('.error');
    }

    async openTransferPage() {
        await this.transferFundsLink.click();
    }

    async transfer(amount) {

        await this.amountInput.fill(amount);

        // Select different accounts only if possible
        const count = await this.toAccount.locator('option').count();

        if (count > 1) {
            await this.fromAccount.selectOption({ index: 0 });
            await this.toAccount.selectOption({ index: 1 });
        }

        await this.transferButton.click();
    }

}

module.exports = { TransferFundsPage };