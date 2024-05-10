import { test as base, expect } from '@playwright/test';
import type { Browser, Locator, Page } from "@playwright/test";

export const test = base.extend<{exercisePage: ExercisePage}>({
  exercisePage: async ({ page }, use) => {
    const exercisePage = new ExercisePage(page);
    await exercisePage.goto();
    await use(exercisePage);
  },
});

export class ExercisePage {
  //Arrangements ---
  private readonly openDialogButton?: Locator;
  private readonly filterTabs?: Locator;
  private readonly cardList?: Locator;
  private _page?: Page;

  constructor( _page?: Page ) {
    this._page = _page;
    this.openDialogButton = this._page?.getByTestId('open-create-form-btn');
    this.filterTabs = this._page?.getByTestId('filter-tab');
    this.cardList = this._page?.getByTestId('card-list');
  }

  //Custom Context ---
  public async setCustomContext( browser: Browser ): Promise<void> {
    const context = await browser.newContext();
    this._page = await context.newPage();
  }

  public get page(): Page {
    return this._page!;
  }

  //Actions ---
  public async goto(): Promise<void> {
    await this._page!.goto('http://localhost:4200/exercises');
  }

  public async selectFilterTab( filter: string ): Promise<void> {
    await this.filterTabs?.locator(`text="${filter}"`).click();
  }

  public async openDialog(): Promise<void> {
    await this.openDialogButton?.click();
  }

  //Assertions ---
  public async expectHasCardList(): Promise<void> {
    await expect(this.cardList!, 'Card list item was not displayed').toBeVisible();
  }

}
