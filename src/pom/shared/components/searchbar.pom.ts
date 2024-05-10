import { test as base } from '@playwright/test';
import type { Locator, Page } from "@playwright/test";

//FIXTURE ---
export const test = base.extend<{ searchBar: SearchBar }>({
  searchBar: async ({ page }, use) => {
    const searchBar = new SearchBar(page);
    await use(searchBar);
  },
});

//POM ---
export class SearchBar {
  //Arrangements ---
  private readonly searchBox: Locator

  constructor( private readonly page: Page ) {
    this.searchBox = this.page.getByRole('searchbox');
  }

  //Actions ---
  public async fillSearchBox( text: string ): Promise<void> {
    await this.searchBox.click();
    await this.searchBox.fill(text);
  }

  public async quitSearchBox(): Promise<void> {
    await this.searchBox.press('Escape');
  }

  public async selectOption( option: string ): Promise<void> {
    await this.page.getByRole('option', { name: option }).click();
  }
}