import { expect, type Locator, type Page } from "@playwright/test";

export class PageTemplate {
  //ARRANGEMENTS ---
  private readonly pageTitle: Locator

  constructor( private readonly page: Page ) {
    this.pageTitle = this.page.getByTestId('page-header')
  }

  //ASSERTIONS ---
  async hasTitle(title: string): Promise<void> {
    await expect(this.pageTitle).toHaveText(title);
  }
}