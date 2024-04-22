import { expect, type Locator, type Page } from "@playwright/test";

export class ExercisePage {
  /**
   * TODO: Creo que hay locators debería estar en otra clase
   */
  private readonly heading: Locator
  private readonly searchBox: Locator
  private readonly openCreateFormButton: Locator
  private readonly filterTabs: Locator
  private readonly cardList: Locator
  private readonly exerciseCards: Locator
  private readonly toastSummary: Locator
  private readonly toastDetail: Locator


  //ARRANGEMENTS ---
  constructor( private readonly page: Page ) {
    this.heading = page.getByTestId('page-header'),
    this.searchBox = page.getByRole('searchbox'),
    this.openCreateFormButton = page.getByTestId('open-create-form-btn'),
    this.filterTabs = page.getByTestId('filter-tab'),
    this.cardList = page.getByTestId('card-list'),
    this.exerciseCards = page.getByTestId('card-item'),
    this.toastSummary = page.locator('div.p-toast-summary'),
    this.toastDetail = page.locator('div.p-toast-detail')
  }

  //GETTERS ---
  getCardByName( name: string ): Locator {
    return this.exerciseCards.filter({ hasText: name });
  }
  
  getExerciseCardsByCategory( category: string ): Locator {
    return this.exerciseCards.filter({ hasText: category });
  }

  //ACTIONS ---
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

  async openUpdateExerciseDialog( name: string ): Promise<void> {
    await this.getCardByName(name).getByRole('button').click();
  }

  //ASSERTIONS ---
  async hasTitle(title: string): Promise<void> {
    await expect(this.heading).toHaveText(title);
  }

  async hasCardList(): Promise<void> {
    await expect(this.cardList).toBeVisible();
  }

  async hasNoExerciseCards(): Promise<void> {
    const exerciseCards = await this.exerciseCards.count();
    expect(exerciseCards).toBe(0);
  }

  async hasOneExerciseCard(): Promise<void> {
    const exerciseCards = await this.exerciseCards.count();
    expect(exerciseCards).toBe(1);
  }

  async hasExerciseCards(): Promise<void> {
    const exerciseCards = await this.exerciseCards.count();
    expect(exerciseCards).toBeGreaterThan(1);
  }

  async hasExerciseCardsByCategory( category: string ): Promise<void> {
    const totalCards = await this.getExerciseCardsByCategory(category).count();
    expect(totalCards).toBeGreaterThan(1);
  }

  async showsToastMessage(toastState: string, toastMessage: string): Promise<void> {
    await expect(this.toastSummary).toHaveText(toastState);
    await expect(this.toastDetail).toHaveText(toastMessage);
  }

  async cardExists( name: string ): Promise<void> {
    await expect(this.getCardByName(name)).toBeVisible();
  }
}
