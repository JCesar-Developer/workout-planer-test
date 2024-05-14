import { test as base, expect } from "@playwright/test";
import type { Page, Locator } from "@playwright/test";
import { Given, When, Then } from '@decorators';

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
  public getCardByName(name: string) {
    return this.workoutCards.filter({ hasText: name });
  }

  //Actions ---
  @Given('I am on the workouts page')
  public async openUpdateWorkoutDialog(name: string) {
    const workoutCard = this.getCardByName(name);
    await workoutCard.getByTestId('open-workout-form-btn').click();
  }

  @When('I delete the workout {{1}}')
  public async deleteWorkout(name: string) {
    const workoutCard = this.getCardByName(name);
    await workoutCard.getByTestId('delete-workout-btn').click();
  }

  //Assertions ---
  @Then('expect there are no cards')
  public async expectThereAreNoCards() {
    const totalWorkoutCards = await this.workoutCards.count();
    expect(totalWorkoutCards).toBe(0);
  }

  @Then('expect there is one card')
  public async expectThereIsOneCard() {
    const totalWorkoutCards = await this.workoutCards.count();
    expect(totalWorkoutCards).toBe(1);
  }
  
  @Then('expect there are cards')
  public async expectThereAreCards() {
    const totalWorkoutCards = await this.workoutCards.count();
    expect(totalWorkoutCards).toBeGreaterThan(1);
  }

  @Then('expect card {{1}} exists')
  public async expectCardExists(name: string) {
    const workoutCard = this.getCardByName(name);
    await expect(workoutCard).toBeVisible();
  }
}