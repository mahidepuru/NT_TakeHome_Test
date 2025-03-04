import { BasePage } from "../basePage"
import { Page } from '@playwright/test';

export class ManagerPage {

readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async managerAccess(){
        await this.page.locator('[ng-click="manager()"]').click();
    }

    async clickAddCustomer() {
        await this.page.locator('button:has-text("Add Customer")').click();
    }

    async clickOpenAccount() {
        await this.page.locator('button:has-text("Open Account")').click();
    }

    async clickCustomers() {
        await this.page.locator('button:has-text("Customers")').click();
    }
}