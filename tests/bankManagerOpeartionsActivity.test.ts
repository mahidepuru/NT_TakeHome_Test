import { test, expect } from '@playwright/test';
import { ManagerPage } from '../pageObjects/pages/managerPage';
import { CreateAccountPage } from '../pageObjects/pages/createAccountPage';
import { BasePage } from '../pageObjects/basePage';
import { AddCustomerPage } from '../pageObjects/pages/addCustomerPage';

test.describe('XYZ Bank customer operations ui tests', () => {

  test('Add a new customer successfully', async ({ page }) => {
    const managerPage = new ManagerPage(page);
    const addCustomerPage = new AddCustomerPage(page);
    const basePage = new BasePage(page)
    await basePage.navigation();
    await managerPage.managerAccess();
    await managerPage.clickAddCustomer();
    await addCustomerPage.addCustomer('Mahi', 'Depuru', 'DA2PZ');
    await page.locator('.btn.btn-default[type="submit"]').dispatchEvent('click');
    page.on('dialog', async dialog => {
      console.log(dialog.message());
      await dialog.accept();

      expect(dialog.message()).toContain('Customer added successfully with customer id');

    });

  });

  test('Add a existing  customer show error message successfully', async ({ page }) => {
    const managerPage = new ManagerPage(page);
    const addCustomerPage = new AddCustomerPage(page);
    const basePage = new BasePage(page)
    await basePage.navigation();
    await managerPage.managerAccess();
    await managerPage.clickAddCustomer();
    await addCustomerPage.addCustomer('Hermoine', 'Granger', 'E859AB');
    await page.locator('.btn.btn-default[type="submit"]').dispatchEvent('click');

    page.on('dialog', async (dialog) => {
      console.log(dialog.message());
      await dialog.accept();

      expect(dialog.message()).toContain('Please check the details. Customer may be duplicate.');

    });
  });


  test('Bank Manager should be able to open a new dollor account for an existing customer', async ({ page }) => {
    const managerPage = new ManagerPage(page);
    const openAccountPage = new CreateAccountPage(page);
    const basePage = new BasePage(page)
    await basePage.navigation();
    await managerPage.managerAccess();
    await managerPage.clickOpenAccount();
    await openAccountPage.openAccount('Hermoine Granger', 'Dollar');

    await page.locator('button[type="submit"]').dispatchEvent('click');

    page.on('dialog', async dialog => {
      console.log(dialog.message());
      await dialog.accept();

      expect(dialog.message()).toBeTruthy(); ('Account created successfully');

    });

  })
  test('Bank Manager should be able to open a new Rupee account for an existing customer', async ({ page }) => {
    const managerPage = new ManagerPage(page);
    const openAccountPage = new CreateAccountPage(page);
    const basePage = new BasePage(page)
    await basePage.navigation();
    await managerPage.managerAccess();
    await managerPage.clickOpenAccount();
    await openAccountPage.openAccount('Hermoine Granger', 'Rupee');
    await page.locator('button[type="submit"]').dispatchEvent('click');

    page.on('dialog', async dialog => {
      console.log(dialog.message());
      await dialog.accept();

      expect(dialog.message()).toBeTruthy(); ('Account created successfully');

    });

  });

  test('Bank Manager should be able to open a new Pound account for an existing customer', async ({ page }) => {
    const managerPage = new ManagerPage(page);
    const openAccountPage = new CreateAccountPage(page);
    const basePage = new BasePage(page)
    await basePage.navigation();
    await managerPage.managerAccess();
    await managerPage.clickOpenAccount();
    await openAccountPage.openAccount('Hermoine Granger', 'Pound');
    await page.locator('button[type="submit"]').dispatchEvent('click');

    page.on('dialog', async dialog => {
      console.log(dialog.message());
      await dialog.accept();

      expect(dialog.message()).toContain('Account created successfully');

    });
  });

});