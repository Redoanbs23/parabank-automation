class FindTransactionPage {

    constructor(page) {

        this.page = page;

        // Left menu
        this.findTransactionLink = page.locator('text=Find Transactions');

        // Amount textbox
        this.amountTextbox = page.locator('#amount');

        // Amount search button
        this.findTransactionButton = page.locator('#findByAmount');

        // Result table
        this.resultTable = page.locator('#transactionTable');
    }

    async openFindTransaction() {
        await this.findTransactionLink.click();
    }

    async searchByAmount(amount) {
        await this.amountTextbox.fill(amount);
        await this.findTransactionButton.click();
    }

}

module.exports = FindTransactionPage;