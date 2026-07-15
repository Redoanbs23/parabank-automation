class LoanPage {

    constructor(page) {

        this.page = page;

        this.requestLoanLink = page.locator('text=Request Loan');

        this.loanAmountTextbox = page.locator('#amount');
        this.downPaymentTextbox = page.locator('#downPayment');
        this.fromAccountDropdown = page.locator('#fromAccountId');

        this.applyNowButton = page.locator('input[value="Apply Now"]');

        this.successMessage = page.locator('#requestLoanResult h1');

    }

    async openLoanPage() {

        await this.requestLoanLink.click();

        await this.fromAccountDropdown.waitFor();

    }

    async applyLoan(data) {

        await this.loanAmountTextbox.fill(data.loanAmount);

        await this.downPaymentTextbox.fill(data.downPayment);

        await this.page.waitForTimeout(1000);

        await this.applyNowButton.click();

    }

}

module.exports = LoanPage;