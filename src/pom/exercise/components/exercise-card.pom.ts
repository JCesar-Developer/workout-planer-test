import { expect, test as base } from '@playwright/test';
import type { Locator, Page } from "@playwright/test";

//FIXTURE ---
export const exerciseCardFixture = base.extend<{ exerciseCard: ExerciseCard }>({
  exerciseCard: async ({ page }, use) => {
    const exerciseCard = new ExerciseCard(page);
    await use(exerciseCard);
  }
});

//POM --- 
export class ExerciseCard {
  //Arrangements ---
  private readonly cards: Locator

  constructor( private readonly page: Page ) {
    this.cards = this.page.getByTestId('card-item')
  }

  //Getters ---
  public getCards(): Locator {
    return this.cards;
  }

  public getCardByExactName( name: string ): Locator {
    const title = this.page.getByRole('heading', { name, exact: true });
    return this.cards.filter({ has: title });
  }

  public getCardsByQuery( name: string ): Locator {
    return this.cards.filter({ hasText: name });
  }
  
  public getCardsByCategory( category: string ): Locator {
    return this.cards.filter({ hasText: category });
  }

  //Actions ---
  public async openEditDialog( name: string ): Promise<void> {
    const card = this.getCardByExactName(name);
    await card.locator('button').click();
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
    const card = this.getCardByExactName(name);
    await expect(card).toBeVisible();
  }

  public async expectCardDoesNotExist( name: string ): Promise<void> {
    const card = this.getCardByExactName(name);
    await expect(card).not.toBeVisible();
  }
}