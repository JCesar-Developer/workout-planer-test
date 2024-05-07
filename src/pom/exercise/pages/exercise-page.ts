import { test as base, expect } from '@playwright/test';
import type { Locator, Page } from "@playwright/test";

export const test = base.extend<{exercisePage: ExercisePage}>({
  exercisePage: async ({ page }, use) => {
    const exercisePage = new ExercisePage(page);
    await exercisePage.goto();
    await use(exercisePage);
  },
});

export class ExercisePage {
  //Arrangements ---
  private readonly openDialogButton: Locator
  private readonly filterTabs: Locator
  private readonly cardList: Locator

  constructor( private readonly page: Page ) {
    this.openDialogButton = this.page.getByTestId('open-create-form-btn'),
    this.filterTabs = this.page.getByTestId('filter-tab'),
    this.cardList = this.page.getByTestId('card-list')
  }

  //Actions ---
  public async goto(): Promise<void> {
    await this.page.goto('http://localhost:4200/exercises');
  }

  public async selectFilterTab( filter: string ): Promise<void> {
    await this.filterTabs.locator(`text="${filter}"`).click();
  }

  public async openDialog(): Promise<void> {
    await this.openDialogButton.click();
  }

  //Assertions ---
  public async expectHasCardList(): Promise<void> {
    await expect(this.cardList).toBeVisible();
  }

}
