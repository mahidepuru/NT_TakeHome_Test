import { BasePage } from "../basePage"
import { Page } from '@playwright/test';

export class AddCustomerPage {
    readonly page: Page;
    readonly firstNameInput = 'input[placeholder="First Name"]';
    readonly lastNameInput = 'input[placeholder="Last Name"]';
    readonly postCodeInput = 'input[placeholder="Post Code"]';
    readonly addCustomerBtn = 'button[type="submit"]';

    constructor(page: Page) {
        this.page = page;
    }

    async addCustomer(firstName: string, lastName: string, postCode: string) {
        await this.page.fill(this.firstNameInput, firstName);
        await this.page.fill(this.lastNameInput, lastName);
        await this.page.fill(this.postCodeInput, postCode); 

    }
} 