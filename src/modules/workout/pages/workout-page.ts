import { type Locator, type Page } from '@playwright/test';

export class WorkoutPage {

  //ARRANGEMENTS ----
  private readonly workoutList: Locator;
  private readonly openCreateWorkoutButton: Locator;

  constructor( private readonly page: Page ) {
    this.workoutList = page.getByTestId('workout-list');
    this.openCreateWorkoutButton = page.getByRole('button', { name: 'Nuevo Workout' });
  }

  //ACTIONS ---
  async goto() {
    await this.page.goto('http://localhost:4200/workouts');
  }

  async openCreateWorkoutDialog() {
    await this.openCreateWorkoutButton.click();
  }

  //ASSERTIONS ---
  async hasWorkoutCardList() {
    await this.workoutList.isVisible();
  }
  
}

