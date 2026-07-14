class BillPayPage {

    constructor(page) {

        this.page = page;

        this.billPayLink = page.locator('text=Bill Pay');

        this.payeeName = page.locator('input[name="payee.name"]');
        this.address = page.locator('input[name="payee.address.street"]');
        this.city = page.locator('input[name="payee.address.city"]');
        this.state = page.locator('input[name="payee.address.state"]');
        this.zipCode = page.locator('input[name="payee.address.zipCode"]');
        this.phone = page.locator('input[name="payee.phoneNumber"]');

        this.account = page.locator('input[name="payee.accountNumber"]');
        this.verifyAccount = page.locator('input[name="verifyAccount"]');

        this.amount = page.locator('input[name="amount"]');

        this.sendPaymentButton = page.locator('input[value="Send Payment"]');

        this.successMessage = page.getByRole('heading', {
            name: 'Bill Payment Complete'
        });
    }

    async openBillPay() {
        await this.billPayLink.click();
    }

    async payBill(data) {

        await this.payeeName.fill(data.payeeName);
        await this.address.fill(data.address);
        await this.city.fill(data.city);
        await this.state.fill(data.state);
        await this.zipCode.fill(data.zipCode);
        await this.phone.fill(data.phone);

        await this.account.fill(data.account);
        await this.verifyAccount.fill(data.verifyAccount);

        await this.amount.fill(data.amount);

        await this.sendPaymentButton.click();
    }
}

module.exports = BillPayPage;