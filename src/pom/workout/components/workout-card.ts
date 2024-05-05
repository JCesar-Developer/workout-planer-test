import { type Page, type Locator, expect } from "@playwright/test";

export class WorkoutCardHandler {
  //ARRANGEMENTS ----
  private readonly workoutCards: Locator;

  constructor( private readonly page: Page ) {
    this.workoutCards = page.getByTestId('workout-card');
  }

  //GETTERS ---
  public getWorkoutCardByName(name: string) {
    return this.workoutCards.filter({ hasText: name });
  }

  //ACTIONS ---
  async openUpdateWorkoutDialog(name: string) {
    const workoutCard = this.getWorkoutCardByName(name);
    await workoutCard.getByTestId('open-workout-form-btn').click();
  }

  async deleteWorkout(name: string) {
    const workoutCard = this.getWorkoutCardByName(name);
    await workoutCard.getByTestId('delete-workout-btn').click();
  }

  //ASSERTIONS ---
  async workoutCardExists(name: string) {
    const workoutCard = this.getWorkoutCardByName(name);
    await expect(workoutCard).toBeVisible();
  }

  async hasWorkoutCards() {
    const totalWorkoutCards = await this.workoutCards.count();
    expect(totalWorkoutCards).toBeGreaterThan(1);
  }
}