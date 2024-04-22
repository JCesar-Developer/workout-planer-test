import { expect, type Locator, type Page } from "@playwright/test";

export class ExercisePage {
  //ARRANGEMENTS ---
  private readonly searchBox: Locator
  private readonly openCreateFormButton: Locator
  private readonly filterTabs: Locator
  private readonly cardList: Locator

  constructor( private readonly page: Page ) {
    this.searchBox = this.page.getByRole('searchbox'),
    this.openCreateFormButton = this.page.getByTestId('open-create-form-btn'),
    this.filterTabs = this.page.getByTestId('filter-tab'),
    this.cardList = this.page.getByTestId('card-list')
  }

  //ACTIONS ---
  async goToExercisePage(): Promise<void> {
    await this.page.goto('http://localhost:4200/exercises');
  }

  async fillSearchBox( text: string ): Promise<void> {
    await this.searchBox.click();
    await this.searchBox.fill(text);
  }

  async quitSearchBox(): Promise<void> {
    await this.searchBox.press('Escape');
  }

  async selectFilterTab( filter: string ): Promise<void> {
    await this.filterTabs.locator(`text="${filter}"`).click();
  }

  async openCreateExerciseDialog(): Promise<void> {
    await this.openCreateFormButton.click();
  }

  //ASSERTIONS ---
  async hasCardList(): Promise<void> {
    await expect(this.cardList).toBeVisible();
  }

}
