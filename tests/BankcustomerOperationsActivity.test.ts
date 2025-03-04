import { test, expect } from '@playwright/test';
import { ManagerPage } from '../pageObjects/pages/managerPage';
import { AddCustomerPage } from '../pageObjects/pages/addCustomerPage';
import { BasePage } from '../pageObjects/basePage';
import { CustomerPage } from '../pageObjects/pages/CustomerPage';
import { customerActivityPage } from '../pageObjects/pages/customerActivityPage';


test.describe('XYZ Bank manager operations ui tests', () => {

test('make a deposit and verify transactions tests', async ({ page }) => {

  const customerPage = new CustomerPage(page)
  const basePage = new BasePage(page)
  const customeractivity = new customerActivityPage(page)
  basePage.navigation();
  customerPage.loginasCustomer();
  customerPage.selectYourAccount('Hermoine Granger')
  customerPage.loginButton();
  await customeractivity.selfDeposit('30');
   await customeractivity.verfitySuccesMessage('Deposit Successful');
  await customeractivity.navigateToTransactions();
  await customeractivity.verifyTransactionExists("30", "Credit");

});
test('withdrawal and verify transactions tests', async ({ page }) => {

  const customerPage = new CustomerPage(page)
  const basePage = new BasePage(page)
  const customeractivity = new customerActivityPage(page)
  basePage.navigation();
  customerPage.loginasCustomer();
  customerPage.selectYourAccount('Hermoine Granger')
  customerPage.loginButton();
await customeractivity.selfWithdrawal();
await customeractivity.navigateToTransactions();
await customeractivity.verifyTransactionExists("4", "Debit");
});


test('alert user for the empty amount ', async ({ page }) => {

  const customerPage = new CustomerPage(page)
  const basePage = new BasePage(page)
  const customeractivity = new customerActivityPage(page)
  basePage.navigation();
  customerPage.loginasCustomer();
  customerPage.selectYourAccount('Hermoine Granger')
  customerPage.loginButton();
  customeractivity.emptyDepositvalidatoin();
  const amountInput = page.locator('input[ng-model="amount"]');
  await expect(amountInput).toHaveJSProperty('validationMessage', 'Please fill out this field.');
});
});