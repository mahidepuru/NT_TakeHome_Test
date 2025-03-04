import { Locator, Page } from '@playwright/test';
import { url } from 'inspector';

export {type Page } from '@playwright/test';

export class BasePage{
   

    readonly page:Page;



    constructor( page: Page){
        this.page = page;
    }

    async open(path: string) {
        await this.page.goto(path);
      }
    

    async clickElement(locator:Locator) {
        await locator.click({ timeout: 5000 });

        
    }

    async navigation() {
        await this.page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login');
      }

      
} 