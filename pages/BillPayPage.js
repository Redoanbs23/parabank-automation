class BillPayPage {

    constructor(page) {

        this.page = page;

        this.billPayLink = page.getByRole('link', { name: 'Bill Pay' });

        this.payeeName = page.locator('[name="payee.name"]');
        this.address = page.locator('[name="payee.address.street"]');
        this.city = page.locator('[name="payee.address.city"]');
        this.state = page.locator('[name="payee.address.state"]');
        this.zipCode = page.locator('[name="payee.address.zipCode"]');
        this.phone = page.locator('[name="payee.phoneNumber"]');
        this.account = page.locator('[name="payee.accountNumber"]');
        this.verifyAccount = page.locator('[name="verifyAccount"]');
        this.amount = page.locator('[name="amount"]');

        this.sendPaymentButton = page.getByRole('button', {
            name: 'Send Payment'
        });

        this.successMessage = page.locator('#billpayResult h1');

        this.errorMessage = page.locator('.error');

    }

    async openBillPayPage() {

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

module.exports = { BillPayPage };