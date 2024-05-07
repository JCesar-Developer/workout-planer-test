import { test as base, expect } from "@playwright/test";
import type { Page, Locator } from "@playwright/test";

export const test = base.extend<{ workoutCard: WorkoutCard }>({
  workoutCard: async ({ page }, use) => {
    const workoutCard = new WorkoutCard(page);
    await use(workoutCard);
  }
});

export class WorkoutCard {
  //Arrangements ----
  private readonly workoutCards: Locator;

  constructor( private readonly page: Page ) {
    this.workoutCards = page.getByTestId('workout-card');
  }

  //Getters ---
  public getWorkoutCardByName(name: string) {
    return this.workoutCards.filter({ hasText: name });
  }

  //Actions ---
  public async openUpdateWorkoutDialog(name: string) {
    const workoutCard = this.getWorkoutCardByName(name);
    await workoutCard.getByTestId('open-workout-form-btn').click();
  }

  public async deleteWorkout(name: string) {
    const workoutCard = this.getWorkoutCardByName(name);
    await workoutCard.getByTestId('delete-workout-btn').click();
  }

  //Assertions ---
  public async expectThereAreNoCards() {
    const totalWorkoutCards = await this.workoutCards.count();
    expect(totalWorkoutCards).toBe(0);
  }

  public async expectThereIsOneCard() {
    const totalWorkoutCards = await this.workoutCards.count();
    expect(totalWorkoutCards).toBe(1);
  }
  
  public async expectThereAreCards() {
    const totalWorkoutCards = await this.workoutCards.count();
    expect(totalWorkoutCards).toBeGreaterThan(1);
  }

  public async expectCardExists(name: string) {
    const workoutCard = this.getWorkoutCardByName(name);
    await expect(workoutCard).toBeVisible();
  }
}