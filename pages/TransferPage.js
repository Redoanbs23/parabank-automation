class TransferPage {

    constructor(page) {

        this.page = page;

        this.transferFundsLink = page.locator('text=Transfer Funds');

        this.amountTextbox = page.locator('#amount');

        this.fromAccount = page.locator('#fromAccountId');

        this.toAccount = page.locator('#toAccountId');

        this.transferButton = page.locator('input[value="Transfer"]');

        this.successMessage = page.locator('#showResult h1');
    }

    async openTransferPage() {
        await this.transferFundsLink.click();
    }

    async transfer(amount) {

        await this.amountTextbox.fill(amount);

        await this.transferButton.click();

    }

}

module.exports = TransferPage;