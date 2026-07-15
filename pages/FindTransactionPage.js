class FindTransactionPage {

    constructor(page) {

        this.page = page;

        // Left Menu
        this.findTransactionLink = page.getByRole('link', { name: 'Find Transactions' });

        // Transaction ID
        this.transactionIdTextbox = page.locator('#transactionId');
        this.findByTransactionIdButton = page.locator('#findById');

        // Date
        this.dateTextbox = page.locator('#transactionDate');
        this.findByDateButton = page.locator('#findByDate');

        // Date Range
        this.fromDateTextbox = page.locator('#fromDate');
        this.toDateTextbox = page.locator('#toDate');
        this.findByDateRangeButton = page.locator('#findByDateRange');

        // Amount
        this.amountTextbox = page.locator('#amount');
        this.findByAmountButton = page.locator('#findByAmount');

        // Result
        this.resultTable = page.locator('#transactionTable');
    }

    async openFindTransaction() {
        await this.findTransactionLink.click();
    }

    async searchByTransactionId(id) {
        await this.transactionIdTextbox.fill(id);
        await this.findByTransactionIdButton.click();
    }

    async searchByDate(date) {
        await this.dateTextbox.fill(date);
        await this.findByDateButton.click();
    }

    async searchByDateRange(fromDate, toDate) {
        await this.fromDateTextbox.fill(fromDate);
        await this.toDateTextbox.fill(toDate);
        await this.findByDateRangeButton.click();
    }

    async searchByAmount(amount) {
        await this.amountTextbox.fill(amount);
        await this.findByAmountButton.click();
    }

}

module.exports = FindTransactionPage;