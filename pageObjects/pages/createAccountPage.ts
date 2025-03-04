import { Page } from '@playwright/test';

export class CreateAccountPage {
    readonly page: Page;
    readonly customerDropdown = '#userSelect';
    readonly currencyDropdown = '#currency';
    readonly processButton = 'button[type="submit"]';



    readonly customersTable = 'table tbody tr';

    constructor(page: Page) {
        this.page = page;
    }

    async selectCustomer(customerName: string) {
        await this.page.selectOption(this.customerDropdown, { label: customerName });
    }

    async selectCurrency(currency: string) {
        await this.page.selectOption(this.currencyDropdown, { label: currency });
    }

    async submit() {
        await this.page.click(this.processButton);
    }

    async openAccount(customerName: string, currency: string) {
        await this.selectCustomer(customerName);
        await this.selectCurrency(currency);


    }
    async isAccountUpdated(customerName: string) {
        const rows = await this.page.locator(this.customersTable).all();
        for (const row of rows) {
            const name = await row.locator('td:nth-child(1)').textContent();
            if (name?.trim() === customerName) {
                const accountNumber = await row.locator('td:nth-child(4)').textContent();
                return accountNumber !== '-';
            }
        }
        return false;
    }
}