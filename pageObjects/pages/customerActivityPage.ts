import { expect, Page } from "@playwright/test";

export class customerActivityPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateToTransactions() {
        await this.page.dblclick("button[ng-click='transactions()']");
        await this.page.waitForTimeout(3000);


    }
    async submitButton() {
        await this.page.click("button[type='submit']");
    }

    async verfitySuccesMessage(validate: string) {
        await expect(this.page.locator('.error')).toHaveText(validate);
    }

    async selfDeposit(amount: string) {
        await this.page.click("button[ng-click='deposit()']");
        await this.page.fill("input[ng-model='amount']", (amount));
        await this.page.click("button[type='submit']");
    }
    async emptyDepositvalidatoin() {
        await this.page.click("button[ng-click='deposit()']");
        await this.page.click("button[type='submit']");
    }


    async selfWithdrawal() {
        await this.page.click("button[ng-click='withdrawl()']");
        await this.page.fill("input[ng-model='amount']", "4");
        await this.page.click("button[type='submit']");
    }



    async verifyTransactionExists(amount: string, type: string) {
        const transactionRows = await this.page.$$("tbody tr");
        for (const row of transactionRows) {
            const rowText = await row.textContent();
            if (rowText?.includes(amount) && rowText?.includes(type)) {
                return true;
            }
        }
        throw new Error(`Transaction not found: ${type} of ${amount}`);
    }

}
