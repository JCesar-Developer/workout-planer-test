import { test as base, expect } from '@playwright/test';
import type { Locator, Page } from "@playwright/test";
import { Then } from '@decorators';

//FIXTURE ---
export const test = base.extend<{ pageTemplate: PageTemplate }>({
  pageTemplate: async ({ page }, use) => {
    const pageTemplate = new PageTemplate(page);
    await use(pageTemplate);
  }
});

//POM ---
export class PageTemplate {
  //Arrangement
  private readonly pageTitle: Locator

  constructor( private readonly page: Page ) {
    this.pageTitle = this.page.getByTestId('page-header')
  }

  //Assertions 
  @Then('expect title to be {{1}}')
  public async expectTitleToBe(expectedTitle: string): Promise<void> {
    await expect(this.pageTitle).toHaveText(expectedTitle);
  }
}