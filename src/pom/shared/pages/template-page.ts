import { test as base, expect } from '@playwright/test';
import type { Locator, Page } from "@playwright/test";

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
  public async expectTitleToBe(expectedTitle: string): Promise<void> {
    const pageTitle = await this.pageTitle.textContent();
    expect(pageTitle).toBe(expectedTitle);
  }
}