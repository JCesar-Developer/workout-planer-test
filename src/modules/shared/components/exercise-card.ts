import { expect, type Locator, type Page } from "@playwright/test";

export class ExerciseCardHandler {
  private readonly exerciseCards: Locator

  constructor( private readonly page: Page ) {
    this.exerciseCards = this.page.getByTestId('card-item')
  }

  //GETTERS ---
  getCardByName( name: string ): Locator {
    return this.exerciseCards.filter({ hasText: name });
  }
  
  getExerciseCardsByCategory( category: string ): Locator {
    return this.exerciseCards.filter({ hasText: category });
  }

  //ACTIONS ---
  async openUpdateExerciseDialog( name: string ): Promise<void> {
    await this.getCardByName(name).getByRole('button').click();
  }

  //ASSERTIONS ---
  async cardExists( name: string ): Promise<void> {
    await expect(this.getCardByName(name)).toBeVisible();
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

  async hasExerciseCardsWithCategory( category: string ): Promise<void> {
    const totalCards = await this.getExerciseCardsByCategory(category).count();
    expect(totalCards).toBeGreaterThan(1);
  }
}