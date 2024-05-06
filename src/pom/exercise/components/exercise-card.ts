import { expect, test as base } from '@playwright/test';
import type { Locator, Page } from "@playwright/test";

//FIXTURE ---
export const test = base.extend<{ exerciseCard: ExerciseCard }>({
  exerciseCard: async ({ page }, use) => {
    const exerciseCard = new ExerciseCard(page);
    await use(exerciseCard);
  }
});

//POM --- 
export class ExerciseCard {
  //Arrangements ---
  readonly cards: Locator

  constructor( private readonly page: Page ) {
    this.cards = this.page.getByTestId('card-item')
  }

  //Getters ---
  public getCardsByQuery( name: string ): Locator {
    return this.cards.filter({ hasText: name });
  }
  
  public getCardsByCategory( category: string ): Locator {
    return this.cards.filter({ hasText: category });
  }

  //Actions ---
  public async openUpdateExerciseDialog( name: string ): Promise<void> {
    await this.getCardsByQuery(name).getByRole('button').click();
  }

  //Assertions ---
  public async expectThereAreNoCards(): Promise<void> {
    const totalCards = await this.cards.count();
    expect(totalCards).toBe(0);
  }

  public async expectThereIsOneCard(): Promise<void> {
    const totalCards = await this.cards.count();
    expect(totalCards).toBe(1);
  }

  public async expectThereAreCards(): Promise<void> {
    const totalCards = await this.cards.count();
    expect(totalCards).toBeGreaterThan(1);
  }
  
  public async expectCardExists( name: string ): Promise<void> {
    await expect(this.getCardsByQuery(name)).toBeVisible();
  }
}