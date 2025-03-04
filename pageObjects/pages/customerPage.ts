import { Page } from '@playwright/test';

export class CustomerPage {
    readonly page: Page;
    readonly customerDropdown = 'select[ng-click="customer()"]';
    readonly selectyourName = 'select[ng-model="custId"]';
    readonly loginbutton = 'button[type="submit"]';
    readonly customersTable = 'table tbody tr';


    constructor(page: Page) {
        this.page = page;
    }


    async selectCustomer(customerName: string) {
        await this.page.selectOption(this.customerDropdown, { label: customerName });

    }

    async selectYourAccount(name: string) {
        await this.page.selectOption(this.selectyourName, { label: name })
    }

    async loginasCustomer() {
        await this.page.click("button[ng-click='customer()']");

    }
    async loginButton() {

        await this.page.click('button[type="submit"]');

    }
    async verifyAccountDetails(expectedCurrency: string) {
        const currencyText = await this.page.locator(".border strong:nth-child(3)").textContent();
        if (!currencyText?.includes(expectedCurrency)) {
            throw new Error(`Currency mismatch! Expected: ${expectedCurrency}, Found: ${currencyText}`);
        }
    }


    async verifyBalance(expectedBalance: string) {


        const balanceText = await this.page.locator(".border strong:nth-child(2)").textContent();
        if (!balanceText?.includes(expectedBalance)) {
            throw new Error(`Balance mismatch! Expected: ${expectedBalance}, Found: ${balanceText}`);
        }
    }

    async navigateToTransactions() {
        await this.page.click("button[ng-click='transactions()']");
    }





}



